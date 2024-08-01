<template>
    <div>
        <h1 class="text-xl font-bold">Welcome!</h1>
        <p class="text-slate-400 text-sm">Fill up the form below to register.</p>
        <form @submit.prevent="register" class="flex flex-col gap-4 mt-4">
            <v-text-field
                label="First Name"
                variant="outlined"
                density="compact"
                hide-details
                color="primary"
                v-model="form.first_name"
            ></v-text-field>
            <v-text-field
                label="Last Name"
                variant="outlined"
                density="compact"
                hide-details
                color="primary"
                v-model="form.last_name"
            ></v-text-field>
            <v-text-field
                type="email"
                label="Email"
                variant="outlined"
                density="compact"
                hide-details
                color="primary"
                v-model="form.email"
            ></v-text-field>
            <v-text-field
                type="password"
                label="Password"
                variant="outlined"
                density="compact"
                hide-details
                color="primary"
                v-model="form.password"
            ></v-text-field>
            <v-text-field
                type="password"
                label="Confirm Password"
                variant="outlined"
                density="compact"
                hide-details
                color="primary"
                v-model="form.password_confirmation"
            ></v-text-field>
            <v-btn block elevation="0" color="primary" type="submit">Register</v-btn>
            <ul v-if="form.errorMessages.length" class="text-red-500 mt-2">
                <li v-for="(error, index) in form.errorMessages" :key="index">{{ error }}</li>
            </ul>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errorMessages: []
});

const router = useRouter();

const register = async () => {
    form.errorMessages = [];
    try {
        await axios.post('http://127.0.0.1:8000/api/register', form);
        router.push('/login');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            form.errorMessages = Object.values(error.response.data.errors).flat();
        } else {
            form.errorMessages.push('An unexpected error occurred. Please try again.');
        }
    }
};
</script>
