<script lang="ts" setup>
	import type { Project } from '@/api/skills.types.ts';
	import SkillItemComponent from '@/components/SkillItemComponent.vue';
	import { onMounted, ref, watch } from 'vue';
	import { closeCard, openCard } from '@/animate/card-toggle.ts';
	import { X as XIcon } from 'lucide-vue-next';
	import { useRouter } from 'vue-router';

	const props = defineProps<{
		project: Project;
		isOpen: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const router = useRouter();

	const state = ref<'closed' | 'progress' | 'opened'>('closed');
	const showDetails = ref(false);

	const onOpenChange = async (_: boolean, old: boolean) => {
		state.value = 'progress';
		if (props.isOpen) {
			await openCard(props.project.id);
			state.value = 'opened';
			showDetails.value = true;
		} else if (old) {
			await closeCard(props.project.id);
			state.value = 'closed';
			showDetails.value = false;
		} else {
			state.value = 'closed';
		}
	};

	onMounted(onOpenChange);
	watch(() => props.isOpen, onOpenChange, { flush: 'post' });
</script>

<template>
	<a
		:id="`card-${props.project.id}`"
		ref="card-item"
		:class="{ details: showDetails }"
		:href="`/projects/${props.project.id}`"
		class="base"
		@click.prevent="!showDetails && router.push(`/projects/${props.project.id}`)"
	>
		<Transition mode="out-in" @after-leave="showDetails = !showDetails">
			<div v-if="state !== 'progress'" class="flex column gap15">
				<div class="flex row j-space-between a-center">
					<div class="flex row gap10 a-center">
						<img v-if="props.project.logo" :src="props.project.logo" alt="Project logo" class="logo" />
						<h3 class="chakra-petch f-large">{{ props.project.name }}</h3>
					</div>

					<XIcon v-if="showDetails" :size="35" class="close" color="#000" @click="emit('close')" />
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
					:src="props.project.images[0]"
					class="main-image"
				/>
			</div>
		</Transition>
	</a>
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

		&.details {
			padding: 30px;
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

	.close {
		cursor: pointer;
		padding: 5px;
		border-radius: 5px;

		&:hover {
			background: rgba(0, 0, 0, 0.15);
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
