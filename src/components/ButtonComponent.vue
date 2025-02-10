<script lang="ts" setup>
	import { type Component, computed } from 'vue';

	const props = defineProps<{
		text?: string;
		link?: string;
		icon?: Component;
		backgroundColor?: string;
		color?: string;
	}>();

	const cssVars = computed(() => ({
		'--btn-background-color': props.backgroundColor || '40, 40, 40',
		'--btn-color': props.color || '255, 255, 255',
	}));
</script>

<template>
	<a :href="props.link || '#'" target="_blank">
		<button :style="cssVars" class="p-relative chakra-petch f-medium flex a-center">
			<component :is="props.icon" v-if="props.icon !== null" size="18"></component>
			{{ props.text }}
		</button>
	</a>
</template>

<style lang="scss" scoped>
	a {
		color: rgb(var(--btn-color));
	}

	button {
		background-color: rgb(var(--btn-background-color));
		color: rgb(var(--btn-color));
		border-radius: var(--small-border-radius);
		font-weight: 600;
		padding: 10px 30px;
		transition: all 200ms;

		&:hover {
			box-shadow: 0 0 15px rgba(var(--btn-background-color), 1);
		}

		&:active {
			box-shadow: 0 0 10px rgba(var(--btn-background-color), 0.6);
		}

		svg {
			margin-right: 8px;
		}
	}
</style>
