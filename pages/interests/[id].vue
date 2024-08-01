<template>
    <v-container>
        <div class="my-4 flex items-center justify-between">
            <h1 class="text-3xl font-bold">Edit Interest</h1>
        </div>
        <FormsInterestForm :data="interestData" v-if="interestData" />
    </v-container>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const interestData = ref(null)

const fetchInterest = async (id) => {
    try {
        const token = localStorage.getItem('auth_token')
        const response = await axios.get(`http://127.0.0.1:8000/api/interests/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        interestData.value = response.data
        console.log('Fetched interest data:', interestData.value) // Debug log
    } catch (error) {
        console.error('Failed to fetch interest:', error)
        router.push('/interests')
    }
}

onMounted(() => {
    const interestId = route.params.id
    fetchInterest(interestId)
})
</script>
