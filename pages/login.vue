<template>
    <v-container>
        <FormsLoginForm />
        <nuxt-link class="text-blue-500 mt-4 block" to="/registration">Not a member? Register here</nuxt-link>
    </v-container>
</template>

<script setup>
definePageMeta({
    layout: 'gate',
    auth: false
})
</script>
