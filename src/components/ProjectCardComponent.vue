<script lang="ts" setup>
	import type { Project } from '@/api/skills.types.ts';
	import SkillItemComponent from '@/components/SkillItemComponent.vue';
	import { Globe, SquareArrowOutUpRightIcon, X as XIcon } from 'lucide-vue-next';
	import { useRouter } from 'vue-router';
	import { GitHubIcon } from 'vue3-simple-icons';
	import { AnimatePresence, Motion } from 'motion-v';
	import { ref, watchEffect } from 'vue';

	const props = defineProps<{
		project: Project;
		isOpen: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const isOnTop = ref(false);

	const router = useRouter();

	watchEffect(() => {
		if (props.isOpen) {
			isOnTop.value = true;
		}
	});
</script>

<template>
	<Motion
		:id="`card-${props.project.id}`"
		ref="card-item"
		:class="{ open: props.isOpen }"
		:layout-id="`card-${props.project.id}`"
		:style="{ zIndex: isOnTop ? 2 : 1 }"
		class="base flex column gap10"
		@click="!props.isOpen && router.push(`/projects/${props.project.id}`)"
	>
		<Motion :layout-id="`card-head-${props.project.id}`" class="head flex row gap10 a-center">
			<img v-if="props.project.logo" :src="props.project.logo" alt="Project logo" class="logo" />
			<h3 class="chakra-petch f-large">{{ props.project.name }}</h3>
		</Motion>

		<Motion as="p" :layout-id="`card-desc-${props.project.id}`" class="jura f-medium">
			{{ props.project.shortDescription }}
		</Motion>

		<section v-if="!props.isOpen" class="skills flex row gap5 wrap">
			<SkillItemComponent
				v-for="skill in props.project.skills.slice(0, 3)"
				:key="skill.name"
				:text="skill.name"
				type="hard"
			/>
		</section>

		<img :alt="`Image of ${props.project.name} project`" :src="props.project.images[0]" class="main-image" />
	</Motion>

	<AnimatePresence :on-exit-complete="() => (isOnTop = false)">
		<Motion
			v-if="props.isOpen"
			key="modal"
			:exit="{ opacity: 0 }"
			:initial="{ opacity: 1 }"
			:layout-id="`card-${props.project.id}`"
			class="base-details flex column gap15"
		>
			<div class="flex row j-space-between a-center">
				<Motion :layout-id="`card-head-${props.project.id}`" class="flex row gap10 a-center">
					<img v-if="props.project.logo" :src="props.project.logo" alt="Project logo" class="logo" />
					<h3 class="chakra-petch f-large">{{ props.project.name }}</h3>
				</Motion>

				<XIcon :size="35" class="close" color="#000" @click="emit('close')" />
			</div>

			<section class="infos flex gap30 a-center">
				<div class="imgs flex column gap15">
					<img v-for="img in props.project.images" :key="img" :src="img" alt="" />
				</div>

				<div class="flex column gap20">
					<div class="flex column">
						<h4 class="chakra-petch">Description :</h4>
						<Motion as="p" :layout-id="`card-desc-${props.project.id}`" class="jura f-medium">
							{{ props.project.description }}
						</Motion>
					</div>

					<div>
						<h4 class="chakra-petch">Dates :</h4>
						<span class="jura">{{ props.project.date }}</span>
					</div>

					<div class="flex column">
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

					<div class="flex column">
						<h4 class="chakra-petch">Compétences :</h4>
						<section class="skills flex row gap5 wrap">
							<SkillItemComponent
								v-for="skill in props.isOpen ? props.project.skills : props.project.skills.slice(0, 3)"
								:key="skill.name"
								:text="skill.name"
								type="hard"
							/>
						</section>
					</div>
				</div>
			</section>
		</Motion>
	</AnimatePresence>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	section {
		background: transparent;
	}

	.base,
	.base-details {
		.logo {
			width: 45px;
			height: 45px;
			border-radius: 50%;
		}
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
		cursor: pointer;

		.head {
			width: fit-content;
		}

		p {
			height: 100%;
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
	}

	.base-details {
		position: fixed;
		z-index: 10;
		width: 80%;
		height: calc(80% - 50px);
		top: calc(10% + 50px);
		left: 10%;
		border-radius: var(--main-border-radius);
		box-shadow: var(--small-shadow);
		background: var(--light-background-color);
		padding: 20px;

		.close {
			cursor: pointer;
			padding: 5px;
			border-radius: 5px;
			transition: background 0.2s ease;

			&:hover {
				background: rgba(0, 0, 0, 0.1);
			}
		}

		p {
			z-index: 5;
		}

		h4 {
			font-size: 1.1em;
			margin-bottom: 5px;
		}

		.imgs {
			max-height: 100%;
			width: 80%;
			overflow-y: auto;
			padding: 20px 5px;
			mask: linear-gradient(to bottom, transparent, black 4%, black 96%, transparent);

			img {
				width: 100%;
				height: auto;
				max-height: 100%;
				object-fit: contain;
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
	}

	.fade-out-only-leave-active {
		transition: opacity 5s ease;
	}

	.fade-out-only-leave-to {
		opacity: 0;
	}

	.fade-out-only-enter-active,
	.fade-out-only-enter-from,
	.fade-out-only-enter-to {
		transition: none;
	}
</style>
