<script lang="ts" setup>
	import { onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import HeadTitleSection from '@/components/home/HeadTitleSection.vue';
	import NavigationDrawerComponent from '@/components/home/NavigationDrawerComponent.vue';
	import PresentationSection from '@/components/home/PresentationSection.vue';
	import SkillsSection from '@/components/home/SkillsSection.vue';
	import ProjectsSection from '@/components/home/ProjectsSection.vue';
	import AboutSection from '@/components/home/AboutSection.vue';
	import ContactSection from '@/components/home/ContactSection.vue';
	import CareerSection from '@/components/home/CareerSection.vue';

	const route = useRoute();

	onMounted(() => {
		document.title = 'Nantsa Montillet - Développeur Web';

		setTimeout(() => {
			if (route.hash !== '')
				document.getElementById(route.hash.slice(1))?.scrollIntoView({
					behavior: 'smooth',
				});

			// console.clear();
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
</script>

<template>
	<div>
		<HeadTitleSection />

		<div class="flex row">
			<NavigationDrawerComponent />

			<div class="content flex column">
				<PresentationSection />

				<CareerSection />

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

		&::v-deep(section) {
			padding: 80px 4vw 2.5vw 3vw;
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
