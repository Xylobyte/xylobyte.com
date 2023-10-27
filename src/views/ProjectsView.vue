<template>
    <div class="base_ct flex column a-center">
        <SearchBarComponent v-motion-slide-top :delay="800" @search-changed="search"/>

        <div class="projects_list p-relative">
            <ProjectCardComponent v-for="project in projects" :id="project.id" :key="project.id" :description="project.shortDescription"
                                  :image="project.logo" :isProjectPage="true" :tags="project.skills.slice(0, 3)" :title="project.name"/>

            <Transition>
                <div v-if="projects.length === 0" class="loader flex j-center">
                    <LoaderComponent/>
                </div>
            </Transition>
        </div>

        <RouterView v-slot="{ Component }">
            <Transition>
                <Component :is="Component"/>
            </Transition>
        </RouterView>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import axiosClient from "@/axios";
import SearchBarComponent from "@/components/sections/projects/SearchBarComponent.vue";
import ProjectCardComponent from "@/components/sections/projects/ProjectCardComponent.vue";
import LoaderComponent from "@/components/sections/LoaderComponent.vue";

export default defineComponent({
    name: 'ProjectsView',
    components: {LoaderComponent, ProjectCardComponent, SearchBarComponent},
    data() {
        return {
            projects: [],
            allProjects: [],
        }
    },
    mounted() {
        axiosClient.get(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_PROJECTS_ID}?meta=false`).then((response) => {
            this.projects = response.data;
            this.allProjects = response.data;
        }).catch((error) => console.log(error));
    },
    created() {
        this.emitter.emit('pageLoaded', {name: 'projects'})
    },
    methods: {
        search(searchText) {
            this.projects = [];

            if (searchText !== '') {
                const searchResult = [];

                this.allProjects.forEach((project) => {
                    let allText = project.name + ' ' + project.description + ' ' + project.date + ' ';
                    project.skills.forEach((item) => allText += item.name + ' ');

                    if (allText.toLowerCase().includes(searchText.toLowerCase()))
                        searchResult.push(project);
                })

                this.projects = searchResult;
            } else this.projects = this.allProjects;
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

.base_ct {
    margin-top: 50px;
    min-height: 100vh;
    padding: 20px;
    gap: 40px;

    .loader {
        background: white;
        padding-top: 10vw;
    }

    .projects_list {
        gap: 40px 30px;
        max-width: 1500px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: $tablet-width) {
    .base_ct .projects_list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: $mobile-width) {
    .base_ct .projects_list {
        grid-template-columns: 1fr;
    }
}
</style>