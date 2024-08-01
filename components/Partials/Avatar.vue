<template>
    <div>
        <v-avatar color="primary">
            <span class="text-sm font-bold">{{ initials }}</span>
        </v-avatar>
    </div>
</template>

<script setup>
const props = defineProps({
    first_name: '',
    last_name: ''
})

const initials = computed(() => {
    return props.first_name[0] + props.last_name[0]
})
</script>