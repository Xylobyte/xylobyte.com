<template>
    <div class="title-wrapper flex row a-center">
        <h2 class="f-big chakra-petch">{{ title }}</h2>
        <hr>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: 'SectionTitle',
    props: {
        title: {
            type: String
        }
    }
})
</script>

<style lang="scss" scoped>
h2 {
    white-space: nowrap;
}

hr {
    width: 25vw;
    border: none;
    border-top: black dashed 4px;
    margin-left: 15px;
}
</style>