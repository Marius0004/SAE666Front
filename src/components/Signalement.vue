<template>
    
    <div v-if="signalement" class="signalement-card">
      <img
        v-if="signalement.image"
        :src="`data:image/jpeg;base64,${signalement.image}`"
        alt="Image du signalement"
        class="signalement-image"
      />

      <div class="signalement-content">
        <div id="signalement-header">
        <h2>{{ signalement.titre }}</h2>
        <div class="back-button-container">
    <RouterLink to="/" class="back-button">← Retour à l’accueil</RouterLink>
    </div>
        </div>
        <div class="badges">
          <span class="badge tag">{{ signalement.tags }}</span>
          <span class="badge etat" :class="signalement.etat.toLowerCase()">
            {{ signalement.etat }}
          </span>
        </div>
        <p class="description">{{ signalement.description }}</p>
        <p class="coords">📍 {{ signalement.latitude }}, {{ signalement.longitude }}</p>
        <p class="user">👤 Signalé par : {{ userInfo.email || 'Chargement...' }}</p>
      </div>
      <div id="map" class="signalement-map"></div>
    </div>
    <div v-else class="loading">Chargement du signalement...</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import L from 'leaflet'

const signalement = ref(null)
const userInfo = ref({})
const route = useRoute()

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/signalements/${route.params.id}`, {
      headers: { 'Content-Type': 'application/ld+json' },
    })
    signalement.value = await response.json()
    
    // Récupérer les informations de l'utilisateur
    if (signalement.value.user) {
      await fetchUserInfo(signalement.value.user)
    }
    
    // Attendre que le DOM soit mis à jour avec les nouvelles données
    await nextTick()
    
    // Créer la carte une fois que l'élément #map est présent dans le DOM
    if (signalement.value.latitude && signalement.value.longitude) {
      initMap()
    }
  } catch (error) {
    console.error("Erreur lors du chargement du signalement :", error)
  }
})

async function fetchUserInfo(userField) {
  try {
    // Extraire l'ID utilisateur si c'est une URL
    let userId = userField
    if (typeof userField === 'string' && userField.includes('/')) {
      userId = userField.split('/').pop()
    }
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/ld+json',
      },
    })
    
    if (response.ok) {
      userInfo.value = await response.json()
    } else {
      console.error("Erreur lors de la récupération de l'utilisateur:", response.status)
      userInfo.value = { email: 'Utilisateur inconnu' }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur:", error)
    userInfo.value = { email: 'Erreur de chargement' }
  }
}

function initMap() {
  // Vérifier que l'élément existe avant de créer la carte
  const mapElement = document.getElementById('map')
  if (!mapElement) {
    console.error("L'élément #map n'existe pas dans le DOM")
    return
  }

  const map = L.map('map').setView([signalement.value.latitude, signalement.value.longitude], 15)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
  
  L.marker([signalement.value.latitude, signalement.value.longitude]).addTo(map)
}
</script>

<style scoped>
.signalement-card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 2rem auto;
  transition: transform 0.2s ease;
}

.signalement-card:hover {
  transform: translateY(-4px);
}

.signalement-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
}

.signalement-content {
  padding: 20px;
}

h2 {
  margin: 0;
  font-size: 1.6rem;
  color: var(--color-primary, #2c3e50);
}

.badges {
  margin: 10px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  background-color: #e5e7eb;
  color: #111;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge.etat.ouvert {
  background-color: #d1fae5;
  color: #065f46;
}

.badge.etat.fermé {
  background-color: #fee2e2;
  color: #991b1b;
}

.description {
  margin: 12px 0;
  color: #444;
  line-height: 1.4;
}

.coords,
.user {
  font-size: 0.85rem;
  color: #666;
}

.signalement-map {
  height: 300px;
  width: 100%;
}

.loading {
  text-align: center;
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #555;
}
.back-button-container {
  max-width: 600px;
  text-align: left;
}

.back-button {
  display: inline-block;
  color: var(--color-primary, #2c3e50);
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 1rem;
  transition: color 0.2s ease;
}

.back-button:hover {
  text-decoration: underline;
  color: #1f2937;
}
#signalement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>