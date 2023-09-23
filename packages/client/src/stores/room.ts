import type { RoomType } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoomsStore = defineStore('rooms', () => {
  const rooms = ref<RoomType[]>([])

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
    rooms,
    setRooms,
    updateRoom,
    addRoom,
    removeRoom
  }
})
