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
                <div class="text">
                    Découvrir nos projet
                </div>
            </button>
        </div>
        <img src="../assets/pictures/mur.png" alt="mur vegetalisé" class="rounded-lg" />
    </div>
    <div id="projects">
        <router-view />
    </div>
    <section id="projects" class=" py-16 px-6 md:px-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <Card title="SIGNALEMENT"
                description="Utiliser la carte pour signaler un évènement, un problème ou informer d’une nouveauté"
                link="/signaler" image="/src/assets/pictures/signalement.jpg" class="justify-self-end" />

            <Card title="NEWSLETTER"
                description="Inscrivez-vous à la newsletter de la Mairie de Rive pour suivre les dernières actus et nouveautés !"
                link="/newsletter" linkLabel="→ Je m’inscris" image="/src/assets/pictures/newsletter.jpg" />
            <Card title="SIGNALEMENT"
                description="Utiliser la carte pour signaler un évènement, un problème ou informer d’une nouveauté"
                link="/signaler" image="/src/assets/pictures/signalement.jpg" class="justify-self-end" />

            <Card title="NEWSLETTER"
                description="Inscrivez-vous à la newsletter de la Mairie de Rive pour suivre les dernières actus et nouveautés !"
                link="/newsletter" linkLabel="→ Je m’inscris" image="/src/assets/pictures/newsletter.jpg" />

        </div>
    </section>
</template>

<script setup>
import Card from '@/components/Card.vue'
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

img {
    width: 500px;
    height: 403px;
    position: relative;
    z-index: 1;
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
</style>
