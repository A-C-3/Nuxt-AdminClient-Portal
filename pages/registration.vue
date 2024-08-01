<template>
    <v-container>
        <FormsRegisterForm />
        <nuxt-link class="text-blue-500 mt-4 block" to="/login">Already a member? Login here</nuxt-link>
    </v-container>
</template>

<script setup>
definePageMeta({
    layout: 'gate',
    auth: false
})
</script>
