<template>
    <div>
        <h1 class="text-xl font-bold">Welcome Back!</h1>
        <form action="" class="flex flex-col gap-4 mt-4" @submit.prevent="login">
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
            <v-btn block elevation="0" color="primary" type="submit">Login</v-btn>
            <p v-if="form.errorMessage" class="text-red-500 mt-2">{{ form.errorMessage }}</p>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const form = reactive({
    email: '',
    password: ''
})

const login = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', form)
        const { token } = response.data

        localStorage.setItem('auth_token', token)
        // Optionally, set the token in Axios headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // Redirect to clients page
        router.push('/clients')
    } catch (error) {
      console.error('Error during login:', error)
      if (error.response && error.response.data) {
        form.errorMessage = error.response.data.message || 'Login failed. Please try again.'
      } else {
        form.errorMessage = 'An unexpected error occurred. Please try again.'
      }
    }
}
</script>
