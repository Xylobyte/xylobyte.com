<script lang="ts" setup>
	import { MoveDown } from 'lucide-vue-next';
	import { Motion } from 'motion-v';
	import CareerItem from '@/components/CareerItem.vue';
	import dnb from '@/assets/images/dnb.webp';
	import swAssistantLogo from '@/assets/images/sw_assistant_logo.webp';
	import abzarokeLogo from '@/assets/images/abzaroke_logo.webp';

	const props = defineProps<{
		isSnapped: boolean;
	}>();
</script>

<template>
	<section id="career" ref="targetEl" class="adaptative-viewport-height flex column gap30 a-center">
		<div class="h3-ct flex j-center">
			<Motion :class="{ snapped: props.isSnapped }" :layout="true">
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
			:is-proof="true"
			end="juillet 2021"
			start="juin 2021"
			title="Brevet des collèges (DNB)"
		/>

		<CareerItem
			:image="abzarokeLogo"
			description="J'ai réalisé un site vitrine pour Bertrand Montillet, artisan sellier maroquinier. En utilisant HTML, CSS et JavaScript, ainsi que les technologies Laravel et Vue.js"
			end="décembre 2022"
			start="juillet 2022"
			title="Site vitrine Abzaroke"
		/>

		<CareerItem
			description="In et voluptate qui nisi laborum id voluptate nulla velit. Qui officia id voluptate minim et enim aliquip sunt duis laborum sint do voluptate. Dolore qui consequat et veniam. Excepteur consequat culpa ipsum pariatur tempor exercitation dolor voluptate do."
			end="aout 2023"
			image="@/assets/images/dnb.webp"
			start="janvier 2023"
			title="Brevet des collèges"
		/>

		<CareerItem
			description="In et voluptate qui nisi laborum id voluptate nulla velit. Qui officia id voluptate minim et enim aliquip sunt duis laborum sint do voluptate. Dolore qui consequat et veniam. Excepteur consequat culpa ipsum pariatur tempor exercitation dolor voluptate do."
			end="aout 2023"
			image="@/assets/images/dnb.webp"
			start="septembre 2023"
			title="Brevet des collèges"
		/>

		<CareerItem
			description="In et voluptate qui nisi laborum id voluptate nulla velit. Qui officia id voluptate minim et enim aliquip sunt duis laborum sint do voluptate. Dolore qui consequat et veniam. Excepteur consequat culpa ipsum pariatur tempor exercitation dolor voluptate do."
			end="septembre 2023"
			image="@/assets/images/dnb.webp"
			start="septembre 2025"
			title="Brevet des collèges"
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
