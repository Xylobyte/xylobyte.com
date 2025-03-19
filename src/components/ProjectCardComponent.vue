<script lang="ts" setup>
	import type { Project } from '@/api/skills.types.ts';
	import SkillItemComponent from '@/components/SkillItemComponent.vue';
	import { onMounted, ref, watch } from 'vue';
	import { closeCard, openCard } from '@/animate/card-toggle.ts';
	import { Globe, SquareArrowOutUpRightIcon, X as XIcon } from 'lucide-vue-next';
	import { useRouter } from 'vue-router';
	import { GitHubIcon } from 'vue3-simple-icons';

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
	<div
		:id="`card-${props.project.id}`"
		ref="card-item"
		:class="{ details: showDetails }"
		class="base"
		@click="!showDetails && router.push(`/projects/${props.project.id}`)"
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

				<section class="infos flex gap30 a-center">
					<div v-if="showDetails" class="imgs flex column gap15">
						<img v-for="img in props.project.images" :key="img" :src="img" alt="" />
					</div>

					<div class="flex column gap20">
						<div class="flex column">
							<h4 v-if="showDetails" class="chakra-petch">Description :</h4>
							<p class="jura f-medium">
								{{ showDetails ? props.project.description : props.project.shortDescription }}
							</p>
						</div>

						<div>
							<h4 v-if="showDetails" class="chakra-petch">Dates :</h4>
							<span v-if="showDetails" class="jura">{{ props.project.date }}</span>
						</div>

						<div v-if="showDetails" class="flex column">
							<h4 class="chakra-petch">Liens :</h4>
							<div class="flex row gap15">
								<a
									v-if="props.project.link"
									:href="props.project.link"
									class="flex chakra-petch row a-center"
									target="_blank"
								>
									<Globe :size="18" />
									Site web
									<SquareArrowOutUpRightIcon :size="18" />
								</a>
								<a
									v-if="props.project.linkOfCode"
									:href="props.project.linkOfCode"
									class="flex code chakra-petch row a-center"
									target="_blank"
								>
									<GitHubIcon :size="18" />
									Code
									<SquareArrowOutUpRightIcon :size="18" />
								</a>
							</div>
						</div>

						<div v-if="showDetails" class="flex column">
							<h4 class="chakra-petch">Compétences :</h4>
							<section class="skills flex row gap5 wrap">
								<SkillItemComponent
									v-for="skill in showDetails
										? props.project.skills
										: props.project.skills.slice(0, 3)"
									:key="skill.name"
									:text="skill.name"
									type="hard"
								/>
							</section>
						</div>
					</div>
				</section>

				<section v-if="!showDetails" class="skills flex row gap5 wrap">
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
	</div>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	h4 {
		font-weight: normal;
		margin-bottom: 6px;
		font-size: 1.15em;
	}

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
		cursor: pointer;

		&:hover {
			transform: perspective(1000px) rotateY(6deg) rotateX(-8deg) scale(1.05);
		}

		&.details {
			padding: 30px;
			cursor: auto;

			.skills {
				position: relative;
			}
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
		transition: background 0.2s ease;

		&:hover {
			background: rgba(0, 0, 0, 0.1);
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

	.imgs {
		width: 80%;
		overflow-y: auto;
		padding: 20px 5px;
		mask: linear-gradient(to bottom, transparent, black 4%, black 96%, transparent);

		img {
			width: 100%;
			border-radius: var(--main-border-radius);
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.infos {
		height: 100%;
		min-height: 0;

		a {
			border-radius: var(--main-border-radius);
			border: 1px solid var(--light-primary-color);
			color: var(--light-primary-color);
			padding: 4px 20px;

			&.code {
				color: var(--light-background-color);
				background-color: var(--dark-background-color);
				border-color: var(--dark-background-color);
			}

			> :first-child {
				margin-right: 8px;
			}

			> :last-child {
				width: fit-content;
				max-width: 0;
				transition-property: max-width, margin-left, transform, opacity;
				transition: 0.2s ease;
			}

			&:hover > :last-child {
				margin-left: 10px;
				max-width: 20px;
			}

			&:active > :last-child {
				transform: translate(15px, -12px) scale(1.5);
				opacity: 0;
			}
		}

		> :last-child {
			width: 100%;
		}
	}
</style>
