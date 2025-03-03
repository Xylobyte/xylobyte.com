<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
	import type { HardSkills, LanguageSkill, SoftSkill } from '@/api/skills.types.ts';
	import SectionTitleComponent from '@/components/home/SectionTitleComponent.vue';
	import LoaderComponent from '@/components/LoaderComponent.vue';
	import SkillItemComponent from '@/components/SkillItemComponent.vue';

	const hardSkills = ref<HardSkills>();
	const softSkills = ref<SoftSkill[]>();
	const languageSkills = ref<LanguageSkill[]>();

	onMounted(async () => {
		try {
			hardSkills.value = await XylobyteAPI.getHardSkills();
			softSkills.value = await XylobyteAPI.getSoftSkills();
			languageSkills.value = await XylobyteAPI.getLanguagesSkills();
		} catch (e) {
			console.error(e);
		}
	});
</script>

<template>
	<section id="skills" class="adaptative-viewport-height flex column scroll-animate">
		<SectionTitleComponent title="Compétences" />

		<p class="jura opacity-0">
			J'ai développé ces compétences grâce à des périodes d'autoformation, à ma formation sur OpenClassrooms et à
			la concrétisation de divers projets.
		</p>
		<p class="jura opacity-0">N'hésitez pas à explorer mes projets pour obtenir davantage de détails. &#128522;</p>

		<div class="skills-ct gap20">
			<div class="soft-skills-ct flex column gap5 p-relative opacity-0">
				<h3 class="chakra-petch f-large">Soft Skills</h3>

				<SkillItemComponent v-for="(skill, index) in softSkills" :key="index" :text="skill.name" type="soft" />

				<Transition>
					<div v-if="!softSkills" class="loader flex a-center j-center">
						<LoaderComponent />
					</div>
				</Transition>
			</div>

			<div class="hard-skills-ct flex column gap10 j-center p-relative opacity-0">
				<h3 class="chakra-petch f-large">Langages</h3>
				<div class="flex wrap row a-center gap10">
					<SkillItemComponent
						v-for="(skill, index) in hardSkills?.languages"
						:key="index"
						:text="skill.name"
						type="hard"
					/>
				</div>

				<h3 class="chakra-petch f-large">Frameworks</h3>
				<div class="flex wrap row a-center gap10">
					<SkillItemComponent
						v-for="(skill, index) in hardSkills?.frameworks"
						:key="index"
						:text="skill.name"
						type="hard"
					/>
				</div>

				<h3 class="chakra-petch f-large">Outils</h3>
				<div class="flex wrap row a-center gap10">
					<SkillItemComponent
						v-for="(skill, index) in hardSkills?.tools"
						:key="index"
						:text="skill.name"
						type="hard"
					/>
				</div>

				<h3 class="chakra-petch f-large">Systèmes d'exploitation</h3>
				<div class="flex wrap row a-center gap10">
					<SkillItemComponent
						v-for="(skill, index) in hardSkills?.systems"
						:key="index"
						:text="skill.name"
						type="hard"
					/>
				</div>

				<Transition>
					<div v-if="!hardSkills" class="loader flex a-center j-center">
						<LoaderComponent />
					</div>
				</Transition>
			</div>

			<div class="language-skills-ct flex column gap10 p-relative opacity-0">
				<h3 class="chakra-petch f-large">Languages parlés</h3>

				<div class="flex row wrap gap10">
					<SkillItemComponent
						v-for="(skill, index) in languageSkills"
						:key="index"
						:level="skill.level"
						:text="skill.name"
						type="language"
					/>
				</div>

				<Transition>
					<div v-if="!languageSkills" class="loader flex a-center j-center">
						<LoaderComponent />
					</div>
				</Transition>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	#skills {
		> p {
			margin: 15px 10vw 0 0;
		}

		.skills-ct {
			max-width: 1400px;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			margin-top: 20px;

			div.loader {
				margin-bottom: 0;
				background-color: var(--light-background-color);
			}

			> div {
				background-color: var(--light-background-color);
				border-radius: var(--main-border-radius);
				padding: 20px;
				overflow: hidden;
			}

			.soft-skills-ct {
				grid-row: 1;
				grid-column: 1;

				h3 {
					margin-bottom: 10px;
				}

				li {
					margin-left: 15px;
				}
			}

			.hard-skills-ct {
				grid-row: 1 / 3;
				grid-column: 2;

				> div {
					margin-bottom: 10px;
				}
			}

			.language-skills-ct {
				grid-row: 2;
				grid-column: 1;
			}
		}
	}

	@media (max-width: (global_var.$tablet-width - 150px)) {
		#skills {
			> p {
				margin: 15px 5vw 0 0;
			}

			.skills-ct {
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
