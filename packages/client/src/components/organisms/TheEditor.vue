<script setup lang="ts">
import { ref } from 'vue'
import type { Socket } from 'socket.io-client'
import { watch } from 'vue'

import type { DrawReq, RoomType } from '@/types/index'
import { useEditorStore } from '@/stores/editor'
import updateRoomImage from '@/utils/updateRoomImage'
import transformCoordinates from '@/utils/transformCoordinates'

const { socket } = defineProps<{
  socket: Socket
}>()

const store = useEditorStore()
const isDrawing = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const previousPoint = ref<object | null>(null)

const setupCanvas = (ctx: CanvasRenderingContext2D) => {
  if (!canvasRef.value || !store.activeRoom) return
  store.setCanvas(canvasRef.value)

  socket.on('draw', ({ prev, point, color, size, room }) => {
    if (room !== store.activeRoom?._id) return
    drawLine({ prev, point, color, size }, ctx)
  })

  socket.on('updateRoom', (updatedRoom: RoomType) => {
    updateRoomImage(canvasRef.value, updatedRoom)
  })
}

const startDrawing = (e: MouseEvent) => {
  const context = canvasRef.value?.getContext('2d')
  if (!context) return
  isDrawing.value = true

  const { offsetX, offsetY } = e
  context.beginPath()
  context.moveTo(offsetX, offsetY)
}

const drawLine = ({ prev, point, color, size }: DrawReq, ctx: CanvasRenderingContext2D) => {
  ctx.lineWidth = size
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(prev.x, prev.y)
  ctx.lineTo(point.x, point.y)
  ctx.stroke()
}

const draw = (e: MouseEvent) => {
  const context = canvasRef.value?.getContext('2d')

  if (!context || !isDrawing.value) return
  const { offsetX, offsetY } = e
  const point = transformCoordinates(e.clientX, e.clientY, canvasRef.value)

  context.lineWidth = store.size
  context.strokeStyle = store.color
  context.lineCap = 'round'

  context.lineTo(offsetX, offsetY)
  context.stroke()

  const prevPoint = previousPoint.value || point
  socket.emit('draw', {
    prev: prevPoint,
    point,
    color: store.color,
    size: store.size,
    room: store.activeRoom?._id
  })
  previousPoint.value = point
}

const stopDrawing = () => {
  isDrawing.value = false
  previousPoint.value = null
}

watch(
  () => store.activeRoom?._id,
  () => {
    const ctx = canvasRef.value?.getContext('2d')

    if (ctx && store.activeRoom) {
      updateRoomImage(canvasRef.value, store.activeRoom)
      setupCanvas(ctx)
    }
  }
)
</script>

<template>
  <div>
    <canvas
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      ref="canvasRef"
      width="500"
      height="500"
      class="border-black border-solid border-2"
    />
  </div>
</template>
