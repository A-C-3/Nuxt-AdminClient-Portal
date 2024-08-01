<template>
    <span>{{ formatted_date }}</span>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    value: {
        type: String,
        default: null
    }
})

const formatted_date = computed(() => {
    if (props.value) {
        // Parse the ISO date string
        const date = new Date(props.value);

        // Extract day, month, and year
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getUTCFullYear();

        // Format as DD/MM/YYYY
        return `${day}/${month}/${year}`;
    }

    return '---'
})
</script>