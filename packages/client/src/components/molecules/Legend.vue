<script setup lang="ts">
import { useEditorStore } from '../../stores/editor'
import RangeInput from '../atoms/RangeInput.vue'
import ColorSelector from './ColorSelector.vue'
import { COLORS } from '../../constants/index'

const editor = useEditorStore()
</script>

<template>
  <div class="flex flex-col px-3 gap-3">
    <RangeInput v-model="editor.size" min="1" max="10" label="Size" />
    {{ editor.size }}
    <ColorSelector v-model="editor.color" :colors="COLORS" />
  </div>
</template>
