<script setup lang="ts">
import MainTemplate from '@/components/templates/MainTemplate.vue'
import MainEditor from '@/components/organisms/MainEditor.vue'
import TheSidebar from '@/components/organisms/TheSidebar.vue'
import { inject, onMounted } from 'vue'
import type { Socket } from 'socket.io-client'
import type { RoomType } from './types'
import { useEditorStore } from './stores/editor'

const socket = inject('socket') as Socket
const store = useEditorStore()

const updateRooms = async (res: RoomType[]) => {
  store.setRooms(res)

  if (!store.activeRoom) {
    store.setActiveRoom(res[0])
    return
  }

  const newActiveRoom = res.find((item) => item._id === store.activeRoom?._id)
  if (newActiveRoom) store.setActiveRoom(newActiveRoom)
}

onMounted(() => {
  socket.emit('findAllRooms', updateRooms)
})

const onChangeRoom = (room: RoomType) => {
  store.setActiveRoom(room)
}

const onAddRoom = () => {
  socket.emit('createRoom', (newRoom: RoomType) => {
    const updatedValue = [...store.rooms, newRoom]
    store.setRooms(updatedValue)
  })
}
</script>

<template>
  <MainTemplate>
    <TheSidebar
      :onAddRoom="onAddRoom"
      :onChangeRoom="onChangeRoom"
      :rooms="store.rooms"
      :activeRoom="store.activeRoom"
    ></TheSidebar>
    <MainEditor></MainEditor>
  </MainTemplate>
</template>
