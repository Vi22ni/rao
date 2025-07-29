<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const routes = router.getRoutes()

const sortedRoutes = routes.filter(route => route.name).sort((a, b) => {
    return a.name === router.currentRoute.value.name ? 1 : -1
})
</script>

<template>
    <header>
        <nav>
            <RouterLink v-for="route in sortedRoutes" :key="route.name" :to="route.path"
                :class="{ 'selected-page': route.name === router.currentRoute.value.name }">
                {{ route.name === 'home' ? 'pets' : 'participar' }}
            </RouterLink>
        </nav>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
}

nav {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 15px 30px;
    border-radius: 0px 0px 0px 50px;
    background: var(--color-background);
    box-shadow: 0px -2px 1px 0px rgba(0, 0, 0, 0.30) inset;
}

a{
    text-align: right;
}

.selected-page {
    font-size: 26px;
    font-weight: bold;
}
</style>