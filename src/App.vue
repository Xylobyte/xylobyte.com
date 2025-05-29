<script lang="ts" setup>
	import { onMounted, provide, ref, watchEffect } from 'vue';
	import { langKey, menuOpenKey, textsKey } from '@/keys.ts';
	import HeaderComponent from '@/components/HeaderComponent.vue';
	import ScrollToTopComponent from '@/components/ScrollToTopComponent.vue';
	import FooterComponent from '@/components/FooterComponent.vue';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';

	const menuOpen = ref(false);
	const lang = ref((localStorage.getItem('xylobyte-lang') || navigator.language).includes('fr') ? 'fr' : 'en');
	const texts = ref<Record<string, string>>({});
	provide(menuOpenKey, menuOpen);
	provide(langKey, lang);
	provide(textsKey, texts);

	const textsLoaded = ref(false);

	const clearVariables = () => {
		const app = document.getElementById('app');
		app?.style.removeProperty('--scroll-background');
		app?.style.removeProperty('--scroll-background-2');
		app?.style.removeProperty('--scroll-text');
	};

	onMounted(() => {
		setTimeout(() => {
			//console.clear();
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
	});

	watchEffect(async () => {
		localStorage.setItem('xylobyte-lang', lang.value);
		try {
			const data = await XylobyteAPI.getTexts(lang.value);
			texts.value = {};
			for (const item of data) {
				texts.value[item.label] = item[lang.value as never];
			}
			textsLoaded.value = true;
		} catch (err) {
			console.error(err);
		}
	});
</script>

<template>
	<div v-if="textsLoaded" class="flex column">
		<HeaderComponent />

		<RouterView v-slot="{ Component }">
			<Transition mode="out-in" @after-leave="clearVariables">
				<Component :is="Component" />
			</Transition>
		</RouterView>

		<ScrollToTopComponent />

		<FooterComponent />
	</div>
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
