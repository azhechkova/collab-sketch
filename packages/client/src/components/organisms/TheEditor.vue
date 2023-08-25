<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Socket } from 'socket.io-client'
import type { RoomType } from '../../types/index'
import { useEditorStore } from '../../stores/editor'
import updateRoomImage from '@/utils/updateRoomImage'
import transformCoordinates from '@/utils/transformCoordinates'

type Options = {
  prev: {
    x: number
    y: number
  }
  point: {
    x: number
    y: number
  }
  color: string
  width: number
}

const { socket } = defineProps<{
  socket: Socket
}>()

const editorStore = useEditorStore()
const context = ref<CanvasRenderingContext2D | null>(null)
const isDrawing = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const previousPoint = ref<object | null>(null)

const setupCanvas = () => {
  if (!canvasRef.value) return
  const value = canvasRef.value.getContext('2d')
  context.value = value
  editorStore.setCanvas(canvasRef.value)

  socket.emit('findOneRoom', '64e763eaf87ac2d8f50f65f1', (newRoom: RoomType) => {
    editorStore.setActiveRoom(newRoom)
    if (value) updateRoomImage(canvasRef.value, newRoom)
  })

  socket.on('draw', ([prev, point, color, width]) => {
    if (!value) return
    drawLine({ prev, point, color, width }, value)
  })
  socket.on('updateRoom', (updatedRoom: RoomType) => {
    updateRoomImage(canvasRef.value, updatedRoom)
  })
}

const startDrawing = (e: MouseEvent) => {
  if (!context.value) return

  isDrawing.value = true

  const { offsetX, offsetY } = e
  context.value.beginPath()
  context.value.moveTo(offsetX, offsetY)
}

const drawLine = ({ prev, point, color, width }: Options, ctx: CanvasRenderingContext2D) => {
  ctx.lineWidth = width
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(prev.x, prev.y)
  ctx.lineTo(point.x, point.y)
  ctx.stroke()
}

const draw = (e: MouseEvent) => {
  if (!context.value || !isDrawing.value) return
  const { offsetX, offsetY } = e
  const point = transformCoordinates(e.clientX, e.clientY, canvasRef.value)

  context.value.lineWidth = editorStore.size
  context.value.strokeStyle = editorStore.color
  context.value.lineCap = 'round'

  context.value.lineTo(offsetX, offsetY)
  context.value.stroke()

  const prevPoint = previousPoint.value || point
  socket.emit('draw', [prevPoint, point, editorStore.color, editorStore.size])
  previousPoint.value = point
}

const stopDrawing = () => {
  isDrawing.value = false
  previousPoint.value = null
}

onMounted(setupCanvas)
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
