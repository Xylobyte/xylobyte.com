<script lang="ts" setup>
	import SkillItemComponent from '@/components/SkillItemComponent.vue';

	const props = defineProps<{
		id: string;
		title: string;
		description: string;
		image: string;
		tags: { name: string }[];
		isProjectPage?: boolean;
	}>();
</script>

<template>
	<RouterLink :to="`/projects/${props.id}`" class="wrapper transition-transform">
		<div :class="props.isProjectPage ? '' : 'home-page'" class="card flex column gap20 p-relative transition-all">
			<div class="p-absolute head_card transition-transform"></div>

			<div class="head flex row gap10 a-center">
				<img :alt="'Logo ' + props.title" :src="props.image" />
				<h3 class="chakra-petch f-large">{{ props.title }}</h3>
			</div>

			<p class="jura">{{ props.description }}</p>

			<div class="tags flex row gap5 wrap">
				<SkillItemComponent v-for="(tag, index) in props.tags" :key="index" :text="tag.name" type="hard" />
			</div>
		</div>
	</RouterLink>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	.wrapper {
		margin-right: 0;
		height: 100%;
	}

	.wrapper:hover {
		transform: translateY(-10px) rotateZ(-1deg);
	}

	.card {
		background-color: var(--light-background-color);
		border-radius: var(--main-border-radius);
		padding: 20px;
		height: 100%;
		cursor: pointer;
		width: 100%;

		&.home-page {
			min-width: 300px;
			max-width: 500px;
			width: 35vw;
		}

		.head_card {
			background-color: var(--dark-primary-color);
			top: 1px;
			left: 0;
			right: 20%;
			height: 16px;
			border-radius: var(--main-border-radius) var(--main-border-radius) 0 0;
			z-index: -1;
		}

		&:hover {
			box-shadow: var(--medium-shadow);
			border-top-left-radius: 0;

			.head_card {
				transform: translateY(-15px);
				box-shadow: var(--medium-shadow);
			}
		}

		img {
			border-radius: 50px;
			width: calc(40px + 2vw);
			height: calc(40px + 2vw);
		}

		p {
			height: 100%;
		}
	}

	@media (max-width: global_var.$mobile-width) {
		.card {
			max-width: none;
			width: 100%;
		}
	}
</style>
