<script setup lang="ts">
import type { ColorType } from '@/types'
import Radio from '../atoms/Radio.vue'
defineProps<{
  modelValue: string
  colors: ColorType[]
}>()
defineEmits<{
  (event: 'update:modelValue', payload: string): void
}>()
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="p-4">
      <div class="space-y-2">
        <Radio
          v-for="(item, index) in colors"
          :key="index"
          :label="item.label"
          :value="modelValue"
          @change="$emit('update:modelValue', item.value)"
          :is-checked="modelValue === item.value"
        />
      </div>
    </div>
  </div>
</template>
