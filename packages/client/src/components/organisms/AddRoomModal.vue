<script setup lang="ts">
import type { CreateRoomType } from '@/types'
import BaseModal from '../molecules/BaseModal.vue'
import BaseButton from '../atoms/BaseButton.vue'
import { ref } from 'vue'
import BaseInput from '../atoms/BaseInput.vue'

defineProps<{
  isOpen: boolean
  onClose: () => void
  onSave: (room: CreateRoomType) => void
}>()

const value = ref({ name: '' })
</script>
<template>
  <BaseModal :is-open="$props.isOpen" :on-close="$props.onClose">
    <form @submit.prevent="$props.onSave(value)" class="w-full">
      <h2 class="text-black text-xl mb-4 font-semibold">Create room</h2>
      <BaseInput v-model="value.name" placeholder="Room name" />
      <BaseButton class="w-full" type="submit">Save</BaseButton>
    </form>
  </BaseModal>
</template>
