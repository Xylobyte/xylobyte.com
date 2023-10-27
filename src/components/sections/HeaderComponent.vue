<template>
    <nav :class="scroll ? 'scroll' : ''" class="flex transition-all">
        <div class="head-title flex a-center overflow-hidden">
            <Menu v-if="isHome" class="only-mobile transition-transform" color="white" size="25" @click="emitter.emit('toggleDrawer')"/>
            <h1 class="big-title only-desktop transition-all">Nantsa Montillet</h1>
        </div>

        <ul class="flex row p-absolute transition-all">
            <li class="flex a-center">
                <RouterLink class="f-medium chakra-petch transition-all" to="/" @click="scrollToTop()">
                    Accueil
                </RouterLink>
            </li>
            <li class="flex a-center">
                <RouterLink class="f-medium chakra-petch transition-all" to="/projects" @click="scrollToTop()">
                    Projets
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import {Menu} from 'lucide-vue-next';
</script>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'HeaderComponent',
    data: () => ({
        scroll: false,
        isHome: true
    }),
    methods: {
        handleScroll() {
            this.scroll = window.scrollY > 500
        },

        scrollToTop() {
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    },
    created() {
        this.emitter.on('pageLoaded', (evt) => {
            if (evt.name === 'projects') {
                window.removeEventListener('scroll', this.handleScroll)
                this.scroll = true
                this.isHome = false
            } else {
                window.addEventListener('scroll', this.handleScroll)
                this.scroll = false
                this.isHome = true
            }
        })
    }
})
</script>

<style lang="scss" scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    height: 50px;
    z-index: 10;

    &.scroll {
        background-color: var(--dark-background-color);

        .head-title {
            svg, h1 {
                transform: translate(0, 0);
            }

            svg {
                cursor: pointer;
                border-radius: 50%;

                &:hover {
                    background-color: rgba(128, 128, 128, 0.5);
                }
            }

            h1 {
                opacity: 1;
            }
        }

        ul {
            transform: translateX(0);
            right: 20px;
        }
    }
}

.head-title {
    padding-left: 20px;

    svg {
        color: white;
        transform: translateX(-50px);
    }

    h1 {
        transform: translateY(40px);
        opacity: 0;
    }
}

ul {
    gap: 20px;
    top: 0;
    bottom: 0;
    right: 50%;
    transform: translateX(50%);

    a {
        color: var(--light-background-color);
        border: 1px solid var(--light-background-color);
        border-radius: var(--main-border-radius);
        padding: 3px 30px;

        &:hover {
            transform: translateY(-2px);
        }

        &.router-link-active {
            color: white;
            border-color: var(--dark-primary-color);
            background-color: var(--dark-primary-color);
        }
    }
}
</style>