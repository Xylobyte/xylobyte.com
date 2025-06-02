<script lang="ts" setup>
	import { inject, ref, watch, watchEffect } from 'vue';
	import { useRoute } from 'vue-router';
	import { useScroll } from '@vueuse/core';
	import { LanguagesIcon, Menu } from 'lucide-vue-next';
	import { langKey, menuOpenKey, textsKey } from '@/keys.ts';
	import { Motion } from 'motion-v';

	const scroll = ref(false);
	const isHome = ref(true);
	const hideContent = ref(false);

	const menuOpen = inject(menuOpenKey);
	const lang = inject(langKey);
	const texts = inject(textsKey, ref({} as Record<string, string>));

	const route = useRoute();
	const { y } = useScroll(window, { behavior: 'smooth' });

	const checkScroll = () => isHome.value && (scroll.value = y.value > 500);

	watchEffect(() => {
		if (route.name === 'home') {
			isHome.value = true;
			checkScroll();
		} else {
			scroll.value = true;
			isHome.value = false;
		}
	});

	watch(y, checkScroll);

	watch(texts, () => {
		hideContent.value = false;
	});

	const changeLanguage = (newLang: string) => {
		if (newLang === lang?.value) return;

		hideContent.value = true;
		setTimeout(() => {
			if (!lang) return;
			lang.value = newLang;
		}, 500);
	};
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

		<nav class="flex row gap20 a-center p-absolute transition-all">
			<ul class="flex row gap20">
				<li class="flex a-center">
					<RouterLink :to="{ name: 'home' }" class="f-medium chakra-petch">
						{{ texts['header-home'] }}
					</RouterLink>
				</li>
				<li class="flex a-center">
					<RouterLink :to="{ name: 'projects' }" class="f-medium chakra-petch">
						{{ texts['header-projects'] }}
					</RouterLink>
				</li>
			</ul>

			<ul class="languages flex row gap10 a-center">
				<li :class="{ selected: lang === 'fr' }" class="chakra-petch" @click="changeLanguage('fr')">fr</li>
				<li :class="{ selected: lang !== 'fr' }" class="chakra-petch" @click="changeLanguage('en')">en</li>
			</ul>
			<button
				class="language-btn flex a-center gap5 only-mobile"
				@click="changeLanguage(lang === 'fr' ? 'en' : 'fr')"
			>
				<LanguagesIcon :size="15" />
				{{ lang }}
			</button>

			<Motion
				:animate="{ x: '50%', y: '50%', scale: hideContent ? 1.5 : 0 }"
				:initial="false"
				:transition="{ duration: 1 }"
				class="wiper-lang-switch"
			/>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

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
			z-index: 1;
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

			@media (max-width: global_var.$mobile-width) {
				display: none;
			}
		}

		.language-btn {
			z-index: 1;
			background: transparent;
			color: white;
			padding: 3px 6px;
			border-radius: var(--small-border-radius);
			border: 1px solid gray;
		}

		.wiper-lang-switch {
			--size: max(200vh, 200vw);
			position: absolute;
			right: 20px;
			bottom: 50%;
			width: var(--size);
			height: var(--size);
			background: black;
			border-radius: 100%;
			filter: blur(50px);
		}
	}

	.head-title {
		padding-left: 15px;

		svg {
			color: white;
			transform: translateX(-50px);
			cursor: pointer;
			border-radius: 50%;
		}

		h1 {
			transform: translateY(40px);
			opacity: 0;
		}
	}

	@media (max-width: global_var.$mobile-width) {
		nav {
			gap: 10px;
			right: 10px;

			ul:first-child {
				gap: 10px;
			}
		}
	}
</style>
