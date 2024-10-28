<template>
    <section id="skills" class="adaptative-viewport-height flex column">
        <SectionTitle v-motion-fade-visible-once :delay="250" title="Compétences"/>

        <p v-motion-slide-visible-once-bottom class="jura">
            J'ai développé ces compétences grâce à des périodes d'autoformation, à ma
            formation sur OpenClassrooms et à la concrétisation de divers projets.
        </p>
        <p v-motion-slide-visible-once-bottom class="jura">N'hésitez pas à explorer mes projets pour obtenir davantage de détails. &#128522;</p>

        <div class="skills-ct">
            <div v-motion-slide-visible-once-right :delay="250" class="hard-skills-ct flex column j-center p-relative">
                <h3 class="chakra-petch f-large">Langages</h3>
                <div class="flex wrap row a-center">
                    <SkillItemComponent v-for="(skill, index) in mainHardSkills.languages" :key="index" :text="skill.name" type="hard"/>
                </div>

                <h3 class="chakra-petch f-large">Frameworks</h3>
                <div class="flex wrap row a-center">
                    <SkillItemComponent v-for="(skill, index) in mainHardSkills.frameworks" :key="index" :text="skill.name" type="hard"/>
                </div>

                <h3 class="chakra-petch f-large">Outils</h3>
                <div class="flex wrap row a-center">
                    <SkillItemComponent v-for="(skill, index) in mainHardSkills.tools" :key="index" :text="skill.name" type="hard"/>
                </div>

                <h3 class="chakra-petch f-large">Systèmes d'exploitation</h3>
                <div class="flex wrap row a-center">
                    <SkillItemComponent v-for="(skill, index) in mainHardSkills.systems" :key="index" :text="skill.name" type="hard"/>
                </div>

                <Transition>
                    <div v-if="mainHardSkills.length === 0" class="loader flex a-center j-center">
                        <LoaderComponent/>
                    </div>
                </Transition>
            </div>

            <div v-motion-slide-visible-once-left :delay="250" class="soft-skills-ct flex column p-relative">
                <h3 class="chakra-petch f-large">Soft Skills</h3>

                <SkillItemComponent v-for="(skill, index) in softSkills" :key="index" :text="skill.name" type="soft"/>

                <Transition>
                    <div v-if="softSkills.length === 0" class="loader flex a-center j-center">
                        <LoaderComponent/>
                    </div>
                </Transition>
            </div>

            <div v-motion-slide-visible-once-bottom :delay="250" class="language-skills-ct flex column p-relative">
                <h3 class="chakra-petch f-large">Languages parlés</h3>

                <div class="flex row wrap">
                    <SkillItemComponent v-for="(skill, index) in languageSkills" :key="index" :level="skill.level" :text="skill.name"
                                        type="language"/>
                </div>

                <Transition>
                    <div v-if="languageSkills.length === 0" class="loader flex a-center j-center">
                        <LoaderComponent/>
                    </div>
                </Transition>
            </div>
        </div>
    </section>
</template>

<script setup>
import SectionTitle from "@/components/sections/home/SectionTitle.vue";
import SkillItemComponent from "@/components/sections/home/SkillsSection/SkillItemComponent.vue";
import LoaderComponent from "@/components/sections/LoaderComponent.vue";
</script>

<script>
import {defineComponent} from "vue";
import axiosClient from "@/axios";

export default defineComponent({
    name: 'SkillsSection',
    data() {
        return {
            mainHardSkills: [],
            allHardSkills: [],
            softSkills: [],
            languageSkills: [],
        }
    },
    mounted() {
        axiosClient.get(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_HARDSKILLS_ID}?meta=false`).then((response) => {
            this.mainHardSkills = response.data;
        }).catch((error) => console.log(error));

        axiosClient.get(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_SOFTSKILLS_ID}?meta=false`).then((response) => {
            this.softSkills = response.data;
        }).catch((error) => console.log(error));

        axiosClient.get(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_LANGUAGESKILLS_ID}?meta=false`).then((response) => {
            this.languageSkills = response.data;
        }).catch((error) => console.log(error));
    }
})
</script>

<style lang="scss" scoped>
@use "@/assets/css/global_var.scss" as *;

#skills {
    > p {
        margin: 15px 10vw 0 0;
    }

    .skills-ct {
        max-width: 1400px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
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

        .hard-skills-ct {
            gap: 10px;
            grid-row: 1 / 3;
            grid-column: 2;

            > div {
                gap: 10px;
                margin-bottom: 10px;
            }
        }

        .soft-skills-ct {
            grid-row: 1;
            grid-column: 1;
            gap: 5px;

            h3 {
                margin-bottom: 10px;
            }

            li {
                margin-left: 15px;
            }
        }

        .language-skills-ct {
            grid-row: 2;
            grid-column: 1;
            gap: 10px;

            > div {
                gap: 10px;
            }
        }
    }
}

@media (max-width: $tablet-width - 150px) {
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