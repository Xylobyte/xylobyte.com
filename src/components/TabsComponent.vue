<script lang="ts" setup>
	import { Motion } from 'motion-v';

	const props = defineProps<{
		tabs: { id: string; label: string }[];
	}>();

	const model = defineModel<string>({ required: true, default: '' });
</script>

<template>
	<ul class="flex row">
		<li
			v-for="tab in props.tabs"
			:key="tab.id"
			:class="{ active: model === tab.id }"
			class="chakra-petch f-medium"
			@click="model = tab.id"
		>
			<Motion
				v-if="model === tab.id"
				:transition="{ ease: 'backOut', duration: 0.5 }"
				class="bg-active"
				layout-id="bg-active-tab"
			/>
			{{ tab.label }}
		</li>
	</ul>
</template>

<style lang="scss" scoped>
	ul {
		border: 1px solid var(--light-background-color);
		border-radius: var(--main-border-radius);
		overflow: hidden;
		padding: 2px;
		gap: 2px;
	}

	li {
		padding: 5px 15px;
		color: var(--dark-background-color);
		cursor: pointer;
		transition: color 0.2s;
		position: relative;
		z-index: 0;

		&.active {
			color: white;
			cursor: default;
		}

		.bg-active {
			background-color: var(--dark-primary-color);
			border-radius: var(--small-border-radius);
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
