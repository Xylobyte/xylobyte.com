<script lang="ts" setup>
	import { MoveDown } from 'lucide-vue-next';
	import { Motion } from 'motion-v';
	import CareerItem from '@/components/CareerItem.vue';
	import dnb from '@/assets/images/dnb.webp';
	import swAssistantLogo from '@/assets/images/sw_assistant_logo.webp';
	import abzarokeLogo from '@/assets/images/abzaroke.webp';
	import ocLogo from '@/assets/images/oc.webp';
	import tmLogo from '@/assets/images/tm.webp';

	const props = defineProps<{
		isSnapped: boolean;
		isGone: boolean;
	}>();
</script>

<template>
	<section id="career" ref="targetEl" class="adaptative-viewport-height flex column gap30 a-center">
		<div class="h3-ct flex j-center">
			<Motion :animate="{ opacity: props.isGone ? 0 : 1 }" :class="{ snapped: props.isSnapped }" :layout="true">
				<h3 class="f-big chakra-petch flex a-center">
					Mon parcours
					<MoveDown />
				</h3>
			</Motion>
		</div>

		<CareerItem
			:description="'J\'ai développé un assistant personnel, avec un moteur de comprehension de text qui utilise des mots cles, et un systeme d\'extentions modulaire, le tout en C++ avec Qt'"
			:image="swAssistantLogo"
			:is-proof="false"
			end="2021"
			start="2020"
			title="Swifty Assistant (Projet perso)"
		/>

		<CareerItem
			:description="'- Mention : Bien\n- Candidat libre (epreuve supplaimentaire d\'anglais ecri)'"
			:image="dnb"
			end="juillet 2021"
			is-proof
			start="juin 2021"
			title="Brevet des collèges (DNB)"
		/>

		<CareerItem
			:image="abzarokeLogo"
			description="J'ai réalisé un site vitrine pour Bertrand Montillet, artisan sellier maroquinier. En utilisant HTML, CSS et JavaScript, ainsi que les technologies Laravel et Vue.js."
			end="décembre 2022"
			start="juillet 2022"
			title="Site vitrine Abzaroke"
		/>

		<CareerItem
			:image="ocLogo"
			description="Formation avec OpenClassrooms de 8 mois. Compétences acquises : HTML, CSS, JavaScript, Design, Veille tech, évaluation des ressources. Les compétences sont validées par différents projets disponibles sur mon GitHub."
			end="aout 2023"
			is-proof
			start="janvier 2023"
			title="Formation Bac+2 (OpenClassrooms)"
		/>

		<CareerItem
			:image="tmLogo"
			description="Une application de gestion des territoires pour un usage personnel. J'ai utilisé Kotlin ainsi que les nouveaux API Android (Jetpack Compose, Material You) pour sa réalisation."
			end="septembre 2023"
			start="aout 2023"
			title="Territory Manager (App Android)"
		/>

		<CareerItem
			:image="ocLogo"
			description="Seconde formation OpenClassrooms cette fois sur 2 ans en alternance avec l'entreprise DREMML. J'ai pu me spécialiser dans le développement d'applications Web, et j'ai pu obtenir des compétences professionnelles."
			end="septembre 2025"
			is-proof
			start="septembre 2023"
			title="Alternance Bac+3 (DREMML)"
		/>
	</section>
</template>

<style lang="scss" scoped>
	section {
		position: relative;
		background: transparent !important;
		color: var(--scroll-text);
		padding: 0 !important;

		* {
			color: inherit;
		}
	}

	.h3-ct {
		width: fit-content;
		margin-top: 40vh;
		margin-bottom: 20vh;
		z-index: 2;

		.snapped {
			position: fixed;
			top: 58px;
			margin-top: 0;
		}
	}

	h3 {
		position: relative;

		> * {
			position: absolute;
			right: 0;
			transform: translateX(calc(100% + 10px));
		}
	}
</style>
