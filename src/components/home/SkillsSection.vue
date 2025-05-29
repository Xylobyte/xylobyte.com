<script lang="ts" setup>
	import { inject, onMounted, ref } from 'vue';
	import { Motion } from 'motion-v';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
	import type { HardSkills, LanguageSkill, SoftSkill } from '@/api/skills.types.ts';
	import SectionTitleComponent from '@/components/SectionTitleComponent.vue';
	import LoaderComponent from '@/components/LoaderComponent.vue';
	import SkillItemComponent from '@/components/SkillItemComponent.vue';
	import {
		appearFromBottom,
		appearFromLeft,
		appearFromRight,
		inViewCustomOptions,
	} from '@/animations/home-scroll.ts';
	import { textsKey } from '@/keys.ts';

	const texts = inject(textsKey, ref({} as Record<string, string>));

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
	<section id="skills" class="adaptative-viewport-height flex column">
		<SectionTitleComponent :title="texts['section2-title']" />

		<Motion
			as="p"
			:custom="0.2"
			:inViewOptions="inViewCustomOptions"
			:variants="appearFromBottom"
			class="jura"
			initial="off"
			whileInView="on"
		>
			{{ texts['section2-p1'] }}
		</Motion>
		<Motion
			as="p"
			:custom="0.4"
			:inViewOptions="inViewCustomOptions"
			:variants="appearFromBottom"
			class="jura"
			initial="off"
			whileInView="on"
		>
			{{ texts['section2-p2'] }}
		</Motion>

		<div class="skills-ct gap20">
			<Motion
				:custom="0.6"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromLeft"
				class="soft-skills-ct flex column gap5 p-relative"
				initial="off"
				whileInView="on"
			>
				<h3 class="chakra-petch f-large">Soft Skills</h3>

				<SkillItemComponent
					v-for="(skill, index) in softSkills"
					:key="index"
					:text="texts[skill.name]"
					type="soft"
				/>

				<Transition>
					<div v-if="!softSkills" class="loader flex a-center j-center">
						<LoaderComponent />
					</div>
				</Transition>
			</Motion>

			<Motion
				:custom="0.8"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromRight"
				class="hard-skills-ct flex column gap10 j-center p-relative"
				initial="off"
				whileInView="on"
			>
				<h3 class="chakra-petch f-large">{{ texts['section2-hs-title1'] }}</h3>
				<div class="flex wrap row a-center gap10">
					<SkillItemComponent
						v-for="(skill, index) in hardSkills?.languages"
						:key="index"
						:text="skill.name"
						type="hard"
					/>
				</div>

				<h3 class="chakra-petch f-large">{{ texts['section2-hs-title2'] }}</h3>
				<div class="flex wrap row a-center gap10">
					<SkillItemComponent
						v-for="(skill, index) in hardSkills?.frameworks"
						:key="index"
						:text="skill.name"
						type="hard"
					/>
				</div>

				<h3 class="chakra-petch f-large">{{ texts['section2-hs-title3'] }}</h3>
				<div class="flex wrap row a-center gap10">
					<SkillItemComponent
						v-for="(skill, index) in hardSkills?.tools"
						:key="index"
						:text="skill.name"
						type="hard"
					/>
				</div>

				<h3 class="chakra-petch f-large">{{ texts['section2-hs-title4'] }}</h3>
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
			</Motion>

			<Motion
				:custom="0.4"
				:inViewOptions="inViewCustomOptions"
				:variants="appearFromBottom"
				class="language-skills-ct flex column gap10 p-relative"
				initial="off"
				whileInView="on"
			>
				<h3 class="chakra-petch f-large">{{ texts['section2-ls-title'] }}</h3>

				<div class="flex row wrap gap10">
					<SkillItemComponent
						v-for="(skill, index) in languageSkills"
						:key="index"
						:level="texts[skill.level]"
						:text="texts[skill.name]"
						type="language"
					/>
				</div>

				<Transition>
					<div v-if="!languageSkills" class="loader flex a-center j-center">
						<LoaderComponent />
					</div>
				</Transition>
			</Motion>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	#skills {
		background: var(--scroll-background);
		color: var(--scroll-text);

		> p {
			margin: 15px 10vw 0 0;
			color: inherit;
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
