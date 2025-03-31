<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion-v';

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

	let appDiv: HTMLElement | null;
	const color = useTransform(scrollY, [0.1, 0.2, 0.7, 0.8], ['#FFFFFF', '#101010', '#101010', '#FFFFFF']);
	const colorText = useTransform(scrollY, [0.1, 0.2, 0.7, 0.8], ['#000000', '#FFFFFF', '#FFFFFF', '#000000']);
	const color2 = useTransform(scrollY, [0.1, 0.2, 0.7, 0.8], ['#e5e5e5', '#151515', '#151515', '#e5e5e5']);
	useMotionValueEvent(color, 'change', () => {
		if (appDiv) appDiv.style.setProperty('--scroll-background', color.get());
	});
	useMotionValueEvent(colorText, 'change', () => {
		if (appDiv) appDiv.style.setProperty('--scroll-text', colorText.get());
	});
	useMotionValueEvent(color2, 'change', () => {
		if (appDiv) appDiv.style.setProperty('--scroll-background-2', color2.get());
	});

	onMounted(() => {
		appDiv = document.getElementById('app');
	});
</script>

<template>
	<div>
		<section id="career" ref="targetEl" class="adaptative-viewport-height flex column gap30">
			<div class="line" />
		</section>
	</div>
</template>

<style lang="scss" scoped>
	section {
		position: relative;
		background: var(--scroll-background);

		.line {
			position: absolute;
			top: -15px;
			bottom: 0;
			width: 4px;
			border-radius: 5px;
			background: var(--dark-primary-color);
			box-shadow: 0 0 10px 0 var(--dark-primary-color);
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
