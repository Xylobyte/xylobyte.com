<script lang="ts" setup>
	import { inject, ref, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { useScroll } from '@vueuse/core';
	import { Menu } from 'lucide-vue-next';
	import { langKey, menuOpenKey } from '@/keys.ts';

	const scroll = ref(false);
	const isHome = ref(true);

	const menuOpen = inject(menuOpenKey);
	const lang = inject(langKey);

	const route = useRoute();
	const { y } = useScroll(window, { behavior: 'smooth' });

	const checkScroll = () => isHome.value && (scroll.value = y.value > 500);

	watch(route, () => {
		if (route.name === 'home') {
			isHome.value = true;
			checkScroll();
		} else {
			scroll.value = true;
			isHome.value = false;
		}
	});

	watch(y, checkScroll);
</script>

<template>
	<header :class="{ scroll: scroll || menuOpen }" class="flex transition-all">
		<div class="head-title flex a-center overflow-hidden">
			<Menu
				v-if="isHome"
				:size="25"
				class="only-mobile transition-transform"
				color="white"
				@click="menuOpen = !menuOpen"
			/>
			<h1 class="big-title only-desktop transition-all">Nantsa Montillet</h1>
		</div>

		<nav class="flex row gap20 p-absolute transition-all">
			<ul class="flex row gap20">
				<li class="flex a-center">
					<RouterLink :to="{ name: 'home' }" class="f-medium chakra-petch"> Accueil </RouterLink>
				</li>
				<li class="flex a-center">
					<RouterLink :to="{ name: 'projects' }" class="f-medium chakra-petch"> Projets </RouterLink>
				</li>
			</ul>

			<ul class="languages flex row gap10 a-center">
				<li :class="{ selected: lang === 'fr' }" class="chakra-petch" @click="lang = 'fr'">fr</li>
				<li :class="{ selected: lang !== 'fr' }" class="chakra-petch" @click="lang = 'en'">en</li>
			</ul>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
	.test {
		height: 200vh;
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: transparent;
		height: 50px;
		z-index: 10;

		&.scroll {
			background-color: var(--dark-background-color);

			.head-title {
				svg,
				h1 {
					transform: translate(0, 0);
				}

				h1 {
					opacity: 1;
				}
			}

			nav {
				transform: translateX(0);
			}
		}
	}

	nav {
		height: 100%;
		top: 0;
		bottom: 0;
		right: 20px;
		transform: translateX(calc(-50vw + 50% + 20px));

		a {
			color: var(--light-background-color);
			border: 1px solid var(--light-background-color);
			border-radius: var(--main-border-radius);
			padding: 4px 30px;
			transition: 0.2s;

			&:hover {
				transform: translateY(-2px);
			}

			&.router-link-active {
				color: white;
				border-color: var(--dark-primary-color);
				background-color: var(--dark-primary-color);
			}
		}

		.languages {
			color: rgba(255, 255, 255, 0.4);

			li {
				color: white;
				opacity: 0.4;
				cursor: pointer;
				transition-property: opacity, color;
				transition: 0.3s ease;

				&.selected {
					opacity: 1;
					color: var(--light-primary-color);
					text-decoration: underline;
				}
			}
		}
	}

	.head-title {
		padding-left: 20px;

		svg {
			color: white;
			transform: translateX(-50px);
			cursor: pointer;
			border-radius: 50%;

			&:hover {
				background-color: rgba(128, 128, 128, 0.5);
			}
		}

		h1 {
			transform: translateY(40px);
			opacity: 0;
		}
	}
</style>
