<template>
    <div>
        <div class="dialog_wrapper flex j-center a-center p-relative">
            <div class="close-div p-absolute" @click="close()"></div>

            <div class="dialog flex row a-center p-relative">
                <div class="ct_img flex column a-center j-center">
                    <img v-if="projectInfo.length !== 0" :alt="projectInfo.shortDescription" :src="projectInfo.image">
                    <span class="jura f-medium">{{ projectInfo.date }}</span>
                </div>

                <div v-if="projectInfo.length !== 0" class="content flex column">
                    <h2 class="chakra-petch f-big">{{ projectInfo.name }}</h2>

                    <hr>

                    <p class="jura f-medium">{{ projectInfo.description }}</p>
                    <span v-if="projectInfo.link !== 'null'" class="jura f-medium bold">
                    Lien du projet :
                    <a :href="projectInfo.link" target="_blank">{{ projectInfo.link }}</a>
                </span>
                    <span v-if="projectInfo.linkOfCode !== 'null'" class="jura f-medium bold">
                    Lien du code :
                    <a :href="projectInfo.linkOfCode" target="_blank">{{ projectInfo.linkOfCode }}</a>
                </span>

                    <div class="ct_skills flex wrap">
                        <SkillItemComponent v-for="(tag, index) in projectInfo.skills" :key="index" :text="tag.name" type="hard"/>
                    </div>
                </div>

                <X class="close_icon p-absolute" size="30" @click="close()"/>

                <Transition>
                    <div v-if="projectInfo.length === 0" class="loader flex a-center j-center">
                        <LoaderComponent/>
                    </div>
                </Transition>
            </div>
        </div>

        <div class="wrapper-btn flex j-center">
            <button class="close_btn chakra-petch bold" @click="close()">Fermer</button>
        </div>
    </div>
</template>

<script>
import axiosClient from "@/axios";
import LoaderComponent from "@/components/sections/LoaderComponent.vue";
import SkillItemComponent from "@/components/sections/home/SkillsSection/SkillItemComponent.vue";

export default {
    name: "ProjectDetailsDialog",
    components: {SkillItemComponent, LoaderComponent},
    data() {
        return {
            projectInfo: []
        }
    },
    mounted() {
        axiosClient.get(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_PROJECTS_ID}?meta=false`).then((response) => {
            response.data.forEach((project) => {
                if (project.id === this.$route.params.id) {
                    this.projectInfo = project;
                }
            });
        }).catch((error) => console.log(error));
    },
    methods: {
        close() {
            this.$router.push('/projects');
        }
    }
}
</script>

<script setup>
import {X} from 'lucide-vue-next';
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

.dialog_wrapper {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    padding-top: 50px;
}

.dialog_wrapper, .close-div {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.close_btn {
    display: none;
}

.dialog {
    width: 70vw;
    min-height: 80vh;
    background: white;
    border-radius: var(--main-border-radius);
    z-index: 1;
    padding-right: 5vw;

    .close_icon {
        top: 3vh;
        right: 3vw;
        cursor: pointer;
    }

    .ct_img {
        transform: translateX(-15%);

        img {
            width: calc((100vh + 100vw) / 6);
            max-width: 500px;
            max-height: 70vh;
            border-radius: var(--main-border-radius);
            box-shadow: var(--medium-shadow);
            border: white solid 2px;
            background: white;
        }

        span {
            margin-top: 10px;
        }
    }

    .content {
        height: auto;
        gap: 15px;

        hr {
            border: none;
            border-top: black solid 2px;
            margin-right: 30%;
        }

        > p {
            margin-bottom: 10px;
        }

        a {
            color: var(--dark-primary-color);
            text-decoration: underline;
        }

        .ct_skills {
            gap: 5px;
            margin-top: 10px;
        }
    }

    .loader {
        background: white;
        border-radius: var(--main-border-radius);
    }
}

@media (max-width: $tablet-width) {
    .dialog {
        width: 90vw;
        flex-direction: column;
        padding: 0 15px 15px 15px;

        .ct_img {
            transform: translateX(0) translateY(-8%);

            img {
                width: auto;
                height: calc((100vh + 100vw) / 7);
            }
        }
    }
}

@media (max-width: $mobile-width) {
    .dialog_wrapper {
        height: 100vh;
        overflow-y: auto;
        align-items: start;
    }

    .dialog {
        box-shadow: none;
        width: 100vw;
        margin-top: 25px;
        gap: 10px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;

        .close_icon {
            display: none;
        }
    }

    .close_btn {
        display: block;
        padding: 5px 20px;
        background: var(--light-background-color);
        box-shadow: var(--medium-shadow);
        border-radius: 50px;
    }

    .wrapper-btn {
        bottom: 10px;
        left: 0;
        right: 0;
        position: fixed;
    }
}
</style>