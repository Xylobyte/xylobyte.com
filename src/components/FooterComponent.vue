<template>
	<footer class="footer flex j-center a-center column gap5">
		<span class="jura f-medium">© Copyright 2023 - 2025 | Nantsa Montillet</span>
		<RouterLink to="/mentions-legales" class="txt-link jura"> Mentions légales </RouterLink>
	</footer>
</template>

<style lang="scss" scoped>
	footer {
		width: 100%;
		height: 10vh;
		min-height: 90px;
		background-color: var(--dark-background-color);

		span {
			color: white;
			text-align: center;
		}

		a {
			color: var(--light-primary-color);
		}
	}
</style>
