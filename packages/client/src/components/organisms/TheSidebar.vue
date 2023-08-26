<script setup lang="ts">
import type { RoomType } from '@/types'
import NavButton from '../molecules/NavButton.vue'
import { useEditorStore } from '@/stores/editor'

const store = useEditorStore()

defineProps<{
  onChangeRoom: (room: RoomType) => void
  onAddRoom: () => void
}>()
</script>

<template>
  <nav>
    <ul class="flex flex-col gap-2 w-full pr-10 overflow-auto">
      <li v-for="(room, index) in store.rooms" :key="room._id">
        <NavButton
          :onClick="() => onChangeRoom(room)"
          :isActive="store.activeRoom?._id === room._id"
        >
          {{ index + 1 }} Room
        </NavButton>
      </li>
      <li>
        <NavButton :onClick="onAddRoom">Add</NavButton>
      </li>
    </ul>
  </nav>
</template>
