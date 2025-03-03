<script lang="ts" setup>
	const props = defineProps<{
		text: string;
		type: 'hard' | 'soft' | 'language';
		level?: string;
	}>();
</script>

<template>
	<span v-if="props.type === 'hard'" class="jura hard f-medium">{{ props.text }}</span>
	<li v-else-if="props.type === 'soft'" class="jura f-medium">{{ props.text }}</li>
	<div v-else class="language flex column">
		<span class="jura f-medium">{{ props.text }}</span>
		<span class="jura level f-small">{{ props.level || 'Niveau B1' }}</span>
	</div>
</template>

<style lang="scss" scoped>
	.hard {
		background-color: var(--dark-background-color);
		color: white;
		padding: 3px 15px 4px;
		border-radius: var(--small-border-radius);
	}

	.language {
		background-color: var(--dark-background-color);
		gap: 2px;
		padding: 8px;
		border-radius: var(--small-border-radius);
		width: 48%;

		span {
			color: white;

			&.level {
				color: #ececec;
			}
		}
	}
</style>
