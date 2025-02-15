<script lang="ts" setup>
	const props = defineProps<{
		title: string;
	}>();
</script>

<template>
	<div class="title-wrapper flex row a-center">
		<h2 class="f-big chakra-petch">{{ props.title }}</h2>
		<hr />
	</div>
</template>

<style lang="scss" scoped>
	h2 {
		white-space: nowrap;
	}

	hr {
		width: 25vw;
		border: none;
		border-top: black dashed 4px;
		margin-left: 15px;
	}
</style>
