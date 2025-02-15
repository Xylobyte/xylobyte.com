<script lang="ts" setup>
	import type { Component } from 'vue';

	const props = defineProps<{
		name: string;
		icon: Component;
		targetId: string;
		isActive: boolean;
	}>();
</script>

<template>
	<a
		:class="{ active: props.isActive }"
		:href="'#' + props.targetId"
		class="flex a-center chakra-petch f-large transition-all"
	>
		<div class="transition-all flex a-center j-center">
			<component :is="props.icon" :size="20" class="transition-all"></component>
		</div>
		<span class="transition-transform">{{ props.name }}</span>
	</a>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	a {
		color: var(--dark-background-color);

		&:hover span {
			transform: translateX(10px);
		}

		div {
			margin-right: 15px;
			height: 40px;
			width: 40px;
			background-color: #e2e2e2;
			border: var(--dark-background-color) solid 1px;
			border-radius: var(--small-border-radius);

			svg {
				color: var(--dark-background-color);
			}
		}

		&.active {
			color: var(--dark-primary-color);
			font-weight: 600;

			div {
				border: var(--dark-primary-color) solid 3px;
				border-radius: 50%;

				svg {
					color: var(--dark-primary-color);
				}
			}
		}
	}

	@media (max-width: global_var.$tablet-width) and (min-width: global_var.$mobile-width) {
		a {
			div {
				margin-right: 0;
			}

			span {
				display: none;
			}
		}
	}
</style>
