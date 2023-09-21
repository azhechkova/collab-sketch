<!-- eslint-disable no-case-declarations -->
<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import type { Socket } from 'socket.io-client'

import type { ActionMode, RoomType } from '@/types/index'
import { useEditorStore } from '@/stores/editor'
import { useRoomsStore } from '@/stores/room'
import updateRoomImage from '@/utils/updateRoomImage'
import getFormatClientCoordinates from '@/utils/getFormatClientCoordinates'
import drawLine from '@/utils/drawLine'
import BaseCard from '../atoms/BaseCard.vue'
import { ACTION_MODES } from '@/constants'

const { activeRoom } = defineProps<{
  activeRoom?: string | string[] | null
}>()
const socket = inject('socket') as Socket

const store = useEditorStore()
const roomsStore = useRoomsStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const wrapperRef = ref<HTMLDivElement | null>(null)

const setupCanvas = (ctx: CanvasRenderingContext2D) => {
  if (!canvasRef.value || !activeRoom || !wrapperRef.value) return
  store.setCanvas(canvasRef.value)
  store.setWrapper(wrapperRef.value)
  socket.on('draw', ({ prev, point, color, size, roomId }) => {
    if (roomId !== activeRoom) return
    drawLine({ prev, point, color, size }, ctx)
  })

  socket.on('updateRoom', (updatedRoom: RoomType) => {
    updateRoomImage(canvasRef.value, updatedRoom)
  })
}

const onMouseMove = (event: PointerEvent | TouchEvent) => {
  switch (store.actionMode) {
    case ACTION_MODES.draw:
      const { clientX, clientY } = getFormatClientCoordinates(event)

      store.draw(activeRoom, { x: clientX, y: clientY })
      break
    case ACTION_MODES.pan:
      store.onPan(event)
      break
  }
}

const onMouseDown = (e: MouseEvent) => {
  switch (store.actionMode) {
    case ACTION_MODES.draw:
      store.startDrawing(e)
      break

    case ACTION_MODES.pan:
      store.onStartPan()
  }
}

const onMouseUp = () => {
  switch (store.actionMode) {
    case ACTION_MODES.draw:
      store.stopDrawing()
      break
    case ACTION_MODES.pan:
      store.onStopPan()
  }
}

watchEffect(() => {
  const ctx = canvasRef.value?.getContext('2d')
  const activeRoomObj = roomsStore.rooms.find((item) => item._id === activeRoom) || null

  if (ctx && activeRoomObj) {
    updateRoomImage(canvasRef.value, activeRoomObj)
    setupCanvas(ctx)
  }
})

const getCursorStyle = (mode: ActionMode | null) => {
  switch (mode) {
    case 'pan':
      return store.userInteract ? 'grabbing' : 'grab'
    default:
      return 'default'
  }
}
</script>

<template>
  <BaseCard
    :style="{
      cursor: getCursorStyle(store.actionMode)
    }"
    class="relative bg-gray-100 w-[calc(100vw-100px)] h-[calc(100vw-100px)] overflow-hidden"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
  >
    <canvas id="canvasOverlay" class="absolute inset-0" />

    <div ref="wrapperRef" class="absolute bg-white w-[500px] h-[500px]">
      <canvas ref="canvasRef" width="500" height="500" />
    </div>
  </BaseCard>
</template>
