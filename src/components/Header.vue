<template>
    <h1 class="text-3xl font-bold mb-6">Bienvenue sur la plateforme</h1>
    <div class="content">
        <!-- menu -->
        <Menu />
        <!-- partie connexion  -->
        <p class="mb-4">Connectez-vous pour accéder à votre compte.</p>
        <a href="/login" class="btn-primary">Se connecter</a>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Menu from './Menu.vue'

</script>

<style scoped>
.btn-primary {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: background 0.2s ease;
}

.btn-primary:hover {
    background-color: #1d4ed8;
}
</style>