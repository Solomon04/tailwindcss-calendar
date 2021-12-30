<script setup>
import Calendar from "./components/Calendar.vue";
</script>

<template>
  <main class="bg-gray-50">
    <div class="container mx-auto px-6">
      <h1 class="text-3xl font-mono underline mb-8">Tailwind CSS Calendar!</h1>
      <Calendar />
    </div>
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
