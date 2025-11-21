<script lang="ts" setup>
	import { Motion } from 'motion-v';
	import { appearFromBottom, inViewCustomOptions } from '@/animations/home-scroll.ts';

	const props = defineProps<{
		title?: string;
	}>();
</script>

<template>
	<Motion
		:inViewOptions="inViewCustomOptions"
		:variants="appearFromBottom"
		class="title-wrapper flex row a-center"
		initial="off"
		whileInView="on"
	>
		<h2 class="f-big chakra-petch">{{ props.title }}</h2>
		<hr />
	</Motion>
</template>

<style lang="scss" scoped>
	.title-wrapper {
		z-index: 4;
		position: sticky;
		top: 58px;
	}

	h2 {
		white-space: nowrap;
		color: var(--scroll-text);
	}

	hr {
		width: 25vw;
		border: none;
		border-top: var(--scroll-text) dashed 4px;
		margin-left: 15px;
	}
</style>
