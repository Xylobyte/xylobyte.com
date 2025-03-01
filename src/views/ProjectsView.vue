<script lang="ts" setup>
	import { useRoute } from 'vue-router';
	import { onMounted } from 'vue';

	const route = useRoute();

	onMounted(() => {
		console.log(route.params);
	});
</script>

<template>
	<div></div>
</template>

<style lang="scss" scoped></style>
