<script setup lang="ts">
import { format } from 'date-fns'
import type { RoomType } from '@/types'
import BaseCard from '../atoms/BaseCard.vue'

defineProps<{
  room: RoomType
  onDelete: (roomId: string) => void
}>()
</script>

<template>
  <BaseCard>
    <div class="flex flex-col gap-2 w-full">
      <div class="flex justify-between">
        <RouterLink :to="room._id">
          <h2 class="text-xl text-black font-semibold">{{ room.name || 'Room' }}</h2></RouterLink
        >
        <button class="hover:text-error-200" @click.stop="onDelete(room._id)">
          <VueFeather type="trash-2" />
        </button>
      </div>
      <p class="text-sm">
        Last Updated: {{ format(new Date($props.room.updatedAt), 'dd MMM, yyyy') }}
      </p>
      <p class="text-sm">
        Created At: {{ format(new Date($props.room.createdAt), 'dd MMM, yyyy') }}
      </p>
    </div>
  </BaseCard>
</template>
