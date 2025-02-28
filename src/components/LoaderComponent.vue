<script lang="ts" setup>
	import { LoaderCircle } from 'lucide-vue-next';
</script>

<template>
	<LoaderCircle class="loader" />
</template>

<style lang="scss" scoped>
	.loader {
		animation: loading 1.5s infinite linear;
	}

	@keyframes loading {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(359deg);
		}
	}
</style>
