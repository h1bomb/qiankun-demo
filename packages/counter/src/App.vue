<template>
  <div class="counter">
    <h2>{{ count }}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref<number>(0);
const increment = () => { count.value++ };
const decrement = () => { count.value-- };
</script>
