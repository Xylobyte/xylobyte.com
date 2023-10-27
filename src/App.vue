<template>
    <HeaderComponent/>

    <RouterView v-slot="{ Component }">
        <Transition mode="out-in">
            <Component :is="Component"/>
        </Transition>
    </RouterView>

    <ScrollToTopComponent/>

    <FooterComponent/>
</template>

<script setup>
import HeaderComponent from '@/components/sections/HeaderComponent.vue'
import FooterComponent from '@/components/sections/FooterComponent.vue'
import ScrollToTopComponent from "@/components/ScrollToTopComponent.vue";
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s linear;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>