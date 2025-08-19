<script lang="ts" setup>
	import InputComponent from '@/components/InputComponent.vue';
	import TabsComponent from '@/components/TabsComponent.vue';
	import { computed, inject, onMounted, onServerPrefetch, ref } from 'vue';
	import type { Project } from '@/api/skills.types.ts';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
	import ProjectCardComponent from '@/components/ProjectCardComponent.vue';
	import { useRoute, useRouter } from 'vue-router';
	import { textsKey } from '@/keys.ts';
	import { useHead } from '@unhead/vue';

	const texts = inject(textsKey, ref({} as Record<string, string>));

	const tabs = computed(() => [
		{ id: 'feat', label: `⭐︎ ${texts.value['project-page-fav']}` },
		{ id: 'all', label: texts.value['project-page-all'] },
		{ id: 'perso', label: texts.value['project-page-perso'] },
		{ id: 'pro', label: texts.value['project-page-pro'] },
		{ id: 'school', label: texts.value['project-page-training'] },
	]);

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
				? `${p.name} ${p.skills.map(s => s.name).join(' ')} ${texts.value[`project-${p.id}-desc`]}`
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

	onServerPrefetch(async () => {
		projects.value = await XylobyteAPI.getProjects();
	});

	useHead({
		title: 'Nantsa Montillet - My projects and achievements',
	});
</script>

<template>
	<main class="flex column gap30">
		<div class="head flex row gap15 a-center j-space-between">
			<TabsComponent v-model="activeTab" :tabs="tabs" />
			<select v-model="activeTab">
				<option v-for="tab in tabs" :key="tab.id" :value="tab.id">{{ tab.label }}</option>
			</select>

			<InputComponent v-model="search" :placeholder="texts['project-page-search']" class="search" type="search" />
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

		<p v-if="projects?.length" class="jura f-medium">{{ texts['project-page-more'] }}</p>

		<div :class="{ visible: !!activeProject }" class="blur-bg" @click.exact="router.push('/projects')"></div>
	</main>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	main {
		min-height: 100vh;
		margin-top: 50px;
		padding: 20px;
		background: white;
	}

	.head {
		flex-wrap: wrap-reverse;

		select {
			display: none;
		}
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

	p {
		align-self: center;
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

	@media (max-width: global_var.$mobile-width) {
		.head {
			justify-content: center;

			ul {
				display: none;
			}

			select {
				display: block;
				border: 1px solid var(--light-background-color);
				border-radius: var(--main-border-radius);
				padding: 7px;
				font-size: 1em;

				option {
					font-size: 1em;
				}
			}
		}

		.search {
			width: 90%;
			min-width: unset;
		}
	}
</style>
