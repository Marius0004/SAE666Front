<template>
    <div class="shadow p-4 flex justify-between items-center">
        <div class="flex  gap-2">
            <!-- menu burger -->
            <!-- <Menu /> -->
            <!-- logo -->
            <div class="flex items-center ml-4">
                <RouterLink to="/"><img src="../assets/pictures/logo.png" alt="Logo" class="h-12 mr-2" /></RouterLink>
            </div>
        </div>

        <!-- menu -->

        <nav class="mt-10 space-y-4 ">
            <RouterLink to="/" class="block text-lg text-gray-800 hover:text-blue-600">Accueil</RouterLink>
            <RouterLink to="/signalements" class="block text-lg text-gray-800 hover:text-blue-600">Signalements
            </RouterLink>
            <RouterLink to="/nous" class="block text-lg text-gray-800 hover:text-blue-600">À propos de nous
            </RouterLink>
            <div v-if="user">
                <RouterLink :to="`/profil`" class="block text-lg text-gray-800 hover:text-blue-600">Profil
                </RouterLink>
            </div>
            <div v-else>
                <RouterLink to="/login" class="block text-lg text-gray-800 hover:text-blue-600">Connexion
                </RouterLink>
            </div>

        </nav>
        <!-- partie connexion  -->
        <div v-if="user">
            <span class="text-lg">Bienvenue, {{ user.email }}</span>
            <button class="btn" @click="logout">Se déconnecter</button>
        </div>
        <div v-else>
            <RouterLink to="/login"><button class="btn">Se connecter</button></RouterLink>
        </div>
    </div>


</template>

<script setup>

import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import Menu from './Menu.vue'
const router = useRouter()
const auth = useAuthStore()
const { user } = storeToRefs(auth)  
const userId = ref("")



function logout() {
    auth.logout()
    router.push('/login')
}
</script>

<style scoped>
.btn {
    width: 130px;
    height: 40px;
    border: 3px solid var(--color-secondary);
    border-radius: 50px;
    transition: all 0.3s;
    cursor: pointer;
    background: var(--color-primary);
    color: var(--color-secondary);
    font-size: 0.8em;

    font-weight: 550;
}

.btn:hover {
    background: var(--color-secondary);
    color: var(--color-primary);
    font-size: 1em;
}

nav {
    display: flex;
    gap: 20px;
    color: var(--color-secondary);
}

a {
    color: var(--color-secondary);
    text-decoration: none;

}

a:hover {

    text-decoration: underline;
}
span{
    color: var(--color-secondary);
    font-weight: 600;
    font-size: 1.2em;
    margin-right: 20px;
}
</style>