<script lang="ts" setup>
	import type { Project } from '@/api/skills.types.ts';
	import SkillItemComponent from '@/components/SkillItemComponent.vue';
	import { onMounted, ref, watch } from 'vue';
	import { closeCard, openCard } from '@/animate/card-toggle.ts';

	const props = defineProps<{
		project: Project;
		isOpen: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const state = ref<'closed' | 'progress' | 'opened'>('closed');
	const showDetails = ref(false);

	const onOpenChange = async (_: boolean, old: boolean) => {
		state.value = 'progress';
		if (props.isOpen) {
			await openCard(props.project.id);
			state.value = 'opened';
		} else if (old) {
			await closeCard(props.project.id);
			state.value = 'closed';
		} else {
			state.value = 'closed';
		}
	};

	onMounted(onOpenChange);
	watch(() => props.isOpen, onOpenChange, { flush: 'post' });
</script>

<template>
	<RouterLink :id="`card-${props.project.id}`" ref="card-item" :to="`/projects/${props.project.id}`" class="base">
		<Transition mode="out-in" @after-leave="showDetails = !showDetails">
			<div v-if="state !== 'progress'" :class="{ details: showDetails }" class="flex column gap15">
				<div class="flex row gap10 a-center">
					<img v-if="props.project.logo" :src="props.project.logo" alt="Project logo" class="logo" />
					<h3 class="chakra-petch f-large">{{ props.project.name }}</h3>
				</div>

				<section class="infos">
					<p class="jura f-medium">
						{{ showDetails ? props.project.description : props.project.shortDescription }}
					</p>
				</section>

				<section class="skills flex row gap5 wrap">
					<SkillItemComponent
						v-for="skill in showDetails ? props.project.skills : props.project.skills.slice(0, 3)"
						:key="skill.name"
						:text="skill.name"
						type="hard"
					/>
				</section>

				<img
					v-if="!showDetails"
					:alt="`Image of ${props.project.name} project`"
					:src="props.project.image"
					class="main-image"
				/>
			</div>
		</Transition>
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
		padding: 15px 100px 15px 15px;
		position: relative;
		box-shadow: var(--small-shadow);
		transition: transform 0.3s ease;

		&:hover {
			transform: perspective(1000px) rotateY(6deg) rotateX(-8deg) scale(1.05);
		}

		> div {
			height: 100%;
			width: 100%;

			> *:not(:last-child) {
				z-index: 1;
				width: 100%;
			}
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
