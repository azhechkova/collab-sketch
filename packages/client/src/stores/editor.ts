import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ActionMode, Coordinates, PointerOrTouchEvent } from '@/types'
import { ACTION_MODES, DEFAULT_ZOOM } from '@/constants'
import { toVirtualX, toVirtualY } from '@/utils/canvasSize'

const cellSize = 40

export const useEditorStore = defineStore('editor', () => {
  const canvas = ref<HTMLCanvasElement | null>(null)
  const wrapper = ref<HTMLDivElement | null>(null)
  const userInteract = ref(false)
  const actionMode = ref<ActionMode | null>(ACTION_MODES.draw)

  const previousPoint = ref<Coordinates | null>(null)
  const previousTouchRef = ref<any>(null)
  const scrollPosition = ref<Coordinates>({ x: 0, y: 0 })
  const color = ref<string | CanvasGradient | CanvasPattern>('#000')
  const size = ref(1)
  const zoom = ref(DEFAULT_ZOOM)
  const offsetX = ref(0)
  const offsetY = ref(0)

  const setCanvas = (value: HTMLCanvasElement) => {
    canvas.value = value
    onDrawCanvas()
  }

  const setWrapper = (value: HTMLDivElement) => {
    wrapper.value = value
    wrapper.value.style.transform = `scale(${zoom.value / 100})`
  }

  const setActionMode = (mode: ActionMode | null) => {
    actionMode.value = mode
  }

  const startDrawing = (e: MouseEvent) => {
    const context = canvas.value?.getContext('2d')
    if (!context) return
    userInteract.value = true

    const { offsetX, offsetY } = e
    context.beginPath()
    context.moveTo(offsetX, offsetY)
  }

  const draw = (activeRoom: string | string[] | null | undefined, { x, y }: Coordinates) => {
    // TODO: add draw line with pan and zoom
    // const context = canvas.value?.getContext('2d')
    // if (!context || !userInteract.value) return
    // const point = transformCoordinates(x, y, canvas.value, zoom.value)
    // context.lineWidth = size.value
    // context.strokeStyle = color.value
    // drawLine(
    //   {
    //     point,
    //     color: color.value,
    //     size: size.value
    //   },
    //   context
    // )
    // const prevPoint = previousPoint.value || point
    // const drawObj = {
    //   prev: prevPoint,
    //   point,
    //   color: color.value,
    //   size: size.value,
    //   roomId: activeRoom,
    //   offsetX: offsetX.value,
    //   offsetY: offsetY.value
    // } as DrawReq
    // socket.emit('draw', drawObj)
    // previousPoint.value = point
  }

  const stopDrawing = () => {
    userInteract.value = false
    previousPoint.value = null
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
    const newX = scrollPosition.value.x + movementX
    const newY = scrollPosition.value.y + movementY

    offsetX.value = newX / zoom.value
    offsetY.value = newY / zoom.value

    onDrawCanvas()
  }

  const onStartPan = () => {
    userInteract.value = true
  }

  const onStopPan = () => {
    userInteract.value = false
  }

  const onDrawCanvas = () => {
    const canvasEl = canvas.value
    const context = canvasEl?.getContext('2d')

    if (canvasEl && context) {
      canvasEl.width = document.body.clientWidth
      canvasEl.height = document.body.clientHeight
      context.clearRect(0, 0, canvasEl.width, canvasEl.height)

      context.strokeStyle = 'rgb(229,231,235)'
      context.lineWidth = 1
      context.beginPath()

      const width = canvasEl.clientWidth
      const height = canvasEl.clientHeight

      for (
        let x = (offsetX.value % cellSize) * zoom.value;
        x <= width;
        x += cellSize * zoom.value
      ) {
        const source = x
        context.moveTo(source, 0)
        context.lineTo(source, height)

        context.fillText(`${toVirtualX(source, offsetX.value, zoom.value).toFixed(0)}`, source, 10)
      }

      for (
        let y = (offsetY.value % cellSize) * zoom.value;
        y <= height;
        y += cellSize * zoom.value
      ) {
        const destination = y
        context.moveTo(0, destination)
        context.lineTo(width, destination)

        context.fillText(
          `${toVirtualY(destination, offsetY.value, zoom.value).toFixed(0)}`,
          0,
          destination
        )
      }

      context.stroke()
    }
  }

  const onZoom = (amount: number) => {
    const newZoom = zoom.value * amount
    zoom.value = newZoom

    onDrawCanvas()
  }

  return {
    color,
    canvas,
    size,
    actionMode,
    scrollPosition,
    wrapper,
    userInteract,
    zoom,
    setActionMode,
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
