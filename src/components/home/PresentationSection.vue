<script lang="ts" setup>
	import SectionTitleComponent from '@/components/home/SectionTitleComponent.vue';
	import { Motion, useScroll, useSpring, useTransform } from 'motion-v';
	import { appearFromBottom, inViewCustomOptions } from '@/animations/home-scroll.ts';
	import { MoveDown } from 'lucide-vue-next';
	import { ref } from 'vue';

	const targetEl = ref(null);
	const scrollYProgress = useScroll({
		target: targetEl,
		axis: 'y',
		offset: ['start end', 'end'],
	}).scrollYProgress;
	const scrollY = useSpring(scrollYProgress, {
		stiffness: 500,
		damping: 50,
		restDelta: 0.001,
	});
	const bottomVal = useTransform(scrollY, [0.3, 0.8, 0.88], ['87%', '30%', '1%']);
	const opacity = useTransform(scrollY, [0.3, 0.35], [0, 1]);
</script>

<template>
	<div ref="targetEl">
		<Motion as="section" id="presentation" class="adaptative-viewport-height flex column gap30">
			<Motion
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				as-child
				initial="off"
				whileInView="on"
			>
				<SectionTitleComponent title="Présentation" />
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

			<Motion
				as="h3"
				:custom="0.4"
				:inViewOptions="{ margin: '50% 0px -10% 0px' }"
				:variants="appearFromBottom"
				class="f-big chakra-petch flex a-center gap10"
				initial="off"
				whileInView="on"
			>
				Mon parcours
				<MoveDown />
			</Motion>

			<Motion :style="{ bottom: bottomVal, opacity }" class="line" />
		</Motion>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	section {
		background: var(--scroll-background);
		position: relative;
		gap: 50px;
		min-height: 120vh;

		p {
			z-index: 1;
			background: color-mix(in srgb, var(--light-background-color), transparent 30%);
			backdrop-filter: blur(5px);
			border-radius: var(--main-border-radius);
			padding: 15px;
			width: 70%;

			&:first-of-type {
				margin-top: 40px;
			}

			&:last-of-type {
				margin-bottom: 50px;
			}

			&:nth-child(2n + 1) {
				align-self: end;
			}
		}

		h3 {
			justify-self: flex-end;
			align-self: center;
			text-shadow: var(--scroll-background) 0 0 8px;
			z-index: 1;
			margin-top: 30px;
			color: var(--scroll-text);
		}

		.line {
			position: absolute;
			top: 150px;
			bottom: 85%;
			width: 4px;
			border-radius: 5px;
			background: var(--dark-primary-color);
			box-shadow: 0 0 10px 0 var(--dark-primary-color);
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
