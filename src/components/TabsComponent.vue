<script lang="ts" setup>
	const props = defineProps<{
		tabs: { id: string; label: string }[];
	}>();

	const model = defineModel<string>();
</script>

<template>
	<ul class="flex row">
		<li
			v-for="tab in props.tabs"
			:key="tab.id"
			:class="{ active: model === tab.id }"
			class="chakra-petch f-medium transition-all"
			@click="model = tab.id"
		>
			{{ tab.label }}
		</li>
	</ul>
</template>

<style lang="scss" scoped>
	ul {
		border: 2px solid var(--light-background-color);
		border-radius: var(--main-border-radius);
		overflow: hidden;
	}

	li {
		padding: 7px 15px;
		color: var(--dark-background-color);
		cursor: pointer;

		&:not(:last-child) {
			border-right: 2px solid var(--light-background-color);
		}

		&.active {
			background-color: var(--dark-primary-color);
			color: white;
		}
	}
</style>
