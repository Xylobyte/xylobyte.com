<template>
    <section id="projects" class="adaptative-viewport-height flex column">
        <SectionTitle v-motion-fade-visible-once :delay="250" title="Projets récents"/>

        <p v-motion-slide-visible-once-bottom :delay="250" class="jura">Découvrez un aperçu de mes projets les plus marquants que j'ai concrétisés.
            Pour une liste exhaustive de mes réalisations, je vous invite à visiter la page dédiée à mes projets !</p>

        <div v-motion-slide-visible-once-right :delay="250" class="ct_card flex row a-center p-relative">
            <ProjectCardComponent v-if="projects.length > 0" :id="projects[0].id" :description="projects[0].shortDescription"
                                  :image="projects[0].logo"
                                  :tags="projects[0].skills.slice(0, 3)" :title="projects[0].name"/>
            <ProjectCardComponent v-if="projects.length > 0" :id="projects[1].id" :description="projects[1].shortDescription"
                                  :image="projects[1].logo"
                                  :tags="projects[1].skills.slice(0, 3)" :title="projects[1].name"/>
            <div class="more flex a-center p-absolute">
                <RouterLink class="flex column a-center jura" to="/projects">
                    <div class="border-wrapper flex a-center transition-transform">
                        <ArrowRight size="30"/>
                    </div>
                    Tous les projets
                </RouterLink>
            </div>

            <Transition>
                <div v-if="projects.length === 0" class="loader flex a-center j-center">
                    <LoaderComponent/>
                </div>
            </Transition>
        </div>
    </section>
</template>

<script setup>
import SectionTitle from "@/components/sections/home/SectionTitle.vue";
import ProjectCardComponent from "@/components/sections/projects/ProjectCardComponent.vue";
import LoaderComponent from "@/components/sections/LoaderComponent.vue";
import {ArrowRight} from "lucide-vue-next";
</script>

<script>
import {defineComponent} from "vue";
import axiosClient from "@/axios";

export default defineComponent({
    name: 'SkillsSection',
    data() {
        return {
            projects: [],
        }
    },
    mounted() {
        axiosClient.get(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_PROJECTS_ID}?meta=false`).then((response) => {
            this.projects = response.data;
        }).catch((error) => console.log(error));
    }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

#projects {
    gap: 15px;
    padding-right: 0;

    > p {
        margin: 0 10vw 0 0;
    }

    .ct_card {
        gap: 20px;
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
                gap: 5px;
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

@media (max-width: $mobile-width) {
    #projects {
        padding-right: 3vw;

        .ct_card {
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