<script setup lang="ts">
import Radio from '../atoms/Radio.vue'
defineProps<{
  modelValue: string
  colors: any[]
}>()
defineEmits<{
  (event: 'update:modelValue', payload: string): void
}>()
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-4">
      <h2 class="text-2xl font-semibold mb-4">Radio Button Group</h2>
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
