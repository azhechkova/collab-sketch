import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const color = ref('#000')
  const size = ref(2)
  const context = ref<CanvasRenderingContext2D | null>(null)

  const setupContext = (value: CanvasRenderingContext2D) => {
    context.value = value
  }

  return { color, context, size, setupContext }
})
