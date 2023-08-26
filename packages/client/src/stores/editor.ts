import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RoomType } from '@/types'
import type { ColorInputWithoutInstance } from 'tinycolor2'

export const useEditorStore = defineStore('editor', () => {
  const color = ref<ColorInputWithoutInstance>('#000')
  const size = ref(1)
  const canvas = ref<HTMLCanvasElement | null>(null)
  const activeRoom = ref<RoomType | null>(null)
  const rooms = ref<RoomType[]>([])

  const setActiveRoom = (value: RoomType) => {
    activeRoom.value = value
  }

  const setCanvas = (value: HTMLCanvasElement) => {
    canvas.value = value
  }

  const setRooms = (value: RoomType[]) => {
    rooms.value = value
  }

  return { color, canvas, size, setCanvas, rooms, setRooms, activeRoom, setActiveRoom }
})
