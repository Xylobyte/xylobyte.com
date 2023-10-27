<template>
    <header ref="header" class="flex row a-center j-center p-relative overflow-hidden">
        <div class="bg p-absolute">
        </div>

        <div class="daily-dev only-desktop flex">
            <a ref="dailydev" :style="{transform: cardTransform, transition: 'transform 250ms ease-out'}" href="https://app.daily.dev/xylobyte">
                <img alt="Nantsa's Dev Card" height="546" src="@/assets/images/daily_dev.webp" width="400"/>
            </a>
        </div>

        <hr>

        <div class="info flex column j-center">
            <img alt="" height="300" src="@/assets/images/profil.webp" width="300">
            <h1 class="big-title">
                <span style="animation-delay: 1000ms">N</span>
                <span style="animation-delay: 1100ms">a</span>
                <span style="animation-delay: 1200ms">n</span>
                <span style="animation-delay: 1300ms">t</span>
                <span style="animation-delay: 1400ms">s</span>
                <span class="mr-right" style="animation-delay: 1500ms">a</span>
                <span style="animation-delay: 1600ms">M</span>
                <span style="animation-delay: 1700ms">o</span>
                <span style="animation-delay: 1800ms">n</span>
                <span style="animation-delay: 1900ms">t</span>
                <span style="animation-delay: 2000ms">i</span>
                <span style="animation-delay: 2100ms">l</span>
                <span style="animation-delay: 2200ms">l</span>
                <span style="animation-delay: 2300ms">e</span>
                <span style="animation-delay: 2400ms">t</span>
            </h1>
            <h2 class="jura f-large">Développeur Web - Full Stack</h2>

            <div class="btn-link flex row">
                <ButtonComponent :icon="Github" background-color="255, 255, 255" color="0, 0, 0" link="https://github.com/Xylobyte"
                                 text="GitHub"/>
                <ButtonComponent :icon="Linkedin" background-color="10, 101, 192" class="second" color="255, 255, 255"
                                 link="https://www.linkedin.com/in/nantsa-montillet" text="LinkedIn"/>
            </div>
        </div>

        <ScrollArrowsComponent class="p-absolute"/>
    </header>
</template>

<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import ScrollArrowsComponent from "@/components/ScrollArrowsComponent.vue";
import {ref, computed} from "vue";
import {useMouseInElement} from "@vueuse/core";
import {Github, Linkedin} from "lucide-vue-next";

const dailydev = ref(null);
const header = ref(null);

// Use mouse in element
const {elementX, elementY, isOutside, elementHeight, elementWidth} = useMouseInElement(header);

const cardTransform = computed(() => {
    const MAX_ROTATION = 30;

    const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2);
    const rY = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2);

    return isOutside.value ? '' : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

header {
    padding: 70px 10px;
    min-height: 100vh;
    gap: 4vw;
    background-color: black;

    .bg {
        background: url("@/assets/images/backgrounds/bgdark.webp") center;
        background-size: cover;
        width: 100%;
        height: 100%;
        opacity: 0;
        animation: bgMaskReveal 800ms ease-in-out forwards;
        animation-delay: 3000ms;
        mask: url("@/assets/images/masks/homemask.svg");
        -webkit-mask: url("@/assets/images/masks/homemask.svg");
        mask-position: center;
        -webkit-mask-position: center;
        mask-repeat: repeat;
        -webkit-mask-repeat: repeat;
        mask-size: var(--home-mask-size);
        -webkit-mask-size: var(--home-mask-size);
    }

    .daily-dev {
        width: 45%;
        z-index: 1;
        justify-content: right;
        opacity: 0;
        animation: slideLeft 800ms ease-in-out forwards;
        animation-delay: 2400ms;

        img {
            width: 360px;
            height: auto;
            box-shadow: var(--large-shadow);
        }
    }

    > hr {
        width: auto;
        height: 45vh;
        z-index: 1;
        border: none;
        border-left: white 2px solid;
    }

    .info {
        gap: 10px;
        width: 50%;

        img {
            width: min(160px, 35vw);
            height: auto;
            border-radius: 50%;
            border: 3px solid white;
            margin-bottom: 20px;
            opacity: 0;
            animation: slideRight 800ms ease-in-out forwards;
            animation-delay: 200ms;
        }

        h1 {
            font-size: min(50px, 9vw);

            span {
                opacity: 0;
                display: inline-block;
                animation: textReveal 800ms linear forwards;

                &.mr-right {
                    margin-right: 20px;
                }
            }
        }

        h2 {
            color: var(--light-background-color);
            opacity: 0;
            animation: slideRight 800ms ease-in-out forwards;
            animation-delay: 2800ms;
        }

        .btn-link {
            gap: 40px;
            margin-top: 40px;

            a {
                opacity: 0;
                animation: btnReveal 800ms ease-in-out forwards;
                animation-delay: 2900ms;

                &.second {
                    animation-delay: 3100ms;
                }
            }
        }
    }

    svg {
        bottom: 10px;
    }
}

@media (max-width: $tablet-width) {
    header .info {
        width: auto;
    }
}

@media (max-width: $mobile-width) {
    header .info .btn-link {
        gap: 20px;
    }
}

@keyframes slideRight {
    0% {
        transform: translateX(150px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideLeft {
    0% {
        transform: translateX(-150px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes bgMaskReveal {
    0% {
        opacity: 0;
        mask-size: var(--home-mask-size);
        -webkit-mask-size: var(--home-mask-size);
    }
    10% {
        opacity: 1;
    }
    100% {
        opacity: 1;
        mask-size: var(--home-mask-size-big);
        -webkit-mask-size: var(--home-mask-size-big);
    }
}

@keyframes textReveal {
    0% {
        opacity: 0;
        transform: translateX(100px) rotateY(90deg);
        filter: blur(10px);

    }
    100% {
        opacity: 1;
        transform: translateX(0) rotateY(0deg);
        filter: blur(0);
    }
}

@keyframes btnReveal {
    0% {
        transform: translateY(50px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>