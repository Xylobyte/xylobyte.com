<script setup lang="ts">
	import { provide, ref } from 'vue';
	import { menuOpenKey } from '@/keys.ts';
	import HeaderComponent from '@/components/HeaderComponent.vue';
	import ScrollToTopComponent from '@/components/ScrollToTopComponent.vue';
	import FooterComponent from '@/components/FooterComponent.vue';

	const menuOpen = ref(false);
	provide(menuOpenKey, menuOpen);
</script>

<template>
	<HeaderComponent />

	<RouterView v-slot="{ Component }">
		<Transition mode="out-in">
			<Component :is="Component" />
		</Transition>
	</RouterView>

	<ScrollToTopComponent />

	<FooterComponent />
</template>

<style lang="scss">
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.3s linear;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
