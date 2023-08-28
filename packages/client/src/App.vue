<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import { inject, onMounted } from 'vue'
import { useEditorStore } from './stores/editor'
import type { RoomType } from './types'

const socket = inject('socket') as Socket
const store = useEditorStore()

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
})
</script>

<template>
  <RouterView />
</template>
