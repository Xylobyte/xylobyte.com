<script lang="ts" setup>
	import { useScroll } from '@vueuse/core';
	import { ArrowUpToLine } from 'lucide-vue-next';

	const { y } = useScroll(window, { behavior: 'smooth' });
</script>

<template>
	<div :class="{ top: y < 500 }" class="scroll-top flex a-center j-center transition-all only-desktop" @click="y = 0">
		<ArrowUpToLine :size="25" class="transition-transform" />
	</div>
</template>

<style lang="scss" scoped>
	.scroll-top {
		position: fixed;
		bottom: 20px;
		right: 20px;
		cursor: pointer;
		height: auto;
		width: auto;
		background-color: var(--light-primary-color);
		padding: 10px 16px;
		border-radius: var(--small-border-radius);
		z-index: 2;

		&.top {
			opacity: 0.2;
			pointer-events: none;
		}

		&:hover {
			box-shadow: var(--medium-shadow);
			background-color: var(--dark-primary-color);

			svg {
				transform: translatey(-5px);
			}
		}

		svg {
			color: var(--dark-background-color);
		}
	}
</style>
