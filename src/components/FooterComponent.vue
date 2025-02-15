<template>
	<footer class="footer flex j-center a-center column gap5">
		<span class="jura f-medium">© Copyright 2023 - 2025 | Nantsa Montillet</span>
		<span class="legal flex row a-center gap5">
			<RouterLink class="txt-link jura" to="/mentions-legales">Mentions légales</RouterLink>
			<span class="jura flex row gap5">
				<span class="separator">|</span>
				<a class="txt-link" href="https://github.com/Xylobyte/xylobyte.com">Code source</a> sous license
				<a class="txt-link" href="https://www.gnu.org/licenses/agpl-3.0.fr.html">AGPL v3.0</a>
			</span>
		</span>
	</footer>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

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

		@media (max-width: global_var.$mobile-width) {
			span.legal {
				flex-direction: column-reverse;

				.separator {
					display: none;
				}
			}
		}
	}
</style>
<script lang="ts" setup></script>
