<template>
  <v-container>
    <div class="my-4 flex items-center justify-between">
      <h1 class="text-3xl font-bold">Clients</h1>
      <v-btn color="primary" elevation="0" :to="'/clients/new'">
        <v-icon>mdi-plus</v-icon>
        Add Client
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="clients"
      :search="search"
    >
      <template v-slot:item.first_name="{ item }">
        <div class="flex items-center gap-4">
          <v-avatar color="primary">
            <span class="text-sm font-bold">{{ item.avatar }}</span>
          </v-avatar>
          <div>
            <p class="font-bold">{{ item.first_name }} {{ item.last_name }}</p>
            <p class="text-xs">{{ item.email }}</p>
          </div>
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <div class="flex justify-end gap-2 items-center">
          <v-btn outlined color="warning" elevation="0" variant="outlined" size="small" @click="editClient(item)">
            <v-icon>mdi-pencil-outline</v-icon>
            Edit
          </v-btn>
          <v-dialog
            v-model="dialog"
            max-width="400"
            persistent
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" outlined color="error" elevation="0" variant="outlined" size="small" @click="confirmDelete(item.id)">
                <v-icon>mdi-delete-outline</v-icon>
                Delete
              </v-btn>
            </template>

            <v-card
              prepend-icon="mdi-alert-box-outline"
              text="Are you sure you want to delete this client?"
              title="Delete This Client?"
            >
              <template v-slot:actions>
                <div class="bg-slate-100 w-full rounded-lg flex justify-end gap-1 p-2">
                  <v-btn @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn @click="deleteClient" color="primary">
                    Yes
                  </v-btn>
                </div>
              </template>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const headers = reactive([
    { key: 'first_name', title: 'Name' },
    { key: 'contact_no', title: 'Contact Number' },
    { key: 'action', title: 'Actions', align: 'end' },
])

const clients = ref([])
const search = ref('')
const dialog = ref(false)
const selectedClientId = ref(null)

const fetchClients = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
        router.push('/login')
        return
        }

        const response = await axios.get('http://127.0.0.1:8000/api/clients', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        clients.value = response.data
    } catch (error) {
        console.error('Error fetching clients:', error)
    }
}

const deleteClient = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
        router.push('/login')
        return
        }

        await axios.delete(`http://127.0.0.1:8000/api/clients/${selectedClientId.value}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        fetchClients()
        dialog.value = false
    } catch (error) {
        console.error('Error deleting client:', error)
    }
}

const confirmDelete = (id) => {
    selectedClientId.value = id
    dialog.value = true
}

const editClient = (client) => {
    router.push({ name: 'clients-id', params: { id: client.id }, state: { client } })
}

onMounted(() => {
    fetchClients()
})
</script>
