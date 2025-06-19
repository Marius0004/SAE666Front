<template>
    <div id="newsletter">
      <div class="container">
        <!-- Partie gauche : Texte -->
        <div class="left">
          <h1>Newsletter</h1>
          <p>
            <span class="highlight">Ne manquez rien</span><span class="normal"> ! Inscrivez vous à la newsletter de la Mairie de Rive pour suivre les dernières actus et nouveautés !</span>
          </p>
        </div>
  
        <!-- Partie droite : Formulaire -->
        <div class="right">
          <form @submit.prevent="subscribe" class="form">
            <input
              v-model="email"
              type="email"
              placeholder="Votre email"
              required
            />
            <button type="submit">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const subscribe = () => {
    console.log(`Email inscrit : ${email.value}`)
  }
  </script>
  
  <style scoped>
  #newsletter {
    position: relative;
    background-color: rgba(0, 128, 0, 0.6);
    overflow: hidden;
    width: 100%;
    padding: 4rem 2rem;
  }
  
  #newsletter::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(/src/assets/pictures/fond.png);
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.15;
    z-index: 0;
  }
  
  .container {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: white;
  }
  
  .left {
    flex: 1;
    min-width: 280px;
  }
  
  .left h1 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 1rem;
    color: white;
  }
  
  .left p {
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.6;
    max-width: 500px;
  }
  
  .highlight {
    font-size: 1.6rem;
    font-weight: 800;
    color: white;
  }
  
  .normal {
    font-weight: 300;
    font-size: 1.2rem;
  }
  
  .right {
    flex: 1;
    min-width: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
  }
  
  .form input {
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background-color: white;
    color: var(--color-primary);
  }
  .form placeholder {
    color: var(--color-primary);
  }
    .form input:focus {
        outline: none;
        border: 2px solid var(--color-primary);
    }
  
  .form button {
    padding: 0.75rem 1rem;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .form button:hover {
    background-color: #065f46; /* version foncée du vert */
  }
  </style>
  