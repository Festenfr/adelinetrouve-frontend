<template>
    <div class="dark_to_light">
        <v-btn fab small @click="darkToLight()">
            <v-icon v-if="dark" small>
                mdi-white-balance-sunny
            </v-icon>
            <v-icon v-else-if="!dark" small>
                mdi-moon-waning-crescent
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            dark: 'dark'
        })
    },
    methods: {
        ...mapMutations({
            darkToLight: 'darkToLight'
        })
    }
}
</script>

<style lang="scss">
.dark_to_light {
    display: none;
}
</style>
