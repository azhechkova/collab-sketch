<script setup lang="ts">
import RoomCard from '../molecules/RoomCard.vue'
import { inject, ref } from 'vue'
import type { Socket } from 'socket.io-client'
import AddRoomCard from '../molecules/AddRoomCard.vue'
import { storeToRefs } from 'pinia'
import AddRoomModal from './AddRoomModal.vue'
import type { CreateRoomType } from '@/types'
import { useRoomsStore } from '@/stores/room'

const roomsStore = useRoomsStore()
const { rooms } = storeToRefs(roomsStore)
const socket = inject('socket') as Socket
const isOpen = ref(false)
const onAddRoom = (room: CreateRoomType) => {
  socket.emit('createRoom', room)
  onClose()
}
const onOpen = () => {
  isOpen.value = true
}
const onClose = () => {
  isOpen.value = false
}
const onDeleteRoom = (roomId: string) => {
  socket.emit('removeRoom', roomId)
}
</script>

<template>
  <ul class="grid grid-cols-3 gap-2">
    <li>
      <button class="h-full w-full" @click="onOpen">
        <AddRoomCard />
      </button>
    </li>
    <li v-for="room in rooms" :key="room._id">
      <RoomCard :room="room" :on-delete="onDeleteRoom" />
    </li>
    <AddRoomModal :is-open="isOpen" :on-close="onClose" :on-save="onAddRoom" />
  </ul>
</template>
