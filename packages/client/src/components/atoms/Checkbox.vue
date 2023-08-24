<script setup lang="ts">
defineProps<{
  label?: string
  isError?: boolean
  errorText?: string
  modelValue: boolean
}>()
defineEmits<{
  (event: 'update:modelValue', payload: string): void
}>()
</script>

<template>
  <label class="flex items-center">
    <input
      type="checkbox"
      class="form-checkbox h-5 w-5 text-blue-500 focus:outline-none focus:shadow-outline"
      v-bind="$attrs"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="ml-2 text-gray-700">{{ label }}</span>
  </label>
</template>
