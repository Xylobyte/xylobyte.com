<script lang="ts" setup>
	import { MoveDown } from 'lucide-vue-next';
	import { Motion } from 'motion-v';
	import CareerItem from '@/components/CareerItem.vue';
	import dnb from '@/assets/images/dnb.webp';

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
			:image="dnb"
			:is-proof="true"
			description="In et voluptate qui nisi laborum id voluptate nulla velit. Qui officia id voluptate minim et enim aliquip sunt duis laborum sint do voluptate. Dolore qui consequat et veniam. Excepteur consequat culpa ipsum pariatur tempor exercitation dolor voluptate do."
			end="septembre 2021"
			start="octobre 2021"
			title="Brevet des collèges"
		/>

		<CareerItem
			description="In et voluptate qui nisi laborum id voluptate nulla velit. Qui officia id voluptate minim et enim aliquip sunt duis laborum sint do voluptate. Dolore qui consequat et veniam. Excepteur consequat culpa ipsum pariatur tempor exercitation dolor voluptate do."
			end="septembre 2021"
			image="@/assets/images/dnb.webp"
			start="octobre 2021"
			title="Brevet des collèges"
		/>

		<CareerItem
			description="In et voluptate qui nisi laborum id voluptate nulla velit. Qui officia id voluptate minim et enim aliquip sunt duis laborum sint do voluptate. Dolore qui consequat et veniam. Excepteur consequat culpa ipsum pariatur tempor exercitation dolor voluptate do."
			end="septembre 2021"
			image="@/assets/images/dnb.webp"
			start="octobre 2021"
			title="Brevet des collèges"
		/>

		<CareerItem
			description="In et voluptate qui nisi laborum id voluptate nulla velit. Qui officia id voluptate minim et enim aliquip sunt duis laborum sint do voluptate. Dolore qui consequat et veniam. Excepteur consequat culpa ipsum pariatur tempor exercitation dolor voluptate do."
			end="septembre 2021"
			image="@/assets/images/dnb.webp"
			start="octobre 2021"
			title="Brevet des collèges"
		/>

		<CareerItem
			description="In et voluptate qui nisi laborum id voluptate nulla velit. Qui officia id voluptate minim et enim aliquip sunt duis laborum sint do voluptate. Dolore qui consequat et veniam. Excepteur consequat culpa ipsum pariatur tempor exercitation dolor voluptate do."
			end="septembre 2021"
			image="@/assets/images/dnb.webp"
			start="octobre 2021"
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
