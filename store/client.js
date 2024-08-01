import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', {
    state: () => ({
        data: [
            // {
            //     id: 1,
            //     first_name: 'John',
            //     last_name: 'Doe',
            //     email: 'johndoe@example.com',
            //     birthday: '1994-10-05',
            //     contact_no: '09123455677',
            // },
            // {
            //     id: 2,
            //     first_name: 'Jane',
            //     last_name: 'Doe',
            //     email: 'janedoe@example.com',
            //     birthday: '1994-11-15',
            //     contact_no: '09123455677'
            // },
            // {
            //     id: 3,
            //     first_name: 'Bob',
            //     last_name: 'Grimes',
            //     email: 'bobgrimes@example.com',
            //     birthday: '1994-04-28',
            //     contact_no: '09123455677'
            // },
            // {
            //     id: 4,
            //     first_name: 'Dylan',
            //     last_name: 'Hitler',
            //     email: 'dylanhitler@example.com',
            //     birthday: '1998-09-05',
            //     contact_no: '09123455677'
            // },
            // {
            //     id: 5,
            //     first_name: 'George',
            //     last_name: 'Washington',
            //     email: 'georgewashington@example.com',
            //     birthday: '1994-12-12',
            //     contact_no: '09123455677'
            // },
        ],
    }),
    getters: {
        DATA: (state) => state.data,
    },
    actions: {
        async fetch() {
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl + 'clients'
            
            try {
                const data = await $fetch(apiUrl)
                this.data = data
            } catch (error) {
                return {error: error}
            }
        },
        async get(id) {
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl + 'clients/' + id
            
            try {
                const data = await $fetch(apiUrl)
                return data
            } catch (error) {
                return {error: error}
            }
        },
        async add(data) {
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl + 'clients'

            try {
                const data = await $fetch(apiUrl, {
                    method: 'POST',
                    body: data
                })
                this.data.push(data)
            } catch (error) {
                return {error: error}
            }
        },
    }
})