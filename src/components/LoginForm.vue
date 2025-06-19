<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useAuthStore } from '@/stores/useAuthStore'


const auth = useAuthStore()
const router = useRouter();
const toast = useToast();
const mode = ref('login');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
    if (mode.value === 'login') {
        await handleLogin();
    } else {
        await register();
    }
};

const handleLogin = async () => {
    console.log("Tentative de connexion...");

    try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('userId', data.id);
        toast.success("Connexion réussie !");
        auth.login({ email: data.user }, data.token);
        router.push('/'); // Redirige vers l'accueil après connexion
    } catch (error) {
        toast.error("Échec de la connexion. Vérifiez vos informations.");
        console.error("Erreur de connexion:", error);
    }
};

const register = async () => {
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Les mots de passe ne correspondent pas.";
        return;
    }
    console.log("Données envoyées:", JSON.stringify({
        email: email.value,
        password: password.value,
    }));
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        handleLogin();

    } catch (error) {
        console.error("Erreur d'inscription:", error);
        errorMessage.value = "Échec de l'inscription. Vérifiez vos informations.";
    }
};

</script>

<template>
    <div class="contenaireForm">
        <form class="form" @submit.prevent="handleSubmit">
            <h2>{{ mode === 'login' ? 'Connexion' : 'Inscription' }}</h2>

            <span class="input-span">
                <label for="email" class="label">Email</label>
                <input type="email" name="email" id="email" v-model="email" required />
            </span>

            <span class="input-span">
                <label for="password" class="label">Mot de passe</label>
                <input type="password" name="password" id="password" v-model="password" required />
            </span>

            <span class="input-span" v-if="mode === 'register'">
                <label for="confirmPassword" class="label">Confirmer le mot de passe</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            </span>
            <button type="submit">
                {{ mode === 'login' ? 'Se connecter' : "S'inscrire" }}
                <div class="arrow-wrapper">
                    <div class="arrow"></div>
                </div>
            </button>

            <p class="link" @click="mode = mode === 'login' ? 'register' : 'login'">
                {{ mode === 'login' ? "Pas encore de compte ? Inscris-toi !" : "Déjà un compte ? Connecte-toi !" }}
            </p>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<style scoped>
.contenaireForm {
    width: 450px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
}

.error-message {
    color: red;
    font-weight: 600;
}

.form {
    box-shadow: 0px 1px 20px 0px rgb(39 39 39 / 31%);
    padding: 10px;
    border-radius: 3%;
    background-color: rgb(249, 249, 249);
    --bg-light: #efefef;
    --bg-dark: #707070;
    --clr: #58bc82;
    --clr-alpha: #9c9c9c60;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
}

.form .input-span {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.form input[type="email"],
.form input[type="password"] {
    border-radius: 0.5rem;
    padding: 1rem 0.75rem;
    width: 100%;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--clr-alpha);
    outline: 2px solid var(--bg-dark);
}

.form input[type="email"]:focus,
.form input[type="password"]:focus {
    outline: 2px solid var(--clr);
}

.label {
    align-self: flex-start;
    color: var(--clr);
    font-weight: 600;
}

.form .submit {
    padding: 1rem 0.75rem;
    width: 90%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3rem;
    background-color: var(--bg-dark);
    color: var(--bg-light);
    border: none;
    cursor: pointer;
    transition: all 300ms;
    font-weight: 600;
    font-size: 0.9rem;
}

.form .submit:hover {
    background-color: var(--clr);
    color: var(--bg-dark);
}

.span {
    text-decoration: none;
    color: var(--bg-dark);
}

.span a {
    color: var(--clr);
}

.link:hover {
    cursor: pointer;
    color: #58bc82;
    text-decoration: underline;
}

button {
    --primary-color: #58bc82;
    --secondary-color: #fff;
    --hover-color: #111;
    --arrow-width: 10px;
    --arrow-stroke: 2px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    color: var(--secondary-color);
    padding: 1em 1.8em;
    background: var(--primary-color);
    display: flex;
    transition: 0.2s background;
    align-items: center;
    gap: 0.6em;
    font-weight: bold;
}

button .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

button .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;
}

button .arrow::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: solid var(--secondary-color);
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
}

button:hover {
    background-color: var(--hover-color);
}

button:hover .arrow {
    background: var(--secondary-color);
}

button:hover .arrow:before {
    right: 0;
}
</style>
