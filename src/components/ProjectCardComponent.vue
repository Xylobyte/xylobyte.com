<script lang="ts" setup>
	import type { Project } from '@/api/skills.types.ts';
	import SkillItemComponent from '@/components/SkillItemComponent.vue';
	import { Globe, SquareArrowOutUpRightIcon, X as XIcon } from 'lucide-vue-next';
	import { useRouter } from 'vue-router';
	import { GitHubIcon } from 'vue3-simple-icons';
	import { AnimatePresence, Motion } from 'motion-v';
	import { inject, ref, watchEffect } from 'vue';
	import { langKey, textsKey } from '@/keys.ts';
	import { getDateString } from '@/utils/dates.ts';

	const props = defineProps<{
		project: Project;
		isOpen: boolean;
		isHome?: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const lang = inject(langKey, ref('en'));
	const texts = inject(textsKey, ref({} as Record<string, string>));

	const isOnTop = ref(false);
	const isHover = ref(false);

	const router = useRouter();

	watchEffect(() => {
		if (props.isOpen) {
			isOnTop.value = true;
		}
	});
</script>

<template>
	<div>
		<Motion
			as="a"
			:id="`card-${props.project.id}`"
			:key="props.project.id"
			:animate="{ scale: isHover && !isOnTop ? 1.025 : 1 }"
			:class="{ open: props.isOpen }"
			:href="`/projects/${props.project.id}`"
			:layout-id="`card-${props.project.id}`"
			:style="{ zIndex: isOnTop ? 2 : 1 }"
			:title="props.project.name"
			class="base"
			@hoverEnd="isHover = false"
			@hoverStart="isHover = true"
			@click.prevent="!props.isOpen && router.push(`/projects/${props.project.id}`)"
		>
			<div :class="{ visible: isHover }" class="hover-border"></div>

			<div class="content flex column gap10">
				<Motion :layout-id="`card-head-${props.project.id}`" class="head flex row gap10 a-center">
					<img v-if="props.project.logo" :src="props.project.logo" alt="Project logo" class="logo" />
					<h3 class="chakra-petch f-large">{{ props.project.name }}</h3>
				</Motion>

				<p class="jura f-medium">
					{{ texts[`project-${props.project.id}-short-desc`] }}
				</p>

				<section v-if="!props.isOpen" class="skills flex row gap5 wrap">
					<SkillItemComponent
						v-for="skill in props.project.skills.slice(0, 3)"
						:key="skill.name"
						:text="skill.name"
						type="hard"
					/>
				</section>

				<Motion
					as="img"
					:alt="`Image of ${props.project.name} project`"
					:class="{ hover: isHover }"
					:src="props.project.images[0]"
					class="main-image"
				/>
			</div>
		</Motion>

		<Teleport to="#app">
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

						<div class="texts flex column gap20">
							<div class="flex column">
								<h4 class="chakra-petch">Description :</h4>
								<p class="jura f-medium">
									{{ texts[`project-${props.project.id}-desc`] }}
								</p>
							</div>

							<div>
								<h4 class="chakra-petch">Dates :</h4>
								<span class="jura">
									{{
										getDateString(
											lang,
											props.project.date.from.year,
											props.project.date.from.month,
										) +
										(props.project.date.to
											? ' - ' +
												getDateString(
													lang,
													props.project.date.to.year,
													props.project.date.to.month,
												)
											: '')
									}}
								</span>
							</div>

							<div v-if="props.project.link || props.project.linkOfCode" class="flex column">
								<h4 class="chakra-petch">{{ texts['p-card-link'] }}</h4>
								<div class="flex row gap15">
									<a
										v-if="props.project.link"
										:href="props.project.link"
										class="flex chakra-petch row a-center"
										target="_blank"
										title="The website"
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
										title="The code"
									>
										<GitHubIcon :size="18" />
										Code
										<SquareArrowOutUpRightIcon :size="18" />
									</a>
								</div>
							</div>

							<div class="flex column">
								<h4 class="chakra-petch">{{ texts['p-card-skills'] }}</h4>
								<section class="skills flex row gap5 wrap">
									<SkillItemComponent
										v-for="skill in props.isOpen
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
				</Motion>
			</AnimatePresence>
		</Teleport>
	</div>
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
		display: block;
		width: 100%;
		height: 100%;
		min-height: 200px;
		position: relative;
		box-shadow: var(--small-shadow);
		cursor: pointer;
		z-index: 2;
		border-radius: var(--main-border-radius);

		.hover-border {
			position: absolute;
			top: -4px;
			left: -4px;
			bottom: -4px;
			right: -4px;
			z-index: -1;
			overflow: hidden;
			border-radius: calc(var(--main-border-radius) + 4px);

			&::before {
				content: '';
				position: absolute;
				aspect-ratio: 1;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				opacity: 0;
				background: conic-gradient(transparent 300deg, var(--dark-primary-color), transparent);
			}

			&.visible::before {
				animation: rotate 1s linear forwards;
			}
		}

		.content {
			position: relative;
			border-radius: var(--main-border-radius);
			overflow: hidden;
			width: 100%;
			height: 100%;
			padding: 15px 100px 15px 15px;
			background: var(--light-background-color);
		}

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
			height: 100%;
			object-fit: cover;
			object-position: center;
			z-index: 0;
			opacity: 0.4;
			mask: linear-gradient(to right, transparent, black);
			width: 30%;
			transition: width 0.2s ease;

			&.hover {
				width: 45%;
			}
		}

		@media (max-width: 400px) {
			.main-image {
				opacity: 0.35;
				width: 50%;

				&.hover {
					width: 50%;
				}
			}
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

			.texts {
				overflow-y: auto;
				min-height: 0;
				height: 100%;
				padding: 20px 5px 20px 0;
				mask: linear-gradient(to bottom, transparent, black 4%, black 96%, transparent);
			}

			a {
				margin-left: 5px;
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

		@media (max-width: global_var.$mobile-width) {
			top: calc(4% + 50px);
			left: 2.5%;
			width: 95%;
			height: calc(92% - 50px);
			padding: 15px;
			gap: 5px;

			.infos {
				flex-direction: column;
				gap: 15px;

				.imgs {
					width: 100%;
					height: 60%;
					padding: 0 10px 0 10px;
					flex-direction: row;
					align-items: center;
					mask: linear-gradient(to right, transparent, black 4%, black 96%, transparent);

					img {
						width: 80%;
						height: fit-content;
					}
				}

				.texts {
					padding: 10px 0;
				}
			}
		}
	}

	@keyframes rotate {
		0% {
			transform: translateY(-25%) rotate(150deg);
			opacity: 0;
		}
		15% {
			opacity: 1;
		}
		75% {
			opacity: 1;
		}
		90% {
			opacity: 0;
		}
		100% {
			transform: translateY(-25%) rotate(450deg);
		}
	}
</style>
