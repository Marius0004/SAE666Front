<template>
    <div id="signaler-section" class="signaler-section">
      <div class="container-two-columns">
        <!-- Formulaire à gauche -->
        <div class="form-container">
          <!-- Header -->
          <div class="header">
            <h1 class="title">SIGNALER</h1>
            <p class="subtitle">
              Utiliser la carte pour signaler un événement, un problème ou informer d'une nouveauté
            </p>
          </div>
  
          <form @submit.prevent="handleSubmit" class="form">
            <!-- Titre -->
            <div class="form-group">
              <input
                v-model="formData.titre"
                type="text"
                placeholder="Titre"
                class="input"
              />
            </div>

            <!-- Type de signalement -->
            <div class="form-group">
              <select
                v-model="formData.type"
                class="select"
              >
                <option value="" disabled>Choisir le type de signalement</option>
                <option value="nuisance">Nuisance</option>
                <option value="degradation">Dégradation</option>
                <option value="travaux">Travaux</option>
                <option value="accident">Accident</option>
                <option value="evenement">Événement</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="securite">Sécurité</option>
                <option value="autre">Autre</option>
              </select>
            </div>
  
            <!-- Description -->
            <div class="form-group">
              <textarea
                v-model="formData.description"
                placeholder="Description"
                rows="4"
                class="textarea"
              />
            </div>
  
            <!-- Géolocalisation (readonly, mis à jour par la carte) -->
            <div class="form-group">
              <input
                v-model="formData.geolocation"
                type="text"
                placeholder="Cliquer sur la carte pour choisir un endroit"
                class="input"
                readonly
              />
            </div>
  
            <!-- Ajouter une photo -->
            <div class="form-group photo-upload">
              <label class="photo-label">
                <div class="photo-icon-wrapper">
                  <div class="photo-icon">📷</div>
                </div>
                <span class="photo-text">Ajouter une photo</span>
                <input
                  type="file"
                  accept="image/*"
                  @change="handlePhotoUpload"
                  class="photo-input"
                />
              </label>
              <p v-if="formData.photo" class="photo-filename">
                📸 {{ formData.photo.name }}
              </p>
            </div>
  
            <!-- Bouton de soumission -->
            <button type="submit" class="btn-submit">Envoyer le signalement</button>
          </form>
        </div>
  
        <!-- Carte à droite -->
        <div ref="mapContainer" class="map-container"></div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import { useToast } from 'vue-toastification'
const toast = useToast();

const formData = ref({
  titre: '',
  type: '',
  description: '',
  geolocation: '',
  photo: null
})

const mapContainer = ref(null)
let map, marker

