<template>
    <RouterLink :to="`/projects/${id}`" class="wrapper transition-transform">
        <div :class="isProjectPage ? '' : 'home-page'" class="card flex column p-relative transition-all">
            <div class="p-absolute head_card transition-transform"></div>

            <div class="head flex row a-center">
                <img :alt="'Logo ' + title" :src="image">
                <h3 class="chakra-petch f-large">{{ title }}</h3>
            </div>

            <p class="jura">{{ description }}</p>

            <div class="tags flex row wrap">
                <SkillItemComponent v-for="(tag, index) in tags" :key="index" :text="tag.name" type="hard"/>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import SkillItemComponent from "@/components/sections/home/SkillsSection/SkillItemComponent.vue";
</script>

<script>
export default {
    name: "ProjectCardComponent",
    props: {
        title: String,
        id: String,
        description: String,
        image: String,
        tags: Array,
        isProjectPage: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

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
    gap: 20px;
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

    .head {
        gap: 10px;
    }

    img {
        border-radius: 50px;
        width: calc(40px + 2vw);
        height: calc(40px + 2vw);
    }

    p {
        height: 100%;
    }

    .tags {
        gap: 5px;
    }
}

@media (max-width: $mobile-width) {
    .card {
        max-width: none;
        width: 100%;
    }
}
</style>