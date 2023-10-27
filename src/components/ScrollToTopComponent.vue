<template>
    <div :class="isTop ? 'top' : ''" class="scroll_top flex a-center j-center transition-all only-desktop" @click="scrollToTop()">
        <ArrowUpToLine class="transition-transform" size="25"/>
    </div>
</template>

<script>
export default {
    name: "ScrollToTopComponent",
    data() {
        return {
            isTop: true,
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo({top: 0, behavior: 'smooth'})
        },
        detectHalfwayScroll() {
            this.isTop = window.scrollY < 500
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
    },
    mounted() {
        window.addEventListener("scroll", this.throttle(this.detectHalfwayScroll, 150));
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.throttle(this.detectHalfwayScroll, 150));
    }
}
</script>

<script setup>
import {ArrowUpToLine} from "lucide-vue-next";
</script>

<style lang="scss" scoped>
.scroll_top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    height: auto;
    width: auto;
    background-color: var(--light-primary-color);
    padding: 10px 16px;
    border-radius: var(--small-border-radius);

    &.top {
        opacity: 0.2;
        pointer-events: none;
    }

    &:hover {
        box-shadow: var(--medium-shadow);
        background-color: var(--dark-primary-color);

        svg {
            transform: translatey(-5px);
        }
    }

    svg {
        color: var(--dark-background-color);
    }
}
</style>