<template>
    <div id="home">
        <div id="content">
            <h1>Bienvenue</h1>
            <h4>Dans la ville de demain</h4>
            <p>une plateforme citoyenne pour une ville durable et connectée .</p>
            <button class="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                </svg>
                <RouterLink to="/nous" class="text">À propos de nous</RouterLink>
            </button>
        </div>
        <img src="../assets/pictures/mur.png" alt="mur vegetalisé" class="rounded-lg" />
    </div>
    <div id="projects">
        <router-view />
    </div>
    <section id="projects" class=" py-16 px-6 md:px-20">
        <input v-model="searchQuery" type="text" id="search" placeholder="Rechercher un signalement par titre..."
            class="p-2  rounded-md w-full" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div v-for="article in filteredArticles.slice(0, 4)" class="mb-6">
                <Card :title="article.title" :description="article.titre" :link="article.link" :image="article.image"
                    :id="article.id" />
            </div>
        </div>
    </section>
    <div id="signaler-form">
        <div id="signalerContent">
            <SignalerSection />
        </div>
    </div>
    <div id="newsletter-section">
        <NewsletterSection />
    </div>
</template>

<script setup>
import Card from '@/components/Card.vue'
import SignalerSection from '@/components/SignalerSection.vue';
import NewsletterSection from '@/components/NewsletterSection.vue';
import { ref, onMounted } from 'vue';
import { computed } from 'vue';
const articles = ref([]);
const fetchArticles = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/signalements", {
            method: "GET",
            headers: {
                "Content-Type": "application/ld+json",
            },
        });
        const data = await response.json();
        articles.value = data.member;
        articles.value = data.member
            .sort((a, b) => b.id - a.id);

    } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
    }
};

onMounted(() => {
    
    // Appel initial pour charger les articles
    fetchArticles();
});
const searchQuery = ref("");

const filteredArticles = computed(() =>
    articles.value.filter((article) =>
        article.titre?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);
</script>

<style scoped>
#home {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    height: 90vh;
    background-color: var(--color-white);
    padding: 50px 100px;
    overflow: hidden;
}

#home::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 900px;
    height: 900px;
    background-image: url(/src/assets/pictures/feuilles.png);
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.6;
    z-index: 0;
}

#content {
    position: relative;
    z-index: 1;
    width: 30%;
}
#signaler-form {
    position: relative;
        display: flex;
        justify-content: space-evenly;
        height: 100vh;
        background-color: var(--color-white);
        
        overflow: hidden;
}
#signaler-form::before {
    content: "";
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 900px;
    height: 900px;
    background-image: url(/src/assets/pictures/feuilles.png);
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.6;
    z-index: 0;
    transform: rotate(180deg);
}
#signalerContent {
    position: relative;
    z-index: 1;
    width: 100%;
}
img {
    width: 500px;
    height: 403px;
    position: relative;
    z-index: 1;
    margin-top: 50px;
}

h1 {
    color: var(--color-primary);
    font-size: 89px;
    font-weight: 700;
}

h4 {
    color: var(--color-primary);
    font-size: 40px;
    font-weight: 400;
}

p {
    color: var(--color-primary);
    font-size: 24px;
    font-weight: 300;
}

/* From Uiverse.io by reshades */
.button {
    margin-top: 50px;
    background-color: #ffffff00;
    color: var(--color-primary);
    width: 15em;
    height: 2.9em;
    border: var(--color-primary) 0.2em solid;
    border-radius: 11px;
    text-align: right;
    transition: all 0.6s ease;
}

.button:hover {
    background-color: var(--color-primary);
    color: var(--color-secondary);
    cursor: pointer;
}

.button svg {
    width: 1.6em;
    margin: 0 0.8em 1em;
    position: absolute;
    display: flex;
    transition: all 0.6s ease;
}

.button:hover svg {
    transform: translateX(5px);
}

.text {
    margin: 0 1.5em
}
#search{
    margin-bottom: 1.5em;
    color: var(--color-primary); 
    background-color: white;
    box-shadow:  0 2px 4px rgba(0, 0, 0, 0.1);
}
#search::placeholder {
    color: var(--color-primary);
}
#search:focus {
    outline: none;
    border: solid 2px var(--color-primary);
}
#newsletter-section {
    height: 100vh;
    display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
}
</style>
