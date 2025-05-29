<script lang="ts" setup>
	import { MoveDown } from 'lucide-vue-next';
	import { Motion } from 'motion-v';
	import CareerItem from '@/components/CareerItem.vue';
	import dnb from '@/assets/images/dnb.webp';
	import swAssistantLogo from '@/assets/images/sw_assistant_logo.webp';
	import abzarokeLogo from '@/assets/images/abzaroke.webp';
	import ocLogo from '@/assets/images/oc.webp';
	import tmLogo from '@/assets/images/tm.webp';
	import { inject, ref } from 'vue';
	import { langKey, textsKey } from '@/keys.ts';

	const props = defineProps<{
		isSnapped: boolean;
		isGone: boolean;
	}>();

	const texts = inject(textsKey, ref({} as Record<string, string>));
	const lang = inject(langKey, ref('en'));

	const getDateString = (local: string, year: number, month: number) =>
		new Date(year, month).toLocaleDateString(local, { month: 'long', year: 'numeric' });
</script>

<template>
	<section id="career" ref="targetEl" class="adaptative-viewport-height flex column gap30 a-center">
		<div class="h3-ct flex j-center">
			<Motion :animate="{ opacity: props.isGone ? 0 : 1 }" :class="{ snapped: props.isSnapped }" :layout="true">
				<h3 class="f-big chakra-petch flex a-center">
					{{ texts['section1-path'] }}
					<MoveDown />
				</h3>
			</Motion>
		</div>

		<CareerItem
			:description="texts['section1-card1-desc']"
			:image="swAssistantLogo"
			:is-proof="false"
			:title="texts['section1-card1-title']"
			end="2021"
			start="2020"
		/>

		<CareerItem
			:description="texts['section1-card2-desc']"
			:end="getDateString(lang, 2021, 6)"
			:image="dnb"
			:start="getDateString(lang, 2021, 5)"
			:title="texts['section1-card2-title']"
			is-proof
		/>

		<CareerItem
			:description="texts['section1-card3-desc']"
			:end="getDateString(lang, 2022, 11)"
			:image="abzarokeLogo"
			:start="getDateString(lang, 2022, 6)"
			:title="texts['section1-card3-title']"
		/>

		<CareerItem
			:description="texts['section1-card4-desc']"
			:end="getDateString(lang, 2023, 7)"
			:image="ocLogo"
			:start="getDateString(lang, 2023, 0)"
			:title="texts['section1-card4-title']"
			is-proof
		/>

		<CareerItem
			:description="texts['section1-card5-desc']"
			:end="getDateString(lang, 2023, 8)"
			:image="tmLogo"
			:start="getDateString(lang, 2023, 7)"
			:title="texts['section1-card5-title']"
		/>

		<CareerItem
			:description="texts['section1-card6-desc']"
			:end="getDateString(lang, 2025, 7)"
			:image="ocLogo"
			:start="getDateString(lang, 2023, 7)"
			:title="texts['section1-card6-title']"
			is-proof
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
