<script setup lang="ts">
import BaseCard from '../atoms/BaseCard.vue'

defineProps<{
  onClick: () => void
  isActive?: boolean
}>()
</script>

<template>
  <button @click="onClick" class="block w-full">
    <BaseCard :isActive="isActive"><slot /></BaseCard>
  </button>
</template>
