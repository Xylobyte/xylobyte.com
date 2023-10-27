<template>
    <svg class="arrows only-desktop">
        <path class="a1" d="M0 0 L30 32 L60 0"></path>
        <path class="a2" d="M0 20 L30 52 L60 20"></path>
        <path class="a3" d="M0 40 L30 72 L60 40"></path>
    </svg>
</template>

<style lang="scss" scoped>
.arrows {
    width: 60px;
    height: 80px;

    path {
        stroke: white;
        stroke-width: 2px;
        fill: transparent;
        animation: arrow 2s infinite;

        &.a1 {
            animation-delay: -1s;
        }

        &.a2 {
            animation-delay: -0.5s;
        }

        &.a3 {
            animation-delay: 0s;
        }
    }
}

@keyframes arrow {
    0% {
        opacity: 0
    }
    40% {
        opacity: 1
    }
    80% {
        opacity: 0
    }
    100% {
        opacity: 0
    }
}
</style>