<template>
    <div
        class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col justify-between h-full max-w-lg ">
        <div>
            <img v-if="image" :src="image" alt="" class="w-full h-60 object-cover rounded-md mb-4" />
            <h3 class="text-xl font-semibold text-primary mb-2">{{ title }}</h3>
            <p class="text-gray-700 text-base mb-4">{{ description }}</p>
        </div>
        <a :href="link" class="font-medium hover:underline mt-auto link">
            {{ linkLabel || 'Accéder à l’article →' }}
        </a>
    </div>
</template>

<script setup>
defineProps({
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
</style>