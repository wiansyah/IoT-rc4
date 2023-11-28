<script setup lang="ts">
import { RouterView } from 'vue-router'
// import { RouterLink, RouterView } from 'vue-router'
// <nav>
//   <RouterLink to="/">Home</RouterLink>
//   <RouterLink to="/about">About</RouterLink>
// </nav>
</script>

<template>
  <div class="flex flex-col min-h-screen text-white">
    <RouterView />
  </div>
</template>
