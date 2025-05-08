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
		offset: ['start end', 'end start'],
	}).scrollYProgress;
	const scrollY = useSpring(scrollYProgress, {
		stiffness: 150,
		damping: 30,
		restDelta: 0.001,
	});

	const lineHeight = useTransform(scrollY, [0.06, 0.15], ['1vh', '60vh']);
	const opacity = useTransform(scrollY, [0.055, 0.09], [0, 1]);

	const isSnapped = ref(false);
	const isGone = ref(false);
	const isRound = ref(false);
	useMotionValueEvent(scrollY, 'change', () => {
		isSnapped.value = scrollYProgress.get() > 0.265;
		isGone.value = scrollYProgress.get() > 0.98;
		isRound.value = scrollYProgress.get() > 0.22 && scrollYProgress.get() < 0.98;
	});

	let appDiv: HTMLElement | null;
	const color = useTransform(scrollY, [0.2, 0.22, 0.96, 0.98], ['#FFFFFF', '#101010', '#101010', '#FFFFFF']);
	useMotionValueEvent(color, 'change', () => {
		if (appDiv) appDiv.style.setProperty('--scroll-background', color.get());
	});
	const colorText = useTransform(scrollY, [0.2, 0.22, 0.96, 0.98], ['#000000', '#FFFFFF', '#FFFFFF', '#000000']);
	useMotionValueEvent(colorText, 'change', () => {
		if (appDiv) appDiv.style.setProperty('--scroll-text', colorText.get());
	});
	const color2 = useTransform(scrollY, [0.2, 0.22, 0.96, 0.98], ['#e5e5e5', '#151515', '#151515', '#e5e5e5']);
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
					<Motion :animate="{ opacity: isRound ? 0.6 : 0 }" class="gradient" />
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
				Hello, 👋<br /><br />
				Je m'appelle Nantsa Montillet et je suis passionné par la programmation. Après un parcours autodidacte
				de quatre ans, j'ai acquis des compétences solides, notamment en C++, Java, HTML, CSS et JavaScript.
				J'ai réalisé plusieurs projets que vous pouvez retrouver dans
				<RouterLink class="txt-link" to="/projects">l'onglet Projets</RouterLink>
				de mon site ou sur
				<a class="txt-link" href="https://github.com/Xylobyte">ma page GitHub</a>.
			</Motion>

			<Motion
				as="p"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="f-medium jura left"
				initial="off"
				whileInView="on"
			>
				Actuellement en formation, j’ai déjà terminé et validé une première formation de développeur web
				d’environ un an, équivalente à un niveau Bac +2 🎓. Je poursuis désormais une spécialisation en
				développement d’applications web, orientée React, sur deux ans en alternance, correspondant à un niveau
				Bac +3.
			</Motion>

			<Motion
				as="p"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="f-medium jura left"
				initial="off"
				whileInView="on"
			>
				Mais attention, ne croyez pas que parce que je suis en formation, j’ai mis fin à mon auto-formation !
				😁<br />
				<ul class="txt-list">
					<li>
						J’ai par exemple réalisé un <a class="txt-link" href="https://abzaroke.fr">site vitrine</a> et
						une <a class="txt-link" href="https://shop.abzaroke.fr">boutique en ligne</a> pour un artisan.
					</li>
					<li>J’ai aussi développé une application Android avec Kotlin et Jetpack Compose !</li>
					<li>
						Je me suis formé à de nouveaux langages comme Rust et Swift, ainsi qu’à de nouveaux outils et
						pratiques comme le SEO, Framer Motion, l’enregistrement audio depuis un navigateur… sans oublier
						l’anglais bien sûr 💬
					</li>
					<li>
						Je continue le développement embarqué avec le raspberry pi pico, et l'ESP32 en utilisant le C++
					</li>
				</ul>
			</Motion>

			<Motion
				as="p"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="f-medium jura"
				initial="off"
				whileInView="on"
			>
				Aujourd’hui, je suis toujours en alternance, que je termine en octobre. À partir de ce moment-là, je
				serai disponible pour tout type de nouvelle opportunité !<br />
				Alors n’hésitez pas à me contacter et à me faire vos propositions ! 😎
			</Motion>

			<CareerSection :is-gone="isGone" :is-snapped="isSnapped" />
		</section>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	.line-ct {
		position: absolute;
		padding-bottom: 140px;
		top: 150px;
		bottom: 0;
		left: 0;
		right: 0;

		.line {
			position: sticky;
			top: 50px;
			width: 4px;
			border-radius: 5px;
			background-color: var(--dark-primary-color);
			box-shadow: 0 0 10px 0 var(--dark-primary-color);
		}

		.gradient {
			position: absolute;
			bottom: 0;
			left: 49%;
			width: 1px;
			height: 1px;
			z-index: -1;
			box-shadow: 0 0 1000px 8vw var(--dark-primary-color);

			@media (max-width: global_var.$tablet-width) {
				box-shadow: 0 0 1000px 15vw var(--dark-primary-color);
			}
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

			.txt-list {
				list-style: circle;
				padding-left: 20px;
			}

			@media (max-width: global_var.$tablet-width) {
				width: 80%;
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
