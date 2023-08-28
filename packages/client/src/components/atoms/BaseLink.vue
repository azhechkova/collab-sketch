<script setup lang="ts">
defineProps<{
  isActive?: boolean
}>()
</script>

<template>
  <div
    class="flex cursor-pointer items-center gap-2 rounded p-3 text-gray-400 transition-all ease-in-out hover:bg-gray-300 hover:text-gray-700"
    :class="{ 'bg-gray-100': isActive }"
  >
    <slot />
  </div>
</template>
