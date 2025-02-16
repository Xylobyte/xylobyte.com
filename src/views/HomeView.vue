<script lang="ts" setup>
	import { onMounted, onUnmounted } from 'vue';
	import { useRoute } from 'vue-router';
	import HeadTitleSection from '@/components/sections/home/HeadTitleSection.vue';
	import NavigationDrawerComponent from '@/components/NavigationDrawerComponent.vue';
	import PresentationSection from '@/components/sections/home/PresentationSection.vue';
	import { initHomeSectionsAnimations } from '@/animate/home-sections.ts';
	import SkillsSection from '@/components/sections/home/SkillsSection.vue';
	import ProjectsSection from '@/components/sections/home/ProjectsSection.vue';

	const route = useRoute();
	let stopTracking: VoidFunction;

	onMounted(() => {
		document.title = 'Nantsa Montillet - Développeur Web';
		stopTracking = initHomeSectionsAnimations();

		setTimeout(() => {
			if (route.hash !== '')
				document.getElementById(route.hash.slice(1))?.scrollIntoView({
					behavior: 'smooth',
				});

			/*console.clear();
			console.log('Bienvenue sur la console dev de');
			console.log(
				'██╗  ██╗██╗   ██╗██╗      ██████╗ ██████╗ ██╗   ██╗████████╗███████╗\n' +
					'╚██╗██╔╝╚██╗ ██╔╝██║     ██╔═══██╗██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝\n' +
					' ╚███╔╝  ╚████╔╝ ██║     ██║   ██║██████╔╝ ╚████╔╝    ██║   █████╗  \n' +
					' ██╔██╗   ╚██╔╝  ██║     ██║   ██║██╔══██╗  ╚██╔╝     ██║   ██╔══╝  \n' +
					'██╔╝ ██╗   ██║   ███████╗╚██████╔╝██████╔╝   ██║      ██║   ███████╗\n' +
					'╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═════╝    ╚═╝      ╚═╝   ╚══════╝',
			);
			console.log('Agrandir la console pour voir le logo ! ;)');*/
		}, 500);
	});

	onUnmounted(() => {
		if (stopTracking) stopTracking();
	});
</script>

<template>
	<div>
		<HeadTitleSection />

		<div class="flex row">
			<NavigationDrawerComponent />

			<div class="content flex column">
				<PresentationSection />

				<SkillsSection />

				<ProjectsSection />
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
