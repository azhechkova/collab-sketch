<script setup lang="ts">
import { useEditorStore } from '../../stores/editor'
import BaseRangeInput from '../atoms/BaseRangeInput.vue'
import BaseButton from '../atoms/BaseButton.vue'
import ColorSelector from '../molecules/ColorSelector.vue'
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

const onSave = () => {
  const canvas = editorStore.canvas
  if (!canvas) return

  const context = editorStore.canvas?.getContext('2d')
  if (!context) return

  const activeRoom = editorStore.activeRoom
  if (!activeRoom) return
  const newImage = context.canvas.toDataURL()

  socket.emit('updateRoom', { ...activeRoom, image: newImage })
}
</script>

<template>
  <div class="flex flex-col px-3 gap-3">
    <BaseRangeInput v-model="editorStore.size" min="1" max="10" label="Size"></BaseRangeInput>
    <ColorSelector v-model="editorStore.color" :colors="COLORS" />
    <BaseButton @click="onClick">Clear</BaseButton>
    <BaseButton @click="onSave">Save</BaseButton>
  </div>
</template>
