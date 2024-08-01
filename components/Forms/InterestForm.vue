<template>
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
        <h4 class="my-2 text-xl font-bold">Basic Information</h4>
        <v-text-field
        label="Name"
        variant="outlined"
        density="compact"
        hide-details
        color="primary"
        v-model="form.name"
        ></v-text-field>
        <div class="flex justify-end mt-8 bg-slate-100 p-4 rounded-lg">
        <v-btn type="submit" color="primary" elevation="0">
            <v-icon>mdi-check-bold</v-icon>
            {{ form.id ? 'Update' : 'Save All' }}
        </v-btn>
        </div>
    </form>
</template>
  
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})

const router = useRouter()

const form = reactive({
    id: null,
    name: ''
})

onMounted(() => {
    if (props.data) {
        populateForm(props.data)
    }
})

watch(() => props.data, (newData) => {
    if (newData) {
        populateForm(newData)
    }
})

const populateForm = (data) => {
    form.id = data.id
    form.name = data.name
}

const submitForm = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        const payload = {
            name: form.name
        }

        if (form.id) {
            await axios.put(`http://127.0.0.1:8000/api/interests/${form.id}`, payload, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            alert('Interest updated successfully')
        } else {
            await axios.post('http://127.0.0.1:8000/api/interests', payload, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            alert('Interest created successfully')
        }
        router.push('/interests')
    } catch (error) {
        console.error('Failed to save interest:', error)
    }
}
</script>
