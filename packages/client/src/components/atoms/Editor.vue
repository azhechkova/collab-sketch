<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEditorStore } from '../../stores/editor'
import type { Socket } from 'socket.io-client'
import type { RoomType } from '../../types/index'

const { socket } = defineProps<{
  socket: Socket
}>()

const el = ref<HTMLCanvasElement | null>(null)
const editorStore = useEditorStore()
const context = ref<CanvasRenderingContext2D | null>(null)
const isDrawing = ref(false)

const setupCanvas = () => {
  if (!el.value) return
  const value = el.value.getContext('2d')
  context.value = value
  editorStore.setCanvas(el.value)

  socket.emit('findOneRoom', '64e763eaf87ac2d8f50f65f1', (newRoom: RoomType) => {
    editorStore.setActiveRoom(newRoom)
    if (!newRoom.image) return
    const image = new Image()
    image.onload = function () {
      value?.drawImage(image, 0, 0)
    }
    image.src = newRoom.image
  })

  socket.on('updateRoom', (updatedRoom: RoomType) => {
    editorStore.setActiveRoom(updatedRoom)
    if (updatedRoom.image) {
      const image = new Image()
      image.onload = function () {
        context.value?.drawImage(image, 0, 0)
      }
      image.src = updatedRoom.image
    }
  })
}

const startDrawing = (e: MouseEvent) => {
  if (!context.value) return

  isDrawing.value = true

  const { offsetX, offsetY } = e
  context.value.beginPath()
  context.value.moveTo(offsetX, offsetY)
}

const draw = (e: MouseEvent) => {
  if (!context.value || !isDrawing.value) return
  const { offsetX, offsetY } = e
  context.value.lineWidth = editorStore.size
  context.value.strokeStyle = editorStore.color
  context.value.lineTo(offsetX, offsetY)
  context.value.stroke()

  const base64ImageData = el.value?.toDataURL('image/png')
  const activeRoom = editorStore.activeRoom
  if (!activeRoom) return
  socket.emit('updateRoom', { ...activeRoom, image: base64ImageData }, () => {})
}

const stopDrawing = () => {
  isDrawing.value = false
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
      ref="el"
      width="500"
      height="500"
      class="border-black border-solid border-2"
    />
  </div>
</template>
