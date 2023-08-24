<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import Editor from '../atoms/Editor.vue'
import Legend from '../molecules/Legend.vue'
import { inject } from 'vue'

const socket = inject('socket') as Socket
</script>

<template>
  <div class="flex gap-2">
    <Editor class="flex-shrink-0" :socket="socket" />
    <Legend :socket="socket" />
  </div>
</template>
