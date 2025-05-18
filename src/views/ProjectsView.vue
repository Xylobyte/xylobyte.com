<script lang="ts" setup>
	import InputComponent from '@/components/InputComponent.vue';
	import TabsComponent from '@/components/TabsComponent.vue';
	import { computed, onMounted, ref } from 'vue';
	import type { Project } from '@/api/skills.types.ts';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
	import ProjectCardComponent from '@/components/ProjectCardComponent.vue';
	import { useRoute, useRouter } from 'vue-router';

	const tabs = [
		{ id: 'feat', label: '⭐︎ Favoris' },
		{ id: 'all', label: 'Tout' },
		{ id: 'perso', label: 'Personnel' },
		{ id: 'pro', label: 'Professionnel' },
		{ id: 'school', label: 'Formation' },
	];

	const activeTab = ref('all');
	const search = ref<string>('');
	const projects = ref<Project[]>();

	const route = useRoute();
	const router = useRouter();

	const activeProject = computed(() => route.params.project);
	const visibleProjects = computed(() =>
		(activeTab.value === 'all'
			? projects.value
			: projects.value?.filter(p => (activeTab.value === 'feat' && p.featured) || activeTab.value === p.type)
		)?.filter(p =>
			search.value
				? `${p.name} ${p.skills.map(s => s.name).join(' ')} ${p.description}`
						.toLowerCase()
						.includes(search.value.toLowerCase())
				: true,
		),
	);

	onMounted(async () => {
		try {
			projects.value = await XylobyteAPI.getProjects();
		} catch (e) {
			console.error(e);
		}
	});
</script>

<template>
	<main class="flex column gap30">
		<div class="head flex row gap15 a-center j-space-between">
			<TabsComponent v-model="activeTab" :tabs="tabs" />

			<InputComponent v-model="search" class="search" placeholder="Chercher un projet..." type="search" />
		</div>

		<div class="grid-projects gap30">
			<ProjectCardComponent
				v-for="project in visibleProjects"
				:key="project.id"
				:is-open="activeProject === project.id"
				:project="project"
				@close="router.push('/projects')"
			/>
		</div>

		<div :class="{ visible: !!activeProject }" class="blur-bg" @click.exact="router.push('/projects')"></div>
	</main>
</template>

<style lang="scss" scoped>
	main {
		min-height: 100vh;
		margin-top: 50px;
		padding: 20px;
		background: white;
	}

	.head {
		flex-wrap: wrap-reverse;
	}

	.search {
		width: 30%;
		min-width: 300px;

		::v-deep(input) {
			padding: 10px;
		}
	}

	.grid-projects {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		margin: 0 5px;

		@media (min-width: 800px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 1300px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (min-width: 1700px) {
			grid-template-columns: repeat(4, 1fr);
		}

		@media (min-width: 2500px) {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	.blur-bg {
		backdrop-filter: blur(4px);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 8;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s ease-in-out;

		&.visible {
			pointer-events: auto;
			opacity: 1;
		}
	}
</style>