const initMap = () => {
  map = L.map(mapContainer.value).setView([48.8566, 2.3522], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  map.on('click', (e) => {
    const { lat, lng } = e.latlng
    formData.value.geolocation = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    if (marker) {
      marker.setLatLng(e.latlng)
    } else {
      marker = L.marker(e.latlng).addTo(map)
    }
  })
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1]
      formData.value.photo = {
        file,
        base64,
        name: file.name,
        type: file.type,
        size: file.size
      }
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  try {
    if(localStorage.getItem('userId') === null) {
      toast.error('Vous devez être connecté pour signaler un problème')
      return
    }
    if (!formData.value.titre.trim()) {
        toast.error('Le titre est requis')
      return
    }
    if (!formData.value.type) {
      toast.error('Le type de signalement est requis')
      return
    }
    if (!formData.value.geolocation) {
      toast.error('Veuillez cliquer sur la carte pour choisir une localisation')
      return
    }

    const payload = {
      titre: formData.value.titre,
      tags: formData.value.type,
      description: formData.value.description,
      user: `/api/users/${localStorage.getItem('userId')}`,
      etat: 'ouvert'
    }

    if (formData.value.geolocation) {
      const [lat, lng] = formData.value.geolocation.split(', ')
      payload.latitude = lat
      payload.longitude = lng
    }

    if (formData.value.photo && formData.value.photo.base64) {
      payload.image = formData.value.photo.base64
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/signalements`, {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
      },
      body: JSON.stringify(payload)
    })

    const responseText = await response.text()

    if (response.ok) {
        toast.success("Signalement envoyé avec succès !");
      formData.value = {
        titre: '',
        type: '',
        description: '',
        geolocation: '',
        photo: null
      }
      if (marker) {
        map.removeLayer(marker)
        marker = null
      }

      // ✅ Rafraîchir la page après soumission
      location.reload()
    } else {
      let errorMessage = `Erreur ${response.status}: ${response.statusText}`
      if (responseText) {
        try {
          const errorData = JSON.parse(responseText)
          errorMessage += `\nDétails: ${JSON.stringify(errorData, null, 2)}`
        } catch {
          errorMessage += `\nDétails: ${responseText}`
        }
      }
      throw new Error(errorMessage)
    }
  } catch (error) {
    console.error('Erreur complète:', error)
    toast.error(`Erreur lors de l'envoi du signalement:\n${error.message}`)
  }
}

onMounted(() => {
  initMap()
})
</script>
  
  <style scoped>
  /* Conteneur 2 colonnes */
  .container-two-columns {
    display: flex;
    gap: 5rem;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
  }
  
  /* Formulaire à gauche */
  .form-container {
    flex: 1;
  }
  
  /* Carte à droite */
  .map-container {
    flex: 1;
    height: 580px; /* hauteur de la carte */
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
  }
  
  /* Rappelle les styles précédents pour le formulaire */
  .signaler-section {
    min-height: 100vh;
   
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  /* Container & Background */
  .signaler-section {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .container {
    max-width: 28rem; /* environ 448px */
    width: 100%;
  }
  
  /* Header */
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .title {
    font-size: 2.25rem; /* text-4xl */
    font-weight: 700;
    color: #16a34a; /* green-600 */
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #4b5563; /* gray-600 */
    font-size: 0.875rem; /* text-sm */
    line-height: 1.5;
  }
  
  /* Form */
  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  /* Form groups */
  .form-group {
    width: 100%;
  }
  
  /* Inputs, textarea and select */
  .input,
  .textarea,
  .select {
    width: 100%;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid #fed7aa; /* orange-200 */
    border-radius: 1rem;
    color: #374151; /* gray-700 */
    font-size: 1rem;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    outline: none;
    font-family: inherit;
    resize: none;
  }
  
  .input::placeholder,
  .textarea::placeholder {
    color: #f97316; /* orange-400 */
  }
  
  .select option[value=""] {
    color: #f97316; /* orange-400 */
  }
  
  .input:focus,
  .textarea:focus,
  .select:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #fdba74; /* orange-300 */
    background-color: rgba(255, 255, 255, 0.9);
  }
  
  /* Select specific styling */
  .select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }
  
  /* Photo upload */
  .photo-upload {
    display: flex;
    flex-direction: column;
  }
  
  .photo-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    user-select: none;
  }
  
  .photo-icon-wrapper {
    flex-shrink: 0;
  }
  
  .photo-icon {
    width: 3rem;
    height: 3rem;
    background-color: #bfdbfe; /* blue-100 */
    border-radius: 9999px; /* fully rounded */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: background-color 0.2s ease;
  }
  
  .photo-label:hover .photo-icon {
    background-color: #93c5fd; /* blue-200 */
  }
  
  .photo-text {
    color: #f97316; /* orange-500 */
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .photo-label:hover .photo-text {
    color: #ea580c; /* orange-600 */
  }
  
  .photo-input {
    display: none;
  }
  
  .photo-filename {
    margin-top: 0.5rem;
    margin-left: 3.75rem; /* approx ml-15 */
    font-size: 0.875rem;
    color: #4b5563; /* gray-600 */
  }
  
  /* Submit button */
  .btn-submit {
    width: 100%;
    margin-top: 2rem;
    padding: 1rem 0;
    background: linear-gradient(to right, #22c55e, #16a34a);
    color: white;
    font-weight: 600;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.7),
                0 4px 6px -2px rgba(22, 163, 74, 0.5);
    cursor: pointer;
    font-size: 1.125rem;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    border: none;
    outline: none;
  }
  
  .btn-submit:hover {
    background: linear-gradient(to right, #16a34a, #15803d);
    transform: scale(1.02);
    box-shadow: 0 12px 20px -4px rgba(22, 163, 74, 0.9),
                0 6px 8px -2px rgba(22, 163, 74, 0.7);
  }
  
  .btn-submit:focus {
    box-shadow: 0 0 0 3px #4ade80, 0 0 0 6px rgba(74, 222, 128, 0.5);
  }
  </style>