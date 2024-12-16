<template>
    <div>
        <pre>{{ store.$state.token }}</pre>
    </div>
</template>

<script setup lang="ts">
// import auth from '~/middleware/auth';
import { useIndexStore } from '~/store/main';

definePageMeta({
    middleware: 'auth'
});

const store = useIndexStore();

</script>

<style lang="scss" scoped>

</style>