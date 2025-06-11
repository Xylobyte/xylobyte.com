<script lang="ts" setup>
	import { inject, onMounted, ref } from 'vue';
	import type { Project } from '@/api/skills.types.ts';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
	import SectionTitleComponent from '@/components/SectionTitleComponent.vue';
	import { textsKey } from '@/keys.ts';
	import { Motion } from 'motion-v';
	import { appearFromBottom, inViewCustomOptions } from '@/animations/home-scroll.ts';
	import ProjectCardComponent from '@/components/ProjectCardComponent.vue';
	import ButtonComponent from '@/components/ButtonComponent.vue';

	const texts = inject(textsKey, ref({} as Record<string, string>));

	const projects = ref<Project[]>();

	onMounted(async () => {
		try {
			projects.value = (await XylobyteAPI.getProjects()).slice(0, 4);
		} catch (e) {
			console.error(e);
		}
	});
</script>

<template>
	<section id="projects" class="adaptative-viewport-height flex column gap15">
		<SectionTitleComponent :delay="250" :title="texts['section3-title']" />

		<Motion
			as="p"
			:custom="0.2"
			:inViewOptions="inViewCustomOptions"
			:variants="appearFromBottom"
			class="jura"
			initial="off"
			whileInView="on"
		>
			{{ texts['section3-p1'] }}
		</Motion>

		<Motion
			:inViewOptions="inViewCustomOptions"
			:transition="{ when: 'afterChildren', delayChildren: 0.35, staggerChildren: 0.25 }"
			class="grid-projects gap30"
			initial="off"
			whileInView="on"
		>
			<Motion v-for="project in projects" :key="project.id" :variants="appearFromBottom" as-child>
				<ProjectCardComponent :is-open="false" :project="project" />
			</Motion>
		</Motion>

		<Motion :custom="0.4" :variants="appearFromBottom" as-child initial="off" whileInView="on">
			<RouterLink class="to-projects" to="/projects">
				<ButtonComponent
					:text="texts['section3-all']"
					background-color="102, 88, 185"
					class="flex a-center j-center"
					color="255, 255, 255"
				/>
			</RouterLink>
		</Motion>
	</section>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	#projects {
		> p {
			margin: 0 10vw 0 0;
		}

		.grid-projects {
			margin-top: 20px;
			margin-bottom: 20px;
			display: grid;
			grid-template-columns: repeat(1, 1fr);

			@media (min-width: 1200px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media (min-width: 800px) and (max-width: 1000px) {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		.to-projects {
			align-self: center;
		}
	}
</style>
