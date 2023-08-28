<script setup lang="ts">
import type { FeatherIconNames } from 'feather-icons'

defineProps<{
  type: FeatherIconNames
}>()
</script>

<template>
  <button @click="$emit('click')">
    <VueFeather :type="$props.type" />
  </button>
</template>
