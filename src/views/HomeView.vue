<script lang="ts" setup>
	import { onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import HeadTitleSection from '@/components/home/HeadTitleSection.vue';
	import NavigationDrawerComponent from '@/components/home/NavigationDrawer.vue';
	import PresentationSection from '@/components/home/PresentationSection.vue';
	import SkillsSection from '@/components/home/SkillsSection.vue';
	import ProjectsSection from '@/components/home/ProjectsSection.vue';
	import AboutSection from '@/components/home/AboutSection.vue';
	import ContactSection from '@/components/home/ContactSection.vue';
	import { useHead } from '@unhead/vue';

	const route = useRoute();

	onMounted(() => {
		setTimeout(() => {
			if (route.hash !== '')
				document.getElementById(route.hash.slice(1))?.scrollIntoView({
					behavior: 'smooth',
				});
		}, 500);
	});

	useHead({
		title: 'Nantsa Montillet - Développeur Web',
	});
</script>

<template>
	<div>
		<HeadTitleSection />

		<div class="flex row">
			<NavigationDrawerComponent />

			<div class="content flex column a-center">
				<div class="top-grad"></div>

				<PresentationSection />

				<SkillsSection />

				<ProjectsSection />

				<AboutSection />

				<ContactSection />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	.content {
		width: calc(100% - 330px);
		overflow: unset;
		background: var(--scroll-background);

		.top-grad {
			position: sticky;
			top: 50px;
			background: linear-gradient(
				to bottom,
				var(--scroll-background) 5%,
				color-mix(in srgb, var(--scroll-background), transparent 30%) 60%,
				transparent
			);
			z-index: 2;
			height: 6vh;
			width: 100%;
		}

		&::v-deep(section:not(.skills)) {
			padding: 80px 4vw 2.5vw 3vw;
			max-width: 1400px;
			width: 100%;
		}

		> div > section:first-of-type {
			margin-top: -50px;
		}
	}

	@media (max-width: global_var.$tablet-width) {
		.content {
			width: calc(100% - 80px);
		}
	}

	@media (max-width: global_var.$mobile-width) {
		.content {
			width: 100%;
		}
	}
</style>

<style>
	body #app {
		--scroll-background: #ffffff;
		--scroll-text: #000;
		--scroll-background-2: var(--light-background-color);
	}
</style>
