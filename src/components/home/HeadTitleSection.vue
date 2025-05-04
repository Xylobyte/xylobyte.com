<script lang="ts" setup>
	import ScrollArrowsComponent from '@/components/home/ScrollArrowsComponent.vue';
	import { Motion, useMotionValue, useSpring, useTransform, type Variant } from 'motion-v';
	import { GitHubIcon, LinkedInIcon } from 'vue3-simple-icons';
	import ButtonComponent from '@/components/ButtonComponent.vue';

	const name = 'Nantsa\xa0Montillet';

	const x = useMotionValue(50);
	const y = useMotionValue(50);
	const xSpring = useSpring(x);
	const ySpring = useSpring(y);

	const rX = useTransform(ySpring, [0, 100], ['20deg', '-20deg']);
	const rY = useTransform(xSpring, [0, 100], ['-20deg', '20deg']);

	const mouseMoveHandler = (e: MouseEvent) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		x.set((e.clientX * 100) / rect.width);
		y.set((e.clientY * 100) / rect.height);
	};

	const resetRotations = () => {
		x.set(50);
		y.set(50);
	};

	const appearVariants: Record<never, Variant> = {
		hidden: {
			opacity: 0,
			filter: 'blur(10px)',
			y: '25%',
			scale: 0.85,
		},
		visible: (delay: number) => ({
			opacity: 1,
			filter: 'blur(0)',
			y: 0,
			scale: 1,
			transition: {
				default: { delay, duration: 0.4 },
				y: { delay, visualDuration: 0.4, type: 'spring', bounce: 0.6 },
			},
		}),
	};
</script>

<template>
	<main
		class="flex row a-center j-center a-center p-relative overflow-hidden"
		@mouseleave="resetRotations"
		@mousemove="mouseMoveHandler"
	>
		<div class="bg p-absolute"></div>

		<Motion :custom="3.4" :variants="appearVariants" animate="visible" initial="hidden">
			<Motion
				as="a"
				:style="{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }"
				class="daily-dev only-desktop flex"
				href="https://app.daily.dev/xylobyte"
			>
				<img alt="Nantsa's Dev Card" height="565" src="@/assets/images/daily_dev.webp" width="400" />
			</Motion>
		</Motion>

		<Motion
			as="hr"
			:animate="{ opacity: 1 }"
			:initial="{ opacity: 0 }"
			:transition="{ delay: 0.2, duration: 3.6 }"
		/>

		<div class="info flex column j-center gap10">
			<Motion :custom="0.2" :variants="appearVariants" animate="visible" as-child initial="hidden">
				<img alt="" height="300" src="@/assets/images/profil.webp" width="300" />
			</Motion>

			<Motion as="h1" class="big-title" layout-id="title-name">
				<Motion
					v-for="i in name.length"
					as="span"
					:key="i"
					:custom="0.8 + i * 0.1"
					:variants="appearVariants"
					animate="visible"
					initial="hidden"
				>
					{{ name[i - 1] }}
				</Motion>
			</Motion>
			<Motion
				as="h2"
				:custom="2.5"
				:variants="appearVariants"
				animate="visible"
				class="jura f-large"
				initial="hidden"
			>
				Développeur Web - Full Stack
			</Motion>
			<Motion
				as="p"
				:custom="2.8"
				:variants="appearVariants"
				animate="visible"
				class="jura f-medium"
				initial="hidden"
			>
				Passionné, autodidacte, rigoureux, opérationnel, je suis prêt pour tout type de mission.<br />
				N'hésitez pas a me contacter si vous avez une idée ou une proposition.
			</Motion>

			<div class="btn-link flex row gap40">
				<Motion :custom="3.1" :variants="appearVariants" animate="visible" as-child initial="hidden">
					<ButtonComponent
						:icon="GitHubIcon"
						background-color="255, 255, 255"
						color="0, 0, 0"
						link="https://github.com/Xylobyte"
						text="GitHub"
					/>
				</Motion>
				<Motion :custom="3.3" :variants="appearVariants" animate="visible" as-child initial="hidden">
					<ButtonComponent
						:icon="LinkedInIcon"
						background-color="10, 101, 192"
						class="second"
						color="255, 255, 255"
						link="https://www.linkedin.com/in/nantsa-montillet"
						text="LinkedIn"
					/>
				</Motion>
			</div>
		</div>

		<ScrollArrowsComponent class="p-absolute" />
	</main>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	main {
		padding: 70px 10px;
		min-height: 100vh;
		gap: 4vw;
		background-color: black;

		.bg {
			background: url('@/assets/images/backgrounds/bgdark.webp') center;
			background-size: cover;
			width: 100%;
			height: 100%;
			opacity: 0;
			animation: bgMaskReveal 800ms ease-in-out forwards;
			animation-delay: 3000ms;
			mask: url('@/assets/images/masks/homemask.svg');
			mask-position: center;
			mask-repeat: repeat;
			mask-size: var(--home-mask-size);
		}

		> *:not(:first-child) {
			z-index: 1;
		}

		.daily-dev {
			padding: 20px;
			background: rgba(255, 255, 255, 0.5);
			border-radius: 50px;

			img {
				width: 360px;
				height: auto;
				box-shadow: var(--large-shadow);
				transform: translateZ(40px);
				border-radius: 34px;
			}
		}

		> hr {
			width: auto;
			height: 45vh;
			border: none;
			border-left: white 2px solid;
		}

		.info {
			img {
				width: min(160px, 35vw);
				height: auto;
				border-radius: 50%;
				border: 3px solid white;
				margin-bottom: 20px;
			}

			h1 {
				display: flex;
				font-size: min(50px, 9vw);
			}

			h2 {
				color: var(--light-background-color);
			}

			p {
				color: #c5c5c5;
			}

			.btn-link {
				margin-top: 40px;
			}
		}

		svg {
			bottom: 10px;
		}

		@media (max-width: global_var.$mobile-width) {
			.btn-link {
				gap: 20px;
			}
		}
	}

	@keyframes bgMaskReveal {
		0% {
			opacity: 0;
			mask-size: var(--home-mask-size);
			-webkit-mask-size: var(--home-mask-size);
		}
		10% {
			opacity: 1;
		}
		100% {
			opacity: 1;
			mask-size: var(--home-mask-size-big);
			-webkit-mask-size: var(--home-mask-size-big);
		}
	}
</style>
