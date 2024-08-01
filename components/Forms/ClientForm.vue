<template>
    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <div class="flex gap-4">
        <div class="flex flex-col gap-4 flex-1">
            <h4 class="my-2 text-xl font-bold">Basic Information</h4>
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
            label="Email"
            variant="outlined"
            density="compact"
            hide-details
            color="primary"
            v-model="form.email"
            ></v-text-field>
            <v-text-field
            label="Phone"
            variant="outlined"
            density="compact"
            hide-details
            color="primary"
            v-model="form.contact_no"
            ></v-text-field>
        </div>
        <div class="flex flex-col gap-4 w-1/3">
            <h4 class="my-2 text-xl font-bold">Interests</h4>
            <div class="flex gap-4 items-center">
            <v-autocomplete
                :items="interests"
                label="Interest Selection"
                item-title="name"
                item-value="id"
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                v-model="form.selectedInterests"
                multiple
            ></v-autocomplete>
            </div>
            <div class="bg-slate-100 p-2 rounded-lg h-full">
            <v-data-table
                :headers="headers"
                :items="addedInterests"
                hide-default-footer
            >
                <template v-slot:item.action="{ item }">
                <v-btn outlined color="error" elevation="0" variant="outlined" size="small" @click="deleteItem(item.id)">
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
                </template>
            </v-data-table>
            </div>
        </div>
        </div>
        <div class="flex justify-end mt-8 bg-slate-100 p-4 rounded-lg">
        <v-btn color="primary" elevation="0" type="submit"><v-icon>mdi-check-bold</v-icon>Save All</v-btn>
        </div>
    </form>
</template>
  
<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps({
clientData: {
    type: Object,
    default: null
}
})

const router = useRouter()

const form = reactive({
    id: null,
    first_name: '',
    last_name: '',
    contact_no: '',
    email: '',
    password: '',
    selectedInterests: [],
    })

    const interests = ref([])

    onMounted(() => {
    fetchInterests()
    console.log('Mounted with clientData:', props.clientData) // Debug log

    if (props.clientData) {
        populateForm(props.clientData)
    }
    })

    watch(() => props.clientData, (newData) => {
        if (newData) {
            console.log('clientData changed:', newData) // Debug log
            populateForm(newData)
        }
    })

    const populateForm = (data) => {
        console.log('Populating form with data:', data) // Debug log
        form.id = data.id
        form.first_name = data.first_name
        form.last_name = data.last_name
        form.contact_no = data.contact_no
        form.email = data.email
        form.password = data.password
        form.selectedInterests = data.interests ? data.interests.map(interest => interest.id) : []
    }

    const fetchInterests = async () => {
        try {
            const token = localStorage.getItem('auth_token')
            const response = await axios.get('http://127.0.0.1:8000/api/interests', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            interests.value = response.data
        } catch (error) {
            console.error('Failed to fetch interests:', error)
        }
    }

    const addedInterests = computed(() => {
        return form.selectedInterests.map(id => {
            return interests.value.find(interest => interest.id == id)
        })
    })

    const headers = reactive([
        { key: 'name', title: 'Name' },
        { key: 'action', title: 'Actions', align: 'end' },
    ])

    const deleteItem = (id) => {
        form.selectedInterests = form.selectedInterests.filter(item => item !== id)
    }

    const submitForm = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        const payload = {
            ...form,
            interests: form.selectedInterests
        }
        if (form.id) {
            await axios.put(`http://127.0.0.1:8000/api/clients/${form.id}`, payload, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            alert('Client updated successfully')
        } else {
            await axios.post('http://127.0.0.1:8000/api/clients', payload, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            alert('Client registered successfully')
        }
        router.push('/clients')
    } catch (error) {
        console.error('Failed to save client:', error)
    }
}
</script>
