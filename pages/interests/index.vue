<template>
    <v-container>
      <div class="my-4 flex items-center justify-between">
        <h1 class="text-3xl font-bold">Interests</h1>
        <v-btn color="primary" elevation="0" to="/interests/new">
          <v-icon>mdi-plus</v-icon>
          Add Interest
        </v-btn>
      </div>
      <v-data-table
        :headers="headers"
        :items="data"
        :search="thispage.search"
      >
        <template v-slot:item.action="{ item }">
          <div class="flex justify-end gap-2 items-center">
            <v-btn outlined color="warning" elevation="0" variant="outlined" size="small" :to="`/interests/${item.id}`">
              <v-icon>mdi-pencil-outline</v-icon>
              Edit
            </v-btn>
            <v-dialog
              v-model="thispage.dialog"
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
                text="Are you sure you want to delete this interest?"
                title="Delete This Interest?"
              >
                <template v-slot:actions>
                  <div class="bg-slate-100 w-full rounded-lg flex justify-end gap-1 p-2">
                    <v-btn @click="thispage.dialog = false">
                      Cancel
                    </v-btn>
                    <v-btn @click="deleteInterest(thispage.selectedInterestId)" color="primary">
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
import axios from 'axios'

const headers = reactive([
    { key: 'name', title: 'Name' },
    { key: 'action', title: 'Actions', align: 'end' },
])

const data = ref([])

const fetchInterests = async () => {
    try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get('http://127.0.0.1:8000/api/interests', {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
    data.value = response.data
    } catch (error) {
    console.error('Failed to fetch interests:', error)
    }
}

const deleteInterest = async (id) => {
    try {
        const token = localStorage.getItem('auth_token')
        await axios.delete(`http://127.0.0.1:8000/api/interests/${id}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        fetchInterests() // Refresh the list after deletion
        thispage.dialog = false // Close the dialog
    } catch (error) {
        console.error('Failed to delete interest:', error)
    }
}

const confirmDelete = (id) => {
    thispage.selectedInterestId = id
    thispage.dialog = true
}

onMounted(() => {
    fetchInterests()
})

const thispage = reactive({
    search: '',
    dialog: false,
    selectedInterestId: null
})
</script>
