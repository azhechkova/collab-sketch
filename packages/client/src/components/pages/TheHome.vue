<script setup lang="ts">
import RoomList from '../organisms/RoomList.vue'
import MainTemplate from '../templates/MainTemplate.vue'
import { useRoomsStore } from '@/stores/room';

const store = useRoomsStore()
</script>

<template>
  <MainTemplate>
    <div v-if="!store.rooms?.length">Loading...</div>
    <RoomList v-else></RoomList>
  </MainTemplate>
</template>
