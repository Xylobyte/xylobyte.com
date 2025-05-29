<script lang="ts" setup>
	import { inject, onMounted, onUnmounted, ref } from 'vue';
	import { menuOpenKey, textsKey } from '@/keys.ts';
	import NavSectionItemComponent from '@/components/NavSectionItemComponent.vue';
	import { BadgeInfo, FolderTree, ListChecks, Mail, User } from 'lucide-vue-next';

	const currentSection = ref('presentation');
	const drawerOpen = inject(menuOpenKey, ref(false));
	const texts = inject(textsKey, ref({} as Record<string, string>));

	const observer = new IntersectionObserver(
		entries => entries.forEach(entry => entry.isIntersecting && (currentSection.value = entry.target.id)),
		{ rootMargin: '-50% 0%' },
	);

	onMounted(() => {
		const sections = document.querySelectorAll('#presentation, #skills, #projects, #about, #contact');
		sections.forEach(s => observer.observe(s));
	});

	onUnmounted(() => {
		observer.disconnect();
	});
</script>

<template>
	<aside :class="{ open: drawerOpen }" class="transition-all">
		<hr />
		<div class="flex column j-space-between">
			<NavSectionItemComponent
				:icon="User"
				:is-active="currentSection === 'presentation'"
				:name="texts['section1-title']"
				targetId="presentation"
				@click="drawerOpen = false"
			/>
			<NavSectionItemComponent
				:icon="ListChecks"
				:is-active="currentSection === 'skills'"
				:name="texts['section2-title']"
				targetId="skills"
				@click="drawerOpen = false"
			/>
			<NavSectionItemComponent
				:icon="FolderTree"
				:is-active="currentSection === 'projects'"
				:name="texts['section3-title']"
				targetId="projects"
				@click="drawerOpen = false"
			/>
			<NavSectionItemComponent
				:icon="BadgeInfo"
				:is-active="currentSection === 'about'"
				:name="texts['section4-title']"
				targetId="about"
				@click="drawerOpen = false"
			/>
			<NavSectionItemComponent
				:icon="Mail"
				:is-active="currentSection === 'contact'"
				:name="texts['section5-title']"
				targetId="contact"
				@click="drawerOpen = false"
			/>
		</div>
	</aside>
	<div class="container transition-all" @click="drawerOpen = false"></div>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	.container {
		opacity: 0;
		background-color: rgba(0, 0, 0, 0.25);
		position: fixed;
		z-index: 2;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		pointer-events: none;
	}

	aside {
		height: 100dvh;
		min-width: 330px;
		background-color: var(--scroll-background-2);
		position: sticky;
		top: 0;
		z-index: 3;

		hr {
			z-index: -1;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 60px;
			border: none;
			border-left: var(--scroll-text) solid 1px;
		}

		> div {
			height: min(800px, 100%);
			padding: 80px 60px 40px 40px;
		}
	}

	@media (max-width: global_var.$tablet-width) and (min-width: (global_var.$mobile-width + 1px)) {
		aside {
			min-width: unset;

			hr {
				left: 40px;
			}

			> div {
				padding: 80px 20px 40px 20px;
			}
		}
	}

	@media (max-width: global_var.$mobile-width) {
		aside.open + div.container {
			opacity: 1;
			pointer-events: all;
		}

		aside {
			position: fixed;
			min-width: unset;
			transform: translateX(-300px);
			opacity: 0;
			pointer-events: none;
			box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

			&.open {
				opacity: 1;
				pointer-events: all;
				transform: translateX(0);
			}
		}
	}
</style>
