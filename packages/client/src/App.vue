<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import { inject, onMounted } from 'vue'
import { useRoomsStore } from './stores/room'
import type { RoomType } from './types'

const socket = inject('socket') as Socket
const store = useRoomsStore()

onMounted(() => {
  socket.emit('findAllRooms', (res: RoomType[]) => {
    store.setRooms(res)
  })
  socket.on('updateRoom', (room: RoomType) => {
    store.updateRoom(room)
  })
  socket.on('createRoom', (room: RoomType) => {
    store.addRoom(room)
  })
  socket.on('removeRoom', (roomId: string) => {
    store.removeRoom(roomId)
  })
})
</script>

<template>
  <RouterView />
</template>
