<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import 'vue3-colorpicker/style.css'

import { useEditorStore } from '@/stores/editor'
import BaseRangeInput from '../atoms/BaseRangeInput.vue'
import BaseButton from '../atoms/BaseButton.vue'

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
}

const onSave = () => {
  const canvas = editorStore.canvas
  const activeRoom = editorStore.activeRoom

  if (!canvas || !activeRoom) return

  const context = editorStore.canvas?.getContext('2d')
  if (!context) return

  const newImage = context.canvas.toDataURL()
  const newRoom = { ...activeRoom, image: newImage }
  socket.emit('updateRoom', newRoom)
  editorStore.updateRoom(newRoom)
}
</script>

<template>
  <div class="flex flex-col px-3 gap-3">
    <BaseRangeInput v-model="editorStore.size" min="1" max="10" label="Size"></BaseRangeInput>
    <label>Choose color: <ColorPicker v-model:pureColor="editorStore.color"></ColorPicker></label>
    <BaseButton @click="onClick">Clear</BaseButton>
    <BaseButton @click="onSave">Save</BaseButton>
  </div>
</template>
