<script lang="ts" setup>
	import SectionTitleComponent from '@/components/home/SectionTitleComponent.vue';
	import { Motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion-v';
	import { appearFromBottom, inViewCustomOptions } from '@/animations/home-scroll.ts';
	import { onMounted, ref } from 'vue';
	import CareerSection from '@/components/home/CareerSection.vue';

	const targetEl = ref(null);
	const scrollYProgress = useScroll({
		target: targetEl,
		axis: 'y',
		offset: ['start end', 'end'],
	}).scrollYProgress;
	const scrollY = useSpring(scrollYProgress, {
		stiffness: 150,
		damping: 30,
		restDelta: 0.001,
	});

	const lineHeight = useTransform(scrollY, [0.06, 0.23], ['1vh', '64vh']);
	const opacity = useTransform(scrollY, [0.055, 0.09], [0, 1]);

	const isSnapped = ref(false);
	const isRound = ref(false);
	useMotionValueEvent(scrollY, 'change', () => {
		isSnapped.value = scrollYProgress.get() > 0.36;
		isRound.value = scrollYProgress.get() > 0.26;
	});

	let appDiv: HTMLElement | null;
	const color = useTransform(scrollY, [0.3, 0.33, 0.97, 1], ['#FFFFFF', '#101010', '#101010', '#FFFFFF']);
	useMotionValueEvent(color, 'change', () => {
		if (appDiv) appDiv.style.setProperty('--scroll-background', color.get());
	});
	const colorText = useTransform(scrollY, [0.3, 0.33, 0.97, 1], ['#000000', '#FFFFFF', '#FFFFFF', '#000000']);
	useMotionValueEvent(colorText, 'change', () => {
		if (appDiv) appDiv.style.setProperty('--scroll-text', colorText.get());
	});
	const color2 = useTransform(scrollY, [0.3, 0.33, 0.97, 1], ['#e5e5e5', '#151515', '#151515', '#e5e5e5']);
	useMotionValueEvent(color2, 'change', () => {
		if (appDiv) appDiv.style.setProperty('--scroll-background-2', color2.get());
	});

	onMounted(() => {
		appDiv = document.getElementById('app');
	});
</script>

<template>
	<div ref="targetEl">
		<section id="presentation" class="adaptative-viewport-height flex column gap30">
			<div class="line-ct flex column a-center">
				<Motion :style="{ height: lineHeight, opacity }" class="line">
					<Motion :animate="{ scale: isRound ? 1 : 0 }" :style="{ x: '-50%', y: '50%' }" class="point" />
				</Motion>
			</div>

			<Motion
				:animate="{ opacity: isSnapped ? 0 : 1, pointerEvents: isSnapped ? 'none' : 'auto' }"
				class="title-head"
			>
				<Motion
					:inViewOptions="inViewCustomOptions"
					:variants="appearFromBottom"
					as-child
					initial="off"
					whileInView="on"
				>
					<SectionTitleComponent title="Présentation" />
				</Motion>
			</Motion>

			<Motion
				as="p"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="f-medium jura"
				initial="off"
				whileInView="on"
			>
				Hello, &#128075;<br /><br />
				Je m'appelle Nantsa Montillet, je suis passionné par la programmation. Après un parcours autodidacte de
				quatre ans, j'ai acquis des compétences solides en programmation, notamment dans les langages C++, Java,
				HTML, CSS et JavaScript. Actuellement en formation chez OpenClassrooms, je me spécialise dans le
				développement web avec une formation de niveau BAC +2.
			</Motion>

			<Motion
				as="p"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="f-medium jura left"
				initial="off"
				whileInView="on"
			>
				J'ai récemment réalisé un site vitrine pour une petite entreprise, mettant en pratique mes connaissances
				avec les frameworks Vue.js et Laravel, ainsi qu'en bases de données MySQL. Cette expérience m'a permis
				d'allier créativité et maîtrise technique pour répondre aux besoins de mon client. &#128526;
			</Motion>

			<Motion
				as="p"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="f-medium jura"
				initial="off"
				whileInView="on"
			>
				Aujourd'hui, je suis à la recherche d'une alternance pour poursuivre mon parcours en bac+3 dès
				septembre. Passionné et autonome, je suis prêt à m'investir pleinement dans des projets stimulants, tout
				en continuant d'apprendre et de me perfectionner.
			</Motion>

			<Motion
				as="p"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="f-medium jura left"
				initial="off"
				whileInView="on"
			>
				N'hésitez pas à me contacter pour échanger sur de nouvelles opportunités professionnelles ! &#128516;
			</Motion>

			<CareerSection :is-snapped="isSnapped" />
		</section>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	.line-ct {
		position: absolute;
		top: 150px;
		bottom: 0;
		left: 0;
		right: 0;

		.line {
			position: sticky;
			top: 50px;
			width: 4px;
			border-radius: 5px;
			background: var(--dark-primary-color);
			box-shadow: 0 0 10px 0 var(--dark-primary-color);
		}

		.point {
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 18px;
			height: 18px;
			background: var(--dark-primary-color);
			box-shadow: 0 0 10px 0 var(--dark-primary-color);
			border-radius: 50%;
		}
	}

	section {
		background: var(--scroll-background);
		position: relative;
		gap: 50px;
		min-height: 120vh;

		.title-head {
			position: sticky;
			top: 58px;
			z-index: 4;
		}

		p {
			z-index: 1;
			background: color-mix(in srgb, var(--light-background-color), transparent 30%);
			backdrop-filter: blur(5px);
			border-radius: var(--main-border-radius);
			box-shadow: var(--small-shadow);
			padding: 15px;
			width: 70%;

			&:first-of-type {
				margin-top: 40px;
			}

			&:last-of-type {
				margin-bottom: 50px;
			}

			&:nth-child(2n) {
				align-self: end;
			}
		}

		h3 {
			justify-self: flex-end;
			align-self: center;
			text-shadow: var(--scroll-background) 0 0 8px;
			margin-top: 50px;
			color: var(--scroll-text);
			z-index: 4;
			position: fixed;
			bottom: 15vh;
			opacity: 0;
			transform: translateY(50px);

			&.show {
				opacity: 1;
				transform: translateY(0);
			}

			&.snapped {
				bottom: unset;
				top: 10px;
			}
		}
	}
</style>
