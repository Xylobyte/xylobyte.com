<template>
    <div>
        <HeadTitleSection/>

        <div class="flex row">
            <NavigationDrawerComponent/>

            <div class="content flex column">
                <PresentationSection/>

                <SkillsSection/>

                <ProjectsSection/>

                <AboutSection/>

                <ContactSection/>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import HeadTitleSection from "@/components/sections/home/HeadTitleSection.vue";
import NavigationDrawerComponent from "@/components/sections/home/Drawer/NavigationDrawerComponent.vue";
import PresentationSection from "@/components/sections/home/PresentationSection.vue";
import SkillsSection from "@/components/sections/home/SkillsSection/SkillsSection.vue";
import ProjectsSection from "@/components/sections/home/ProjectsSection.vue";
import AboutSection from "@/components/sections/home/AboutSection.vue";
import ContactSection from "@/components/sections/home/ContactSection.vue";

export default defineComponent({
    name: 'HomeView',
    components: {ContactSection, AboutSection, ProjectsSection, SkillsSection, PresentationSection, NavigationDrawerComponent, HeadTitleSection},
    created() {
        this.emitter.emit('pageLoaded', {name: 'home'})
    },
    mounted() {
        setTimeout(() => {
            if (this.$route.hash !== '')
                document.getElementById(this.$route.hash.slice(1)).scrollIntoView({
                    behavior: 'smooth'
                });
        }, 500);
    }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

.content {
    width: calc(100% - 310px);

    &::v-deep(section) {
        padding: 80px 4vw 2.5vw 3vw;
    }
}

@media (max-width: $tablet-width) {
    .content {
        width: calc(100% - 80px);
    }
}

@media (max-width: $mobile-width) {
    .content {
        width: 100%;
    }
}
</style>