import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import type { ActionMode, Coordinates, DrawReq, PointerOrTouchEvent } from '@/types'
import transformCoordinates from '@/utils/transformCoordinates'
import drawLine from '@/utils/drawLine'
import type { Socket } from 'socket.io-client'
import { ACTION_MODES, MAX_ZOOM, MIN_ZOOM } from '@/constants'

export const useEditorStore = defineStore('editor', () => {
  const socket = inject('socket') as Socket

  const canvas = ref<HTMLCanvasElement | null>(null)
  const wrapper = ref<HTMLDivElement | null>(null)
  // TODO: add different types of user interaction
  const userInteract = ref(false)
  const actionMode = ref<ActionMode | null>(ACTION_MODES.draw)

  const previousPoint = ref<Coordinates | null>(null)
  const previousTouchRef = ref<any>(null)
  const scrollPosition = ref<Coordinates>({ x: 0, y: 0 })
  const color = ref<string | CanvasGradient | CanvasPattern>('#000')
  const size = ref(1)
  const zoom = ref(1)

  const setCanvas = (value: HTMLCanvasElement) => {
    canvas.value = value
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
    const context = canvas.value?.getContext('2d')

    if (!context || !userInteract.value) return

    const point = transformCoordinates(x, y, canvas.value, zoom.value)

    context.lineWidth = size.value
    context.strokeStyle = color.value
    drawLine({ point, color: color.value, size: size.value }, context)

    const prevPoint = previousPoint.value || point

    const drawObj = {
      prev: prevPoint,
      point,
      color: color.value,
      size: size.value,
      roomId: activeRoom
    } as DrawReq

    socket.emit('draw', drawObj)
    previousPoint.value = point
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
    scrollPosition.value = {
      x: newX,
      y: newY
    }
    if (wrapper.value) {
      wrapper.value.style.top = `${newY}px`
      wrapper.value.style.left = `${newX}px`
    }
  }

  const onStartPan = () => {
    userInteract.value = true
  }

  const onStopPan = () => {
    userInteract.value = false
  }

  const incrementZoom = (value: number) => {
    let newZoom = zoom.value - value

    if (newZoom > MAX_ZOOM) {
      newZoom = MAX_ZOOM
    }
    zoom.value = newZoom
    if (wrapper.value) wrapper.value.style.transform = `scale(${newZoom / 100})`
  }

  const decrementZoom = (value: number) => {
    let newZoom = zoom.value - value
    if (newZoom < MIN_ZOOM) {
      newZoom = MIN_ZOOM
    }
    zoom.value = newZoom
    if (wrapper.value) wrapper.value.style.transform = `scale(${newZoom / 100})`
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
    incrementZoom,
    decrementZoom
  }
})
