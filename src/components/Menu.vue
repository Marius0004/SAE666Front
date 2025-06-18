<template>
    <div>
        <!-- Barre du haut -->
        <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
            <button @click="toggleMenu" class="focus:outline-none">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <h1 class="text-xl font-bold">Ma Plateforme</h1>
        </header>

        <!-- Panneau latéral -->
        <transition name="slide">
            <div v-if="menuOpen"
                class="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 p-6 transform transition-transform duration-300 ease-in-out">
                <button @click="toggleMenu" class="absolute top-4 right-4 text-gray-700">
                    ✕
                </button>

                <nav class="mt-10 space-y-4">
                    <RouterLink to="/" class="block text-lg text-gray-800 hover:text-blue-600">Accueil</RouterLink>
                    <RouterLink to="/signalements" class="block text-lg text-gray-800 hover:text-blue-600">Signalements
                    </RouterLink>
                    <RouterLink to="/evenements" class="block text-lg text-gray-800 hover:text-blue-600">Évènements
                    </RouterLink>
                    <RouterLink to="/login" class="block text-lg text-gray-800 hover:text-blue-600">Connexion
                    </RouterLink>
                </nav>
            </div>
        </transition>

        <!-- Overlay sombre -->
        <div v-if="menuOpen" class="fixed inset-0 bg-black bg-opacity-40 z-40" @click="toggleMenu"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const menuOpen = ref(false)

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
/* Animation de slide */
.slide-enter-from {
    transform: translateX(-100%);
}

.slide-enter-to {
    transform: translateX(0%);
}

.slide-leave-from {
    transform: translateX(0%);
}

.slide-leave-to {
    transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
</style>
  
