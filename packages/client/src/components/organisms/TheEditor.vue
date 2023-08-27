<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import type { Socket } from 'socket.io-client'

import type { DrawReq, RoomType } from '@/types/index'
import { useEditorStore } from '@/stores/editor'
import updateRoomImage from '@/utils/updateRoomImage'
import drawLine from '@/utils/drawLine'
import transformCoordinates from '@/utils/transformCoordinates'
import BaseCard from '../atoms/BaseCard.vue'

const { activeRoom } = defineProps<{
  activeRoom?: string | string[] | null
}>()
const socket = inject('socket') as Socket

const store = useEditorStore()
const isDrawing = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const previousPoint = ref<object | null>(null)

const setupCanvas = (ctx: CanvasRenderingContext2D) => {
  if (!canvasRef.value || !activeRoom) return
  store.setCanvas(canvasRef.value)

  socket.on('draw', ({ prev, point, color, size, roomId }) => {
    if (roomId !== activeRoom) return
    drawLine({ prev, point, color, size }, ctx)
  })

  socket.on('updateRoom', (updatedRoom: RoomType) => {
    updateRoomImage(canvasRef.value, updatedRoom)
  })
}

const onResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth - 100
  canvas.height = window.innerHeight - 180
}

const startDrawing = (e: MouseEvent) => {
  const context = canvasRef.value?.getContext('2d')
  if (!context) return
  isDrawing.value = true

  const { offsetX, offsetY } = e
  context.beginPath()
  context.moveTo(offsetX, offsetY)
}

const draw = (e: MouseEvent) => {
  const canvas = canvasRef.value
  const context = canvas?.getContext('2d')

  if (!context || !isDrawing.value) return

  const { clientX, clientY } = e
  const point = transformCoordinates(clientX, clientY, canvas)

  context.lineWidth = store.size
  context.strokeStyle = store.color
  drawLine({ point, color: store.color, size: store.size }, context)

  const prevPoint = previousPoint.value || point

  const drawObj = {
    prev: prevPoint,
    point,
    color: store.color,
    size: store.size,
    roomId: activeRoom
  } as DrawReq

  socket.emit('draw', drawObj)
  previousPoint.value = point
}

const stopDrawing = () => {
  isDrawing.value = false
  previousPoint.value = null
}

watchEffect(() => {
  const ctx = canvasRef.value?.getContext('2d')
  const activeRoomObj = store.rooms.find((item) => item._id === activeRoom) || null

  if (ctx && activeRoomObj) {
    updateRoomImage(canvasRef.value, activeRoomObj)
    setupCanvas(ctx)
  }
})
onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <BaseCard>
    <canvas
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      ref="canvasRef"
    />
  </BaseCard>
</template>
