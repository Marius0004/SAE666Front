<template>
    <div class="card">
      <h1>👤 Mon Profil</h1>
      <p><strong>Email :</strong> {{ user?.email }}</p>
  
      <hr />
  
      <h2>📋 Mes signalements</h2>
  
      <div v-if="signalements.length === 0">
        <em>Aucun signalement trouvé.</em>
      </div>
  
      <ul v-else>
        <li v-for="s in signalements" :key="s['@id']" class="signalement">
          <p><strong>Titre :</strong> {{ s.titre }}</p>
          <p><strong>Type :</strong> {{ s.tags }}</p>
          <p><strong>Description :</strong> {{ s.description }}</p>
          <p><strong>État :</strong> {{ s.etat }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const API_URL = import.meta.env.VITE_API_URL
  
  const user = ref(null)
  const signalements = ref([])
  
  onMounted(async () => {
    if (!userId || !token) {
      alert('Utilisateur non connecté')
      return
    }
  
    try {
      // Récupère l'utilisateur
      const resUser = await fetch(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: token,
          Accept: 'application/ld+json'
        }
      })
  
      if (!resUser.ok) throw new Error('Erreur utilisateur')
  
      const userData = await resUser.json()
      user.value = userData
  
      // Charger tous les signalements à partir des IRIs
      const signalementIRIs = userData.signalements || []
      const fetchPromises = signalementIRIs.map(iri => {
        const cleanedIRI = iri.replace(/^\/api/, '')
        return fetch(`${API_URL}${cleanedIRI}`, {
          headers: {
            Authorization: token,
            Accept: 'application/ld+json'
          }
        }).then(res => res.json())
      })

      signalements.value = await Promise.all(fetchPromises)
      console.log('Signalements chargés:', signalements.value)
    } catch (err) {
      console.error(err)
      alert('Erreur lors du chargement des données.')
    }
  })
  </script>
  
  <style scoped>
  .card {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 1rem;
    background: #f9fafb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h1, h2 {
    color: #111827;
  }
  
  .signalement {
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #fff;
    margin-top: 1rem;
  }
  </style>
  