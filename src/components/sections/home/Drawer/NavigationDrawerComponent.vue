<template>
    <aside :class="drawerOpen ? 'open' : ''" class="transition-all">
        <hr>
        <div class="flex column j-space-between">
            <NavSectionItem :current-section="currentSection" :icon="User" name="Présentation" targetId="presentation"
                            @click="closeDrawer()"/>
            <NavSectionItem :current-section="currentSection" :icon="ListChecks" name="Compétences" targetId="skills"
                            @click="closeDrawer()"/>
            <NavSectionItem :current-section="currentSection" :icon="FolderTree" name="Projets récents" targetId="projects"
                            @click="closeDrawer()"/>
            <NavSectionItem :current-section="currentSection" :icon="BadgeInfo" name="À propos" targetId="about"
                            @click="closeDrawer()"/>
            <NavSectionItem :current-section="currentSection" :icon="Mail" name="Contact" targetId="contact"
                            @click="closeDrawer()"/>
        </div>
    </aside>
    <div class="container transition-all" @click="closeDrawer()"></div>
</template>

<script setup>
import {User, ListChecks, FolderTree, BadgeInfo, Mail} from "lucide-vue-next";
</script>

<script>
import {defineComponent} from 'vue'
import NavSectionItem from "@/components/sections/home/Drawer/NavSectionItem.vue";

export default defineComponent({
    name: "NavigationDrawerComponent",
    components: {NavSectionItem},
    data() {
        return {
            currentSection: 'presentation',
            drawerOpen: false
        }
    },
    methods: {
        detectHalfwayScroll() {
            const sections = document.querySelectorAll("section");

            sections.forEach((section) => {
                const title = section.querySelector("h2");
                const titlePosition = title.getBoundingClientRect().top;
                const halfViewportHeight = window.innerHeight / 1.5;

                if (titlePosition <= halfViewportHeight) {
                    this.currentSection = section.id
                }
            });
        },

        throttle(func, limit) {
            let inThrottle;
            return function () {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => (inThrottle = false), limit);
                }
            };
        },

        toggleDrawer() {
            document.querySelector('body').classList.toggle('drawer-open');
            this.drawerOpen = !this.drawerOpen;
        },

        closeDrawer() {
            document.querySelector('body').classList.remove('drawer-open');
            this.drawerOpen = false
        }
    },
    created() {
        this.emitter.on('toggleDrawer', this.toggleDrawer);
    },
    mounted() {
        window.addEventListener("scroll", this.throttle(this.detectHalfwayScroll, 150));
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.throttle(this.detectHalfwayScroll, 150));
    }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

.container {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.25);
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
}

aside {
    height: 100vh;
    min-width: 330px;
    background-color: #E2E2E2;
    position: sticky;
    top: 0;
    z-index: 3;

    hr {
        z-index: -1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 60px;
        border: none;
        border-left: var(--dark-background-color) solid 1px;
    }

    > div {
        height: min(800px, 100%);
        padding: 80px 60px 40px 40px;
    }
}

@media (max-width: $tablet-width) and (min-width: $mobile-width + 1px) {
    aside {
        min-width: unset;

        hr {
            left: 40px;
        }

        > div {
            padding: 80px 20px 40px 20px;
        }
    }
}

@media (max-width: $mobile-width) {
    aside.open + div.container {
        opacity: 1;
        pointer-events: all;
    }

    aside {
        position: fixed;
        min-width: unset;
        transform: translateX(-300px);
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

        &.open {
            opacity: 1;
            pointer-events: all;
            transform: translateX(0);
        }
    }
}
</style>