<template>
    <div>
        <Register />
    </div>
</template>

<script setup>
    import Register from './components/Register.vue'
    import { useRegisterStore } from './store/RegisterStore'

    const registerStore = useRegisterStore()
</script>