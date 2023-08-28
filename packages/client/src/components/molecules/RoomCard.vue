<script setup lang="ts">
import type { RoomType } from '@/types'
import BaseCard from '../atoms/BaseCard.vue'

defineProps<{
  room: RoomType
}>()
</script>

<template>
  <BaseCard>
    <div class="flex flex-col gap-2">
      <h2 class="text-xl text-black font-semibold">Room</h2>
      <p class="text-sm">Last updated: {{ new Date($props.room.updatedAt).toDateString() }}</p>
    </div>
  </BaseCard>
</template>
