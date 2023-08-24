import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RoomType } from '@/types'

export const useEditorStore = defineStore('editor', () => {
  const color = ref('#000')
  const size = ref(1)
  const canvas = ref<HTMLCanvasElement | null>(null)
  const activeRoom = ref<RoomType | null>(null)

  const setActiveRoom = (value: RoomType) => {
    activeRoom.value = value
  }

  const setCanvas = (value: HTMLCanvasElement) => {
    canvas.value = value
  }

  return { color, canvas, size, setCanvas, activeRoom, setActiveRoom }
})
