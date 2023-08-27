<template>
  <button
    class="bg-primary-500 hover:bg-primary-600 active:bg-primary-600 disabled:bg-primary-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
