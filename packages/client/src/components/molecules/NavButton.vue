<script setup lang="ts">
import BaseLink from '../atoms/BaseLink.vue'

defineProps<{
  onClick: () => void
  isActive?: boolean
}>()
</script>

<template>
  <button @click="onClick" class="block w-full">
    <BaseLink :isActive="isActive"><slot /></BaseLink>
  </button>
</template>
