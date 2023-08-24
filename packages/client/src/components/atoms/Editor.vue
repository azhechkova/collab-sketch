<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEditorStore } from '../../stores/editor'

const el = ref<HTMLCanvasElement | null>(null)
const editorStore = useEditorStore()
const context = ref<CanvasRenderingContext2D | null>(null)
const isDrawing = ref(false)

const setupCanvas = () => {
  if (!el.value) return
  const value = el.value.getContext('2d')
  context.value = value
  editorStore.setupContext(value as CanvasRenderingContext2D)
}

const startDrawing = (e: MouseEvent) => {
  if (!context.value) return

  isDrawing.value = true

  const { offsetX, offsetY } = e
  context.value.beginPath()
  context.value.moveTo(offsetX, offsetY)
  console.log('start drawing')
}

const draw = (e: MouseEvent) => {
  if (!context.value || !isDrawing.value) return
  const { offsetX, offsetY } = e
  context.value.lineWidth = editorStore.size
  context.value.strokeStyle = editorStore.color
  context.value.lineTo(offsetX, offsetY)
  context.value.stroke()
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
