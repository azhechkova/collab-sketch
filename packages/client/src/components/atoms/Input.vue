<script setup lang="ts">
defineProps<{
  label?: string
  isError?: boolean
  errorText?: string
  modelValue: string
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void
}>()
</script>

<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-1">{{ label }}</label>
    <input
      v-bind="$attrs"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      :class="{
        'border-red-500': isError,
        'border-gray-300': !isError
      }"
    />
    <p v-if="isError" class="text-red-500 text-xs italic">{{ errorText }}</p>
  </div>
</template>
