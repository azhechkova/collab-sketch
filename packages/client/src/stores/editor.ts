import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RoomType } from '@/types'

export const useEditorStore = defineStore('editor', () => {
  const color = ref<string | CanvasGradient | CanvasPattern>('#000')
  const size = ref(1)
  const canvas = ref<HTMLCanvasElement | null>(null)
  const rooms = ref<RoomType[]>([])

  const setCanvas = (value: HTMLCanvasElement) => {
    canvas.value = value
  }

  const setRooms = (value: RoomType[]) => {
    rooms.value = value
  }

  const updateRoom = (value: RoomType) => {
    const updatedRooms = rooms.value.map((item) => {
      if (value._id === item._id) {
        return value
      }
      return item
    })
    rooms.value = updatedRooms
  }

  const addRoom = (value: RoomType) => {
    const updatedRooms = [...rooms.value, value]
    const uniqueList = [...new Map(updatedRooms.map((item) => [item._id, item])).values()]
    rooms.value = uniqueList.sort((item, next) => next.createdAt - item.createdAt)
  }
  const removeRoom = (id: string) => {
    const updatedRooms = [...rooms.value].filter((item) => item._id !== id)
    rooms.value = updatedRooms
  }

  return {
    color,
    canvas,
    size,
    updateRoom,
    addRoom,
    setCanvas,
    rooms,
    setRooms,
    removeRoom
  }
})
