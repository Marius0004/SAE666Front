<template>
    <section id="home">
      <div class="image-container">
        <img src="../assets/pictures/logo.png" alt="Logo de Rive" />
      </div>
  
      <div class="content">
        <h1>À propos de nous</h1>
        <p class="description">
          La mairie de Rive est vue comme un lieu durable, accessible à tous, au cœur de la ville,
          alimenté par des énergies renouvelables, végétalisé et connecté. C’est plus qu’un bâtiment,
          c’est une invitation à partager et à prendre soin de son environnement.
        </p>
  
        <div class="divider"></div>
  
        <h2>Nos objectifs</h2>
        <p class="description">
          Rénover la mairie et ses services, en passant non seulement par un plan de réaménagement
          urbain (abribus connectés, végétalisation du bâtiment), mais aussi par la mise à jour des
          services de la mairie, avec le lancement d'un site web et d'une application mobile.
        </p>
      </div>
    </section>
  </template>
  
  <script setup>
  // rien à déclarer ici pour l’instant
  </script>
  
  <style scoped>
  #home {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 4rem 2rem;
    flex-wrap: wrap;
    
  }
  
  .image-container img {
    width: 400px;
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .content {
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    color: var(--color-primary);
  }
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-primary);
    text-align: left;
  }
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-top: 1rem;
    text-align: left;
  }
  
  .description {
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.8;
    text-align: justify;
  }
  
  .divider {
    height: 2px;
    background-color: var(--color-primary);
    width: 80px;
    margin: 1rem 0;
  }
  </style>
  