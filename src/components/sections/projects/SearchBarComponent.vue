<template>
    <div class="p-relative">
        <input v-model="searchText" class="jura" placeholder="Rechercher un mot clé" type="text" @input="emitSearchSignal"/>
        <Transition>
            <div v-if="searchText !== ''" class="clear_icon p-absolute flex a-center" @click="clearSearch">
                <X size="24"/>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    name: "SearchBarComponent",
    emits: ["search-changed"],
    data() {
        return {
            searchText: "",
        };
    },
    methods: {
        emitSearchSignal() {
            this.$emit("search-changed", this.searchText);
        },
        clearSearch() {
            this.searchText = "";
            this.emitSearchSignal();
        }
    },
};
</script>

<script setup>
import {X} from 'lucide-vue-next';
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

input[type="text"] {
    width: 400px;
    padding: 5px 15px;
    border-radius: var(--small-border-radius);
    border: #676767 solid 2px;

    &:focus {
        outline: none;
        border: var(--dark-primary-color) solid 2px;
    }
}

.clear_icon {
    top: 0;
    bottom: 0;
    right: 5px;
    cursor: pointer;
}

@media (max-width: $mobile-width) {
    input[type="text"] {
        width: 60vw;
    }
}
</style>
