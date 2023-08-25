<script setup lang="ts">
type BaseRangeInputProps = { label?: String; modelValue: number }

defineProps<BaseRangeInputProps>()
defineEmits<{
  (event: 'update:modelValue', payload: number): void
}>()
</script>

<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-1">{{ label }}</label>
    <input
      type="range"
      class="w-full focus:outline-none focus:shadow-outline"
      v-bind="$attrs"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
