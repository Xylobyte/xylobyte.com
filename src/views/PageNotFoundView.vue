<script lang="ts" setup>
	import { onMounted } from 'vue';

	onMounted(() => {
		document.title = 'Nantsa Montillet - 404';
	});
</script>

<template>
	<div class="flex column a-center j-center gap20">
		<h1 class="big-title">404</h1>
		<h2 class="jura">Desolé, mais cette page n'existe pas</h2>
		<RouterLink class="txt-link jura" to="/">Retourner sur la page d'accueil</RouterLink>
	</div>
</template>

<style lang="scss" scoped>
	div {
		width: 100%;
		height: 100vh;
		background: white;

		h1 {
			font-size: min(90px, 10vw);
			color: black;
		}
	}
</style>
