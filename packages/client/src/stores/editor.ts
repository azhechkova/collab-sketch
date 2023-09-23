import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ActionMode, Coordinates, DrawReq, PointerOrTouchEvent } from '@/types'
import { toVirtualX, toVirtualY } from '@/utils/canvasSize'
import { ACTION_MODES, DEFAULT_ZOOM } from '@/constants'
import transformCoordinates from '@/utils/transformCoordinates'
import drawLine from '@/utils/drawLine'

const cellSize = 40

export const useEditorStore = defineStore('editor', () => {
  const canvas = ref<HTMLCanvasElement | null>(null)
  const wrapper = ref<HTMLDivElement | null>(null)
  const userInteract = ref(false)
  const actionMode = ref<ActionMode | null>(ACTION_MODES.draw)
  const previousPoint = ref<Coordinates | null>(null)
  const previousTouchRef = ref<any>(null)
  const color = ref<string | CanvasGradient | CanvasPattern>('#000')
  const size = ref(1)
  const zoom = ref(DEFAULT_ZOOM)
  const offsetX = ref(0)
  const offsetY = ref(0)
  const drawings = ref<DrawReq[]>([])

  const setCanvas = (value: HTMLCanvasElement) => {
    canvas.value = value
    onDrawCanvas()
  }

  const getContext = () => {
    const context = canvas?.value?.getContext('2d')
    return context || null
  }

  const setWrapper = (value: HTMLDivElement) => {
    wrapper.value = value
    wrapper.value.style.transform = `scale(${zoom.value / 100})`
  }

  const setActionMode = (mode: ActionMode | null) => {
    actionMode.value = mode
  }

  const startDrawing = ({ offsetX, offsetY }: MouseEvent) => {
    const context = getContext()
    if (!context) return
    userInteract.value = true

    previousPoint.value = { x: offsetX, y: offsetY }
  }

  const onPan = (event: PointerOrTouchEvent) => {
    if (!userInteract.value) return

    const movementX =
      'movementX' in event
        ? event.movementX
        : previousTouchRef.value.current?.pageX
        ? event.touches[0].pageX - previousTouchRef.value.current.pageX
        : 0

    const movementY =
      'movementY' in event
        ? event.movementY
        : previousTouchRef.value.current?.pageY
        ? event.touches[0].pageY - previousTouchRef.value.current.pageY
        : 0

    if ('touches' in event) {
      previousTouchRef.value.current = event.touches[0]
    }

    offsetX.value += movementX
    offsetY.value += movementY

    onDrawCanvas()
  }

  const onDrawGrid = () => {
    const context = getContext()
    const width = canvas?.value?.clientWidth || 0
    const height = canvas?.value?.clientHeight || 0

    if (!context) return

    context.strokeStyle = 'rgb(229,231,235)'
    context.lineWidth = 1
    context.beginPath()

    const cellZoom = cellSize * zoom.value

    for (let x = offsetX.value % cellZoom; x <= width; x += cellZoom) {
      const source = x
      context.moveTo(source, 0)
      context.lineTo(source, height)
    }

    for (let y = offsetY.value % cellZoom; y <= height; y += cellZoom) {
      const destination = y
      context.moveTo(0, destination)
      context.lineTo(width, destination)
    }

    context.stroke()
  }

  const onDrawCanvas = () => {
    const canvasEl = canvas.value
    const context = canvasEl?.getContext('2d')

    if (canvasEl && context) {
      canvasEl.width = document.body.clientWidth
      canvasEl.height = document.body.clientHeight
      context.clearRect(0, 0, canvasEl.width, canvasEl.height)

      onDrawGrid()

      for (let i = 0; i < drawings.value.length; i++) {
        const line = drawings.value[i]
        const formatParams = {
          ...line,
          prev: line.prev
            ? {
                x: toVirtualX(line.prev.x, offsetX.value, zoom.value),
                y: toVirtualY(line.prev.y, offsetY.value, zoom.value)
              }
            : undefined,
          point: {
            x: toVirtualX(line.point.x, offsetX.value, zoom.value),
            y: toVirtualY(line.point.y, offsetY.value, zoom.value)
          }
        }

        drawLine(formatParams, context)
      }
    }
  }

  const onZoom = (amount: number) => {
    const newZoom = zoom.value * amount
    zoom.value = newZoom

    onDrawCanvas()
  }

  const stopDrawing = () => {
    userInteract.value = false
    previousPoint.value = null
  }

  const onStartPan = () => {
    userInteract.value = true
  }

  const onStopPan = () => {
    userInteract.value = false
  }

  const onClearCanvas = () => {
    const canvasEl = canvas.value
    if (!canvasEl) return

    const context = canvasEl.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, canvasEl.width, canvasEl.height)
    drawings.value = []
    onDrawGrid()
  }

  const draw = (activeRoom: string | string[] | null | undefined, { x, y }: Coordinates) => {
    const context = canvas.value?.getContext('2d')
    if (!context || !userInteract.value) return

    const point = transformCoordinates(x, y, canvas.value)

    const prevPoint = previousPoint.value || point

    const drawObj = {
      prev: prevPoint,
      point,
      color: color.value,
      size: size.value,
      roomId: activeRoom
    } as DrawReq

    drawLine(drawObj, context)

    drawings.value.push(drawObj)

    // socket.emit('draw', drawObj)
    previousPoint.value = point
  }

  return {
    color,
    canvas,
    size,
    actionMode,
    wrapper,
    userInteract,
    zoom,
    setActionMode,
    onClearCanvas,
    setCanvas,
    setWrapper,
    draw,
    startDrawing,
    stopDrawing,
    onPan,
    onStartPan,
    onStopPan,
    onZoom
  }
})
