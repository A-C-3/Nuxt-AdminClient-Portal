<template>
    <v-container>
        <div class="my-4 flex items-center justify-between">
        <h1 class="text-3xl font-bold">Edit Client</h1>
        </div>
        <FormsClientForm :clientData="clientData" v-if="clientData" />
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const clientData = ref(null)

const fetchClient = async (id) => {
    try {
        const token = localStorage.getItem('auth_token')
        const response = await axios.get(`http://127.0.0.1:8000/api/clients/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        clientData.value = response.data
        console.log('Fetched client data:', clientData.value) // Debug log
    } catch (error) {
        console.error('Failed to fetch client:', error)
        router.push('/clients')
    }
}

onMounted(() => {
    const clientId = route.params.id
    fetchClient(clientId)
})
</script>
