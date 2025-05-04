<script lang="ts" setup>
	import { ref } from 'vue';
	import { Motion, useMotionValueEvent, useScroll } from 'motion-v';
	import { appearFromBottom } from '@/animations/home-scroll.ts';

	const props = defineProps<{
		start: string;
		end?: string;
		title: string;
		image: string;
		description: string;
		isProof?: boolean;
	}>();

	const showStartDate = ref(false);
	const showCard = ref(false);
	const showEndDate = ref(false);

	const item = ref(null);
	const scrollYProgress = useScroll({
		target: item,
		axis: 'y',
		offset: ['start end', 'end'],
	}).scrollYProgress;

	useMotionValueEvent(scrollYProgress, 'change', () => {
		showStartDate.value = scrollYProgress.get() > 0.25;
		showCard.value = scrollYProgress.get() > 0.35;
		showEndDate.value = scrollYProgress.get() > 0.98;
	});
</script>

<template>
	<div ref="item" class="zone flex j-center">
		<div class="card-ct flex a-center column gap10">
			<div>
				<Motion
					as="span"
					:animate="{ x: showStartDate ? 0 : -100, opacity: showStartDate ? 1 : 0 }"
					class="start jura f-small"
				>
					{{ props.start }}
				</Motion>
			</div>
			<Motion
				:animate="showCard ? 'on' : 'off'"
				:custom="0"
				:variants="appearFromBottom"
				class="card flex a-center gap15"
			>
				<div class="images">
					<img :alt="props.title" :class="{ full: !props.isProof }" :src="props.image" />
					<img v-if="props.isProof" alt="" src="@/assets/images/masks/goal.svg" />
				</div>
				<div class="flex column gap15">
					<h3 class="chakra-petch f-large">{{ props.title }}</h3>
					<p class="jura f-medium">{{ props.description }}</p>
				</div>
			</Motion>
			<div>
				<Motion
					as="span"
					:animate="{ x: showEndDate ? 0 : 100, opacity: showEndDate ? 1 : 0 }"
					class="end jura f-small"
				>
					{{ props.end }}
				</Motion>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.zone {
		height: 85vh;

		&:first-of-type {
			margin-top: 50px;
		}

		> * {
			position: sticky;
			top: calc(64vh + 60px);
		}
	}

	.card-ct {
		transform: translateY(-50%);
		height: fit-content;
	}

	.card {
		backdrop-filter: blur(5px);
		width: 35vw;
		background: color-mix(in srgb, var(--scroll-background-2), transparent 30%);
		border-radius: var(--main-border-radius);
		box-shadow: var(--small-shadow);
		padding: 30px 40px 30px 15px;
		min-width: 450px;

		.images {
			min-height: 150px;
			min-width: 150px;
			position: relative;

			> img {
				position: absolute;
				width: 100%;

				&:first-child:not(.full) {
					border-radius: 50%;
					width: 60%;
					height: 60%;
					top: 47px;
					left: 30px;
				}
			}
		}
	}

	.card-ct > div {
		position: relative;
	}

	span {
		position: absolute;
		text-wrap: nowrap;
		color: gray !important;

		&.start {
			right: 10px;
			bottom: 0;
		}

		&.end {
			left: 30px;
		}
	}
</style>
