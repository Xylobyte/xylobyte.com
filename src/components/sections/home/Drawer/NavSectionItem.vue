<template>
    <a :class="currentSection === targetId ? 'active' : ''" :href="'#'+targetId" class="flex a-center chakra-petch f-large transition-all">
        <div class="transition-all flex a-center j-center">
            <component :is="icon" class="transition-all" size="20"></component>
        </div>
        <span class="transition-transform">{{ name }}</span>
    </a>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "NavSectionItem",
    props: {
        name: {
            type: String,
        },
        icon: null,
        targetId: {
            type: String
        },
        currentSection: {
            type: String,
            default: ''
        }
    }
})
</script>

<style lang="scss" scoped>
@use "@/assets/css/global_var.scss" as *;

a {
    color: var(--dark-background-color);

    &:hover span {
        transform: translateX(10px);
    }

    div {
        margin-right: 15px;
        height: 40px;
        width: 40px;
        background-color: #E2E2E2;
        border: var(--dark-background-color) solid 1px;
        border-radius: var(--small-border-radius);

        svg {
            color: var(--dark-background-color);
        }
    }

    &.active {
        color: var(--dark-primary-color);
        font-weight: 600;

        div {
            border: var(--dark-primary-color) solid 3px;
            border-radius: 50%;

            svg {
                color: var(--dark-primary-color);
            }
        }
    }
}

@media (max-width: $tablet-width) and (min-width: $mobile-width) {
    a {
        div {
            margin-right: 0;
        }

        span {
            display: none;
        }
    }
}
</style>