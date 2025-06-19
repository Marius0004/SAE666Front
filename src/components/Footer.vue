<template>
    <footer class="footer">
      <div class="container">
        <div class="logo">
          <img src="../assets/pictures/logoSombre.png" alt="Logo Rive" />
        </div>
        <nav class="nav">
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
      </div>
      <p class="copyright">Copyright © Ville de Rive - 2025</p>
    </footer>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  </script>
  
  <style scoped>
  .footer {
    background-color: #fff7f7; /* couleur légèrement rose comme la maquette */
    padding: 1rem 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.9rem;
    color: #2a7c3a; /* vert foncé */
    text-align: center;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 900;
    font-size: 1.5rem;
    color: #2a7c3a;
  }
  
  .logo img {
    height: 40px;
    width: auto;
  }
  
  .logo-text {
    font-weight: 900;
    letter-spacing: 0.1em;
  }
  
  .nav {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  .nav a {
    color: #2a7c3a;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
  
  .nav a:hover {
    color: #1c5a25;
  }
  
  copyright {
    color: #2a7c3a;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
  </style>
  