<script setup lang="ts">
import type { ColorType } from '@/types'
import BaseRadio from '../atoms/BaseRadio.vue'

type ColorSelectorProps = {
  modelValue: string
  colors: ColorType[]
}

defineProps<ColorSelectorProps>()
defineEmits<{
  (event: 'update:modelValue', payload: string): void
}>()
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="p-4">
      <div class="space-y-2">
        <BaseRadio
          v-for="item in colors"
          :key="item.value"
          :label="item.label"
          :value="modelValue"
          @change="$emit('update:modelValue', item.value)"
          :is-checked="modelValue === item.value"
        />
      </div>
    </div>
  </div>
</template>
