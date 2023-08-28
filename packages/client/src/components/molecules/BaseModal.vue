<script setup lang="ts">
import BaseCard from '../atoms/BaseCard.vue'
import BasePortal from '../atoms/BasePortal.vue'

defineProps<{
  isOpen: boolean
  onClose: () => void
}>()
</script>

<template>
  <BasePortal>
    <div
      v-if="$props.isOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"
      @click="onClose"
    >
      <BaseCard
        @click.stop
        class="bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col max-w-[400px] w-full"
      >
        <button class="self-end" @click="$props.onClose"><VueFeather type="x" /></button>
        <div class="w-full">
          <slot />
        </div>
      </BaseCard>
    </div>
  </BasePortal>
</template>
