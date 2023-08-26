<script setup lang="ts">
import type { RoomType } from '@/types'
import NavButton from '../molecules/NavButton.vue'

defineProps<{
  rooms?: RoomType[]
  activeRoom?: RoomType | null
  onChangeRoom: (room: RoomType) => void
  onAddRoom: () => void
}>()
</script>

<template>
  <nav>
    <ul class="flex flex-col gap-2 w-full pr-10 overflow-auto">
      <li v-for="(room, index) in rooms" :key="room._id">
        <NavButton :onClick="() => onChangeRoom(room)" :isActive="activeRoom?._id === room._id">
          {{ index + 1 }} Room
        </NavButton>
      </li>
      <li>
        <NavButton :onClick="onAddRoom">Add</NavButton>
      </li>
    </ul>
  </nav>
</template>
