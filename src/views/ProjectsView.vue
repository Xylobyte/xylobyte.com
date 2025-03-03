<script lang="ts" setup>
	import InputComponent from '@/components/InputComponent.vue';
	import TabsComponent from '@/components/TabsComponent.vue';
	import { computed, onMounted, ref } from 'vue';
	import type { Project } from '@/api/skills.types.ts';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
	import ProjectCardComponent from '@/components/ProjectCardComponent.vue';
	import { useRoute } from 'vue-router';

	const tabs = [
		{ id: 'feat', label: '⭐︎ Favoris' },
		{ id: 'perso', label: 'Personnel' },
		{ id: 'pro', label: 'Professionnel' },
		{ id: 'school', label: 'Formation' },
	];

	const activeTab = ref('feat');
	const search = ref('');
	const projects = ref<Project[]>();

	const route = useRoute();

	const activeProject = computed(() => route.params.project);

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
				v-for="project in projects"
				:key="project.id"
				:is-open="activeProject === project.id"
				:project="project"
			/>
		</div>
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
</style>
