<script setup lang="ts">
defineProps<{
  label: string
  modelValue?: string
  isChecked: boolean
}>()
defineEmits<{
  (event: 'update:modelValue', payload: string): void
}>()
</script>

<template>
  <label class="flex items-center">
    <input
      type="radio"
      class="form-radio h-4 w-4 text-blue-500 focus:outline-none focus:shadow-outline"
      v-bind="$attrs"
      :checked="isChecked"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span class="ml-2 text-gray-700">{{ label }}</span>
  </label>
</template>
