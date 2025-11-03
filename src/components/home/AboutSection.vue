<script lang="ts" setup>
	import SectionTitleComponent from '@/components/SectionTitleComponent.vue';
	import ButtonComponent from '@/components/ButtonComponent.vue';
	import { DailyDotdevIcon, GitHubIcon } from 'vue3-simple-icons';
	import { Motion } from 'motion-v';
	import { appearFromBottom, inViewCustomOptions } from '@/animations/home-scroll.ts';
	import { inject, ref } from 'vue';
	import { textsKey } from '@/keys.ts';

	const texts = inject(textsKey, ref({} as Record<string, string>));
</script>

<template>
	<section id="about" class="adaptative-viewport-height p-relative flex column">
		<SectionTitleComponent :title="texts['section4-title']" class="title-sec" />

		<div class="bg-about p-absolute"></div>

		<div class="grid-info gap30">
			<Motion
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="box-info infos flex column gap15 p-relative"
				initial="off"
				whileInView="on"
			>
				<h3 class="chakra-petch f-large p-absolute">{{ texts['section4-infos'] }}</h3>

				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-infos-addr'] }}</span>
					<span class="jura">63680 Chastreix, France</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-infos-birth'] }}</span>
					<span class="jura">{{ texts['section4-infos-birth-value'] }}</span>
				</div>
			</Motion>
			<Motion
				:custom="0.3"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="box-info find-work flex column gap15 p-relative"
				initial="off"
				whileInView="on"
			>
				<h3 class="chakra-petch f-large p-absolute">{{ texts['section4-job'] }}</h3>

				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-job-title'] }}</span>
					<span class="jura">{{ texts['section4-job-title-value'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-job-contract'] }}</span>
					<span class="jura">{{ texts['section4-job-contract-value'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-job-loc'] }}</span>
					<span class="jura">{{ texts['section4-job-loc-value'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-job-skills'] }}</span>
					<span class="jura">{{ texts['section4-job-skills-value'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-job-infos'] }}</span>
					<span class="jura">{{ texts['section4-job-infos-value'] }}</span>
				</div>
			</Motion>
			<Motion
				:custom="0.4"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="box-info hobbies flex column gap15 p-relative"
				initial="off"
				whileInView="on"
			>
				<h3 class="chakra-petch f-large p-absolute">{{ texts['section4-interests'] }}</h3>

				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-interests-1'] }}</span>
					<span class="jura">{{ texts['section4-interests-1-desc'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-interests-2'] }}</span>
					<span class="jura">{{ texts['section4-interests-2-desc'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-interests-3'] }}</span>
					<span class="jura">{{ texts['section4-interests-3-desc'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-interests-4'] }}</span>
					<span class="jura">{{ texts['section4-interests-4-desc'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-interests-5'] }}</span>
					<span class="jura">{{ texts['section4-interests-5-desc'] }}</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">{{ texts['section4-interests-6'] }}</span>
					<span class="jura">{{ texts['section4-interests-6-desc'] }}</span>
				</div>
			</Motion>
			<Motion
				:custom="0.15"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="box-info links p-relative gap25"
				initial="off"
				whileInView="on"
			>
				<h3 class="chakra-petch f-large p-absolute">{{ texts['section4-links'] }}</h3>

				<ButtonComponent
					:icon="GitHubIcon"
					background-color="50, 50, 50"
					class="flex a-center j-center"
					color="255, 255, 255"
					link="https://github.com/Xylobyte"
					text="GitHub"
				/>
				<ButtonComponent
					background-color="10, 101, 192"
					class="flex a-center j-center"
					color="255, 255, 255"
					link="https://www.linkedin.com/in/nantsa-montillet"
					text="LinkedIn"
				/>
				<ButtonComponent
					background-color="242, 187, 19"
					class="flex a-center j-center"
					color="255, 255, 255"
					link="https://www.codingame.com/profile/6a09b7f196bb6fae61ca49b75d3a8e5b6810864"
					text="CodinGame"
				/>
				<ButtonComponent
					:icon="DailyDotdevIcon"
					background-color="0, 0, 0"
					class="flex a-center j-center"
					color="255, 255, 255"
					link="https://app.daily.dev/xylobyte"
					text="Daily.dev"
				/>
			</Motion>
		</div>

		<Motion :custom="0.3" :variants="appearFromBottom" as-child initial="off" whileInView="on">
			<ButtonComponent
				:text="texts['section4-cv-button']"
				background-color="102, 88, 185"
				class="btn-cv flex a-center j-center"
				color="255, 255, 255"
				link="/files/nm_cv.pdf"
			/>
		</Motion>
	</section>
</template>

<style lang="scss" scoped>
	.bg-about {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('@/assets/images/backgrounds/bg_grid_about.svg') repeat;
		background-size: 30px;
		opacity: 0.3;
	}

	.title-sec {
		width: max-content;
	}

	.grid-info {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		margin-top: 40px;
		max-width: 1200px;

		.box-info {
			background-color: rgba(255, 255, 255, 0.4);
			border: var(--light-primary-color) 2px dashed;
			border-radius: var(--main-border-radius);
			padding: 25px;

			h3 {
				top: -18px;
				background-color: white;
				padding: 0 10px;
				border-radius: var(--main-border-radius);
			}

			.ct-card-text {
				gap: 5vw;

				span.bold {
					flex-shrink: 0;
				}

				span:last-child {
					text-align: right;
				}
			}

			&.infos {
				grid-column: 1;
				grid-row: 1;
			}

			&.find-work {
				grid-column: 2;
				grid-row: 1 / 3;
				border-color: #ce412b;
			}

			&.hobbies {
				grid-column: 1;
				grid-row: 2 / 5;
				border-color: #27c77e;
			}

			&.links {
				grid-column: 2;
				grid-row: 3 / 5;
				border-color: #3c7bcc;
				display: grid;
				grid-template-columns: repeat(2, 1fr);

				h3 {
					left: 25px;
				}
			}
		}
	}

	.btn-cv {
		margin-top: 50px;
		margin-bottom: 20px;
	}

	@media (max-width: 1200px) {
		.grid-info {
			display: flex;
			flex-direction: column;

			.box-info {
				padding: 15px;
			}

			.box-info.links {
				gap: 10px;
			}
		}
	}
</style>
