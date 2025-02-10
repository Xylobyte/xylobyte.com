<script lang="ts" setup>
	import { onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import HeadTitleSection from '@/components/sections/home/HeadTitleSection.vue';

	const route = useRoute();

	onMounted(() => {
		document.title = 'Nantsa Montillet - Développeur Web';

		setTimeout(() => {
			if (route.hash !== '')
				document.getElementById(route.hash.slice(1))?.scrollIntoView({
					behavior: 'smooth',
				});

			console.clear();
			console.log('Bienvenue sur la console dev de');
			console.log(
				'██╗  ██╗██╗   ██╗██╗      ██████╗ ██████╗ ██╗   ██╗████████╗███████╗\n' +
					'╚██╗██╔╝╚██╗ ██╔╝██║     ██╔═══██╗██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝\n' +
					' ╚███╔╝  ╚████╔╝ ██║     ██║   ██║██████╔╝ ╚████╔╝    ██║   █████╗  \n' +
					' ██╔██╗   ╚██╔╝  ██║     ██║   ██║██╔══██╗  ╚██╔╝     ██║   ██╔══╝  \n' +
					'██╔╝ ██╗   ██║   ███████╗╚██████╔╝██████╔╝   ██║      ██║   ███████╗\n' +
					'╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═════╝    ╚═╝      ╚═╝   ╚══════╝',
			);
			console.log('Agrandir la console pour voir le logo ! ;)');
		}, 500);
	});
</script>

<template>
	<div>
		<HeadTitleSection />
	</div>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	.content {
		width: calc(100% - 330px);

		&::v-deep(section) {
			padding: 80px 4vw 2.5vw 3vw;
		}
	}

	@media (max-width: global_var.$tablet-width) {
		.content {
			width: calc(100% - 80px);
		}
	}

	@media (max-width: global_var.$mobile-width) {
		.content {
			width: 100%;
		}
	}
</style>
