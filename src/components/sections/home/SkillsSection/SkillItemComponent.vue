<template>
    <span v-if="type === 'hard'" class="jura hard f-medium">{{ text }}</span>
    <li v-else-if="type === 'soft'" class="jura f-medium">{{ text }}</li>
    <div v-else class="language flex column">
        <span class="jura f-medium">{{ text }}</span>
        <span class="jura level f-small">{{ level }}</span>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "SkillItemComponent",
    props: {
        text: String,
        type: String,
        level: {
            type: String,
            default: 'Niveau B1'
        }
    }
})
</script>

<style lang="scss" scoped>
.hard {
    background-color: var(--dark-background-color);
    color: white;
    padding: 3px 15px;
    border-radius: 50px;
}

.language {
    background-color: var(--dark-background-color);
    gap: 2px;
    padding: 8px;
    border-radius: var(--main-border-radius);
    width: 48%;

    span {
        color: white;

        &.level {
            color: #ececec;
        }
    }
}
</style>