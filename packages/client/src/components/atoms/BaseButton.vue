<template>
  <button
    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
