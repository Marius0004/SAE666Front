<script setup>
import headerPage from './components/Header.vue'
import footerPage from './components/Footer.vue'
</script>

<template>
  <header>
    <headerPage />
  </header>
  <router-view />
  <footer>
    <footerPage />
  </footer>
</template>

<style scoped>
header {
  background-color: var(--color-primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
