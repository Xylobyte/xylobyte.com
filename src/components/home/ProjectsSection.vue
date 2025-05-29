<script lang="ts" setup>
	import { inject, onMounted, ref } from 'vue';
	import type { Project } from '@/api/skills.types.ts';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
	import SectionTitleComponent from '@/components/SectionTitleComponent.vue';
	import { textsKey } from '@/keys.ts';

	const texts = inject(textsKey, ref({} as Record<string, string>));

	const projects = ref<Project[]>();

	onMounted(async () => {
		try {
			projects.value = (await XylobyteAPI.getProjects()).filter(p => p.featured);
		} catch (e) {
			console.error(e);
		}
	});
</script>

<template>
	<section id="projects" class="adaptative-viewport-height flex column gap15">
		<SectionTitleComponent :delay="250" :title="texts['section3-title']" />

		<p class="jura">{{ texts['section3-p1'] }}</p>
	</section>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	#projects {
		padding-right: 0;

		> p {
			margin: 0 10vw 0 0;
		}
	}
</style>
