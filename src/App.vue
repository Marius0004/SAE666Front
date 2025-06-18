<script setup>
import headerPage from './components/Header.vue'

</script>

<template>
  <header>
    <headerPage />
  </header>

</template>

<style scoped>
header {
  padding: 1rem;
  background-color: var(--color-primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
