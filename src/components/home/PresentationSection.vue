<script lang="ts" setup>
	import SectionTitleComponent from '@/components/home/SectionTitleComponent.vue';
	import { Motion } from 'motion-v';
	import { appearFromBottom, pathStroke } from '@/animations/home-scroll.ts';
</script>

<template>
	<Motion
		as="section"
		id="presentation"
		:inViewOptions="{ once: true, margin: '-40% 0px' }"
		:transition="{ staggerChildren: 0.7 }"
		class="adaptative-viewport-height flex column gap30"
		initial="off"
		whileInView="on"
	>
		<Motion :variants="appearFromBottom" as-child>
			<SectionTitleComponent title="Présentation" />
		</Motion>

		<div class="texts flex column">
			<svg
				id="svg1"
				height="573.09692"
				preserveAspectRatio="none"
				viewBox="0 0 692.40753 573.09692"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<defs id="defs1">
					<linearGradient id="linearGradient11">
						<stop id="stop13" offset="0" style="stop-color: #646464; stop-opacity: 0" />
						<stop id="stop11" offset="0.13963965" style="stop-color: #646464; stop-opacity: 1" />
						<stop id="stop12" offset="0.88288289" style="stop-color: #9b8de5; stop-opacity: 1" />
						<stop id="stop14" offset="1" style="stop-color: #9b8de5; stop-opacity: 0" />
					</linearGradient>
					<linearGradient
						id="linearGradient12"
						gradientUnits="userSpaceOnUse"
						x1="585.06116"
						x2="590.71289"
						xlink:href="#linearGradient11"
						y1="4.6738529"
						y2="610.22449"
					/>
				</defs>
				<g id="g1" transform="translate(-221.66992,-19.92511)">
					<Motion
						as="path"
						id="path1"
						:variants="pathStroke"
						d="m 280.85021,21.925109 c 0,0 -9.34923,109.926281 18.79295,124.242291 106.30987,54.08013 532.62873,-83.180949 599.28632,-10.44053 38.40458,41.90919 -13.69405,72.37405 -74.32209,73.81141 -218.52718,5.18078 -314.34576,-2.33737 -484.24617,31.63792 -62.94999,12.58822 -48.96709,61.272 -1.04406,65.77534 190.03199,17.85736 375.47576,-39.01293 482.35241,1.04404 106.2352,39.81655 97.75368,100.11965 28.18943,112.75771 -135.41149,24.60083 -463.26628,-23.3769 -566.92068,8.35242 -110.77755,33.90977 -41.20624,98.85844 7.30836,103.36123 86.98762,8.0736 332.22151,-17.53452 461.01535,2.87727 72.76902,11.53274 72.49565,57.6778 72.49565,57.6778"
						vector-effect="non-scaling-stroke"
					/>
				</g>
			</svg>

			<Motion as="p" :variants="appearFromBottom" class="f-medium jura">
				Hello, &#128075;<br /><br />
				Je m'appelle Nantsa Montillet, je suis passionné par la programmation. Après un parcours autodidacte de
				quatre ans, j'ai acquis des compétences solides en programmation, notamment dans les langages C++, Java,
				HTML, CSS et JavaScript. Actuellement en formation chez OpenClassrooms, je me spécialise dans le
				développement web avec une formation de niveau BAC +2.
			</Motion>

			<Motion as="p" :variants="appearFromBottom" class="f-medium jura left">
				J'ai récemment réalisé un site vitrine pour une petite entreprise, mettant en pratique mes connaissances
				avec les frameworks Vue.js et Laravel, ainsi qu'en bases de données MySQL. Cette expérience m'a permis
				d'allier créativité et maîtrise technique pour répondre aux besoins de mon client. &#128526;
			</Motion>

			<Motion as="p" :variants="appearFromBottom" class="f-medium jura">
				Aujourd'hui, je suis à la recherche d'une alternance pour poursuivre mon parcours en bac+3 dès
				septembre. Passionné et autonome, je suis prêt à m'investir pleinement dans des projets stimulants, tout
				en continuant d'apprendre et de me perfectionner.
			</Motion>

			<Motion as="p" :variants="appearFromBottom" class="f-medium jura left">
				N'hésitez pas à me contacter pour échanger sur de nouvelles opportunités professionnelles ! &#128516;
			</Motion>
		</div>
	</Motion>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	section {
		.texts {
			gap: 50px;
			position: relative;

			svg {
				margin: 0 10%;
				position: absolute;
				width: 80%;
				height: 100%;
				z-index: 0;

				#path1 {
					opacity: 1;
					fill: none;
					fill-opacity: 1;
					stroke: url(#linearGradient12);
					stroke-width: 3;
					stroke-linecap: round;
					stroke-linejoin: round;
					stroke-opacity: 1;
					stroke-dasharray: 5000;
					stroke-dashoffset: var(--animation);
				}
			}

			p {
				z-index: 1;
				background: var(--light-background-color);
				border-radius: var(--main-border-radius);
				padding: 15px;
				width: 60%;

				&:first-of-type {
					margin-top: 30px;
				}

				&:last-of-type {
					margin-bottom: 50px;
				}

				&:nth-child(2n + 1) {
					align-self: end;
				}
			}
		}
	}
</style>
