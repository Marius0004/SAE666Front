<template>
    <section class="bg-secondary py-16 px-6 md:px-20">
        <h2 class="text-3xl font-bold text-primary mb-10 text-center md:text-left">Signaler un évènement</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <form @submit.prevent="submitForm"
                class="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6 w-full max-w-xl mx-auto md:mx-0">

                <div>
                    <label class="block text-sm font-semibold text-primary mb-2">Titre</label>
                    <input v-model="form.title" placeholder="Ex : Panne d’éclairage" class="input" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-primary mb-2">Description</label>
                    <textarea v-model="form.description" placeholder="Décrivez le problème..." rows="4"
                        class="input"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-primary mb-2">Ajouter une photo</label>
                    <input type="file" @change="handleFileUpload" class="input" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-primary mb-2">Adresse</label>
                    <div class="relative">
                        <input v-model="searchQuery" @input="searchAddress" placeholder="Adresse postale"
                            class="input" />
                        <ul v-if="suggestions.length"
                            class="absolute bg-white border border-gray-200 rounded-md mt-1 w-full z-10 max-h-48 overflow-y-auto">
                            <li v-for="(s, i) in suggestions" :key="i" @click="selectAddress(s)"
                                class="p-2 hover:bg-gray-100 cursor-pointer">
                                {{ s.display_name }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mt-4">
                    <button type="submit"
                        class="bg-primary text-whiteish px-6 py-3 rounded-md hover:bg-opacity-90 transition font-semibold">
                        Valider
                    </button>
                </div>
            </form>

            <!-- CARTE -->
            <div id="map" class="w-full h-96 rounded-xl shadow-md"></div>
        </div>
    </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'

const form = ref({
    title: '',
    description: '',
    file: null,
    address: '',
    lat: null,
    lon: null,
})

const searchQuery = ref('')
const suggestions = ref([])

let map, marker

onMounted(() => {
    map = L.map('map').setView([43.6035, 2.24], 14)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map)
})

function handleFileUpload(e) {
    form.value.file = e.target.files[0]
}

async function searchAddress() {
    if (searchQuery.value.length < 3) return
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&addressdetails=1&limit=5&countrycodes=fr`
    )
    if (!res.ok) {
        console.error('Error fetching address suggestions:', res.statusText)
        return
    }
    suggestions.value = await res.json()
}

function selectAddress(address) {
    form.value.address = address.display_name
    form.value.lat = parseFloat(address.lat)
    form.value.lon = parseFloat(address.lon)
    searchQuery.value = address.display_name
    suggestions.value = []

    if (!marker) {
        marker = L.marker([form.value.lat, form.value.lon]).addTo(map)
    } else {
        marker.setLatLng([form.value.lat, form.value.lon])
    }
    map.setView([form.value.lat, form.value.lon], 15)
}

function submitForm() {

}
</script>

<style scoped></style>
