<script setup lang="ts">
import { useEditorStore } from '../../stores/editor'
import RangeInput from '../atoms/RangeInput.vue'
import Button from '../atoms/Button.vue'
import ColorSelector from './ColorSelector.vue'
import { COLORS } from '../../constants/index'
import type { Socket } from 'socket.io-client'

const { socket } = defineProps<{
  socket: Socket
}>()

const editorStore = useEditorStore()

const onClick = () => {
  const canvas = editorStore.canvas
  if (!canvas) return

  const context = editorStore.canvas?.getContext('2d')
  if (!context) return

  context.clearRect(0, 0, canvas.width, canvas.height)

  const activeRoom = editorStore.activeRoom
  if (!activeRoom) return

  socket.emit('updateRoom', { ...activeRoom, image: null })
}
</script>

<template>
  <div class="flex flex-col px-3 gap-3">
    <RangeInput v-model="editorStore.size" min="1" max="10" label="Size" />
    <ColorSelector v-model="editorStore.color" :colors="COLORS" />
    <Button @click="onClick">Clear</Button>
  </div>
</template>
