<template>
    <a :href="link" target="_blank">
        <button :style="cssVars" class="p-relative chakra-petch f-medium flex a-center">
            <component :is="icon" v-if="icon !== null" size="18"></component>
            {{ text }}
        </button>
    </a>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "ButtonComponent",
    props: {
        text: {
            type: String
        },
        link: {
            type: String,
            default: 'null'
        },
        icon: null,
        backgroundColor: {
            type: String,
        },
        color: {
            type: String
        }
    },
    computed: {
        cssVars() {
            return {
                '--btn-background-color': this.backgroundColor,
                '--btn-color': this.color
            }
        }
    }
})
</script>

<style lang="scss" scoped>
a {
    color: rgb(var(--btn-color));
}

button {
    background-color: rgb(var(--btn-background-color));
    color: rgb(var(--btn-color));
    border-radius: var(--small-border-radius);
    font-weight: 600;
    padding: 10px 30px;
    transition: all 200ms;

    &:hover {
        box-shadow: 0 0 15px rgba(var(--btn-background-color), 1);
    }

    &:active {
        box-shadow: 0 0 10px rgba(var(--btn-background-color), 0.6);
    }

    svg {
        margin-right: 8px;
    }
}
</style>