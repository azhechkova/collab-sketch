<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
import type { RoomType } from '@/types'
import { useEditorStore } from '@/stores/editor'
import TheLegend from '../organisms/TheLegend.vue'
import TheEditor from '../organisms/TheEditor.vue'
import MainTemplate from '../templates/MainTemplate.vue'
import BaseCard from '../atoms/BaseCard.vue'

const route = useRoute()
const store = useEditorStore()
const activeRoomId = ref<string | string[] | null>(null)
const activeRoom = ref<RoomType | null>(null)

watchEffect(() => {
  activeRoomId.value = route.params.room || null

  activeRoom.value = store.rooms.find((room) => room._id === activeRoomId.value) || null
})
</script>

<template>
  <MainTemplate class="flex flex-col gap-2 items-baseline">
    <RouterLink to="/">
      <BaseCard>Back</BaseCard>
    </RouterLink>
    <section class="flex flex-col gap-3">
      <TheLegend class="relative z-10" :activeRoom="route.params.room" />
      <TheEditor class="flex-shrink-0" :activeRoom="route.params.room" />
    </section>
  </MainTemplate>
</template>
