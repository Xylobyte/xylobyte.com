<script lang="ts" setup>
	import { onMounted, provide, ref, watch } from 'vue';
	import { langKey, menuOpenKey } from '@/keys.ts';
	import HeaderComponent from '@/components/HeaderComponent.vue';
	import ScrollToTopComponent from '@/components/ScrollToTopComponent.vue';
	import FooterComponent from '@/components/FooterComponent.vue';

	const menuOpen = ref(false);
	const lang = ref('fr');
	provide(menuOpenKey, menuOpen);
	provide(langKey, lang);

	const clearVariables = () => {
		const app = document.getElementById('app');
		app?.style.removeProperty('--scroll-background');
		app?.style.removeProperty('--scroll-background-2');
		app?.style.removeProperty('--scroll-text');
	};

	onMounted(() => {
		setTimeout(() => {
			console.clear();
			console.log('Bienvenue sur la console dev de');
			console.log(
				'██╗  ██╗██╗   ██╗██╗      ██████╗ ██████╗ ██╗   ██╗████████╗███████╗\n' +
					'╚██╗██╔╝╚██╗ ██╔╝██║     ██╔═══██╗██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝\n' +
					' ╚███╔╝  ╚████╔╝ ██║     ██║   ██║██████╔╝ ╚████╔╝    ██║   █████╗  \n' +
					' ██╔██╗   ╚██╔╝  ██║     ██║   ██║██╔══██╗  ╚██╔╝     ██║   ██╔══╝  \n' +
					'██╔╝ ██╗   ██║   ███████╗╚██████╔╝██████╔╝   ██║      ██║   ███████╗\n' +
					'╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═════╝    ╚═╝      ╚═╝   ╚══════╝',
			);
			console.log('Agrandir la console pour voir le logo ! ;)');
		}, 500);

		const currLang = localStorage.getItem('xylobyte-lang') || navigator.language;
		if (currLang.includes('fr')) {
			lang.value = 'fr';
		} else {
			lang.value = 'en';
		}
	});

	watch(lang, () => {
		localStorage.setItem('xylobyte-lang', lang.value);
	});
</script>

<template>
	<HeaderComponent />

	<RouterView v-slot="{ Component }">
		<Transition mode="out-in" @after-leave="clearVariables">
			<Component :is="Component" />
		</Transition>
	</RouterView>

	<ScrollToTopComponent />

	<FooterComponent />
</template>

<style lang="scss">
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.25s linear;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
