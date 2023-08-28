<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import 'vue3-colorpicker/style.css'

import { useEditorStore } from '@/stores/editor'
import BaseRangeInput from '../atoms/BaseRangeInput.vue'
import BaseCard from '../atoms/BaseCard.vue'
import { inject } from 'vue'
import BaseIconButton from '../atoms/BaseIconButton.vue'

const props = defineProps<{
  activeRoom?: string | string[] | null
}>()

const editorStore = useEditorStore()
const socket = inject('socket') as Socket

const onClick = () => {
  const canvas = editorStore.canvas
  if (!canvas) return

  const context = canvas.getContext('2d')
  if (!context) return

  context.clearRect(0, 0, canvas.width, canvas.height)
}

const onSave = () => {
  const canvas = editorStore.canvas
  if (!canvas || !props.activeRoom) return

  const context = canvas.getContext('2d')

  if (!context) return

  const newImage = context.canvas.toDataURL()
  const roomObj = editorStore.rooms.find((item) => item._id === props.activeRoom)

  if (!roomObj) return

  const newRoom = { ...roomObj, image: newImage }

  socket.emit('updateRoom', newRoom)
}
</script>

<template>
  <BaseCard class="flex flex-row px-3 gap-3 items-center justify-between">
    <div class="flex gap-4">
      <BaseRangeInput v-model="editorStore.size" min="1" max="10" />
      <ColorPicker v-model:pureColor="editorStore.color" />
    </div>
    <div class="flex gap-4">
      <BaseIconButton type="save" class="text-primary-500" @click="onSave" />
      <BaseIconButton type="trash" class="text-error-200" @click="onClick" />
    </div>
  </BaseCard>
</template>
