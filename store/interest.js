import { defineStore } from 'pinia'

export const useInterestStore = defineStore('interest', {
    state: () => ({
        data: [
            // {
            //     id: 1,
            //     name: 'Some Interest text here 1',
            // },
            // {
            //     id: 2,
            //     name: 'Some Interest text here 2',
            // },
            // {
            //     id: 3,
            //     name: 'Some Interest text here 3',
            // },
            // {
            //     id: 4,
            //     name: 'Some Interest text here 4',
            // },
            // {
            //     id: 5,
            //     name: 'Some Interest text here 5',
            // },
            // {
            //     id: 6,
            //     name: 'Some Interest text here 6',
            // },
            // {
            //     id: 7,
            //     name: 'Some Interest text here 7',
            // },
        ]
    }),
    getters: {
        DATA: (state) => state.data,
    },
    actions: {
        async fetch() {
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl + 'interests'
            
            try {
                const data = await $fetch(apiUrl)
                this.data = data
            } catch (error) {
                return {error: error}
            }
        },
        async get(id) {
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl + 'interests/' + id
            
            try {
                const data = await $fetch(apiUrl)
                return data
            } catch (error) {
                return {error: error}
            }
        },
        async add(data) {
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl + 'interests'

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