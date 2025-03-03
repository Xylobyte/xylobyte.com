<script lang="ts" setup>
	import type { Project } from '@/api/skills.types.ts';
	import SkillItemComponent from '@/components/SkillItemComponent.vue';
	import { computed, onMounted, watchPostEffect } from 'vue';
	import { animate, hover } from 'motion';

	const props = defineProps<{
		project: Project;
		isOpen: boolean;
	}>();

	const skills = computed(() => (props.isOpen ? props.project.skills : props.project.skills.slice(0, 3)));

	onMounted(() => {
		hover(`#card-${props.project.id}`, element => {
			animate(
				element,
				{
					scale: 1.03,
					boxShadow: 'var(--medium-shadow)',
				},
				{ duration: 0.3 },
			);
			return () =>
				animate(
					element,
					{
						scale: 1,
						boxShadow: 'var(--small-shadow)',
					},
					{ duration: 0.3 },
				);
		});
	});

	watchPostEffect(() => {
		if (props.isOpen) {
			console.log(document.getElementById(`card-${props.project.id}`));
		}
	});
</script>

<template>
	<RouterLink
		:id="`card-${props.project.id}`"
		ref="card-item"
		:to="`/projects/${props.project.id}`"
		class="base flex column gap15"
	>
		<div class="flex row gap10 a-center">
			<img v-if="props.project.logo" :src="props.project.logo" alt="Project logo" class="logo" />
			<h3 class="chakra-petch f-large">{{ props.project.name }}</h3>
		</div>

		<section class="infos">
			<p class="jura f-medium">{{ props.project.shortDescription }}</p>
		</section>

		<section class="skills flex row gap5 wrap">
			<SkillItemComponent v-for="skill in skills" :key="skill.name" :text="skill.name" type="hard" />
		</section>

		<img :alt="`Image of ${props.project.name} project`" :src="props.project.image" class="main-image" />
	</RouterLink>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	.base {
		overflow: hidden;
		border-radius: var(--main-border-radius);
		width: 100%;
		height: 100%;
		min-height: 200px;
		background: var(--light-background-color);
		padding: 15px 20% 15px 15px;
		position: relative;
		box-shadow: var(--small-shadow);

		> *:not(:last-child) {
			z-index: 1;
		}
	}

	.main-image {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 30%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		z-index: 0;
		opacity: 0.7;
		mask: linear-gradient(to right, transparent, black);
	}

	.logo {
		width: 45px;
		height: 45px;
		border-radius: 50%;
	}

	section {
		background: transparent;
	}

	.infos {
		height: 100%;
	}
</style>
