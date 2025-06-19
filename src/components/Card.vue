<template>
    <div
      class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col justify-between h-full max-w-lg "
    >
      <div>
        <div class="w-full h-60 object-cover rounded-md mb-4 bg-gray-100 flex items-center justify-center">
      <RouterLink :to="`/signalement/${id}`" class="font-medium hover:underline mt-auto link">
        <img
          v-if="image"
          :src="`data:image/jpeg;base64,${image}`"
          alt="Image description"
          class="w-full h-60 object-cover rounded-md mb-4"
        />
    </RouterLink>
        </div>
        <div id="card-content">
        <h3 class="text-xl font-semibold text-primary mb-2">{{ title }}</h3>
        <p class="text-gray-700 text-base mb-4">{{ description }}</p>
        </div>
    </div>
      <RouterLink :to="`/signalement/${id}`" class="font-medium hover:underline mt-auto link">Accéder à l’article →</RouterLink>
    </div>
  </template>
  
  <script setup>
  defineProps({
    id: {
      type: [String, Number],
      required: true,
    },
    title: String,
    description: String,
    link: String,
    linkLabel: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  })
  </script>
  
  <style scoped>
  .link {
    color: var(--color-primary);
  }
  img {
  width: 100%;          
  height: 250px;         
  object-fit: cover;     
  border-radius: 12px;   
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.05); 
}
    #card-content {
        margin-top: 1rem;
    }
  </style>
  