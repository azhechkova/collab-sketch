<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import RoomList from '../organisms/RoomList.vue'
import MainTemplate from '../templates/MainTemplate.vue'

const store = useEditorStore()
</script>

<template>
  <MainTemplate>
    <div v-if="!store.rooms?.length">Loading...</div>
    <RoomList v-else></RoomList>
  </MainTemplate>
</template>
