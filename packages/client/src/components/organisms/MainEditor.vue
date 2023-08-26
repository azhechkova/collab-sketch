<script setup lang="ts">
import { inject } from 'vue'
import type { Socket } from 'socket.io-client'

import TheEditor from './TheEditor.vue'
import TheLegend from './TheLegend.vue'

const socket = inject('socket') as Socket
</script>

<template>
  <div class="flex gap-2">
    <TheEditor class="flex-shrink-0" :socket="socket" />
    <TheLegend :socket="socket" />
  </div>
</template>
