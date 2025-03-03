<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import type { Project } from '@/api/skills.types.ts';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
	import SectionTitleComponent from '@/components/SectionTitleComponent.vue';

	const projects = ref<Project[]>();

	onMounted(async () => {
		try {
			projects.value = await XylobyteAPI.getProjects();
		} catch (e) {
			console.error(e);
		}
	});
</script>

<template>
	<section id="projects" class="adaptative-viewport-height flex column gap15 scroll-animate">
		<SectionTitleComponent :delay="250" title="Projets récents" />

		<p class="jura opacity-0">
			Découvrez un aperçu de mes projets les plus marquants que j'ai concrétisés. Pour une liste exhaustive de mes
			réalisations, je vous invite à visiter la page dédiée à mes projets !
		</p>

		<div class="ct-card flex row a-center gap20 p-relative opacity-0 from-right"></div>
	</section>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	#projects {
		padding-right: 0;

		> p {
			margin: 0 10vw 0 0;
		}

		.ct-card {
			margin-top: 20px;
			padding: 15px 0;
			overflow: visible;
			height: 240px;

			.loader {
				background-color: white;
			}

			.more {
				top: 0;
				bottom: 0;
				right: 0;
				background: linear-gradient(to right, transparent, white 40%, white);

				&:hover .border-wrapper {
					transform: translateX(8px);
				}

				a {
					color: black;
					white-space: nowrap;
					margin-left: 20px;
					margin-right: 5vw;

					.border-wrapper {
						background: white;
						border-radius: 60px;
						border: 1px solid black;
						padding: 8px 20px;
						box-shadow: var(--small-shadow);
						transition-delay: 0.1s;
					}
				}
			}
		}
	}

	@media (max-width: global_var.$mobile-width) {
		#projects {
			padding-right: 3vw;

			.ct-card {
				flex-direction: column;
				gap: 30px;
				height: auto;

				.more {
					position: relative;
				}
			}
		}
	}
</style>
