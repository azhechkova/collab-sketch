<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import RoomCard from '../molecules/RoomCard.vue'
import { inject } from 'vue'
import type { Socket } from 'socket.io-client'
import type { RoomType } from '@/types'
import AddRoomCard from '../molecules/AddRoomCard.vue'
import { storeToRefs } from 'pinia'

const store = useEditorStore()
const { rooms } = storeToRefs(store)
const socket = inject('socket') as Socket

const onAddRoom = () => {
  socket.emit('createRoom', (room: RoomType) => {
    store.addRoom(room)
  })
}
</script>

<template>
  <ul class="grid grid-cols-3 gap-2">
    <li>
      <button class="h-full w-full" @click="onAddRoom">
        <AddRoomCard />
      </button>
    </li>
    <li v-for="room in rooms" :key="room._id">
      <RouterLink :to="room._id"> <RoomCard :room="room" /></RouterLink>
    </li>
  </ul>
</template>
