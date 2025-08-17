<script lang="ts" setup>
	import { onMounted, onServerPrefetch, provide, ref, watchEffect } from 'vue';
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
	const isSSR = import.meta.env.SSR;

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

	const fetchTexts = async () => {
		try {
			const data = await XylobyteAPI.getTexts(import.meta.env.SSR ? 'en' : lang.value);
			texts.value = {};
			for (const item of data) {
				texts.value[item.label] = item[lang.value as never];
			}
			textsLoaded.value = true;
		} catch (err) {
			console.error(err);
		}
	};

	watchEffect(() => {
		textsLoaded.value = false;
		localStorage.setItem('xylobyte-lang', lang.value);
		document.documentElement.lang = lang.value;
		fetchTexts();
	});

	onServerPrefetch(async () => {
		await fetchTexts();
	});
</script>

<template>
	<div v-if="texts['header-home']" class="flex column">
		<HeaderComponent />

		<RouterView v-slot="{ Component }">
			<Transition mode="out-in" @after-leave="clearVariables">
				<Component :is="Component" />
			</Transition>
		</RouterView>

		<ScrollToTopComponent />

		<FooterComponent />
	</div>

	<Transition>
		<div v-if="!textsLoaded || isSSR" class="loading flex a-center j-center">
			<span class="chakra-petch">Loading . . .</span>
		</div>
	</Transition>
</template>

<style lang="scss">
	.loading {
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: black;

		span {
			font-size: 3em;
			color: white;
		}
	}

	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.25s linear;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
