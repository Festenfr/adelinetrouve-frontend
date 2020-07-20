<template>
    <div v-show="loader">
        <client-only>
            <div class="preloader ">
                <LogoAd />
                <div class="titre">
                    <h1 class="titre_preload">A</h1>
                    <h1 class="titre_preload">d</h1>
                    <h1 class="titre_preload">e</h1>
                    <h1 class="titre_preload">l</h1>
                    <h1 class="titre_preload">i</h1>
                    <h1 class="titre_preload">n</h1>
                    <h1 class="titre_preload" style="margin-right:10px">e</h1>
                    <h1 class="titre_preload">t</h1>
                    <h1 class="titre_preload">r</h1>
                    <h1 class="titre_preload">o</h1>
                    <h1 class="titre_preload">u</h1>
                    <h1 class="titre_preload">v</h1>
                    <h1 class="titre_preload" style="margin-right:10px">é</h1>
                    <h1 class="titre_preload">d</h1>
                    <h1 class="titre_preload">e</h1>
                    <h1 class="titre_preload">s</h1>
                    <h1 class="titre_preload">i</h1>
                    <h1 class="titre_preload">g</h1>
                    <h1 class="titre_preload">n</h1>
                    <h1 class="titre_preload">e</h1>
                    <h1 class="titre_preload" style="margin-right:10px">r</h1>
                    <h1 class="titre_preload">d</h1>
                    <h1 class="titre_preload">'</h1>
                    <h1 class="titre_preload">i</h1>
                    <h1 class="titre_preload">n</h1>
                    <h1 class="titre_preload">t</h1>
                    <h1 class="titre_preload">é</h1>
                    <h1 class="titre_preload">r</h1>
                    <h1 class="titre_preload">i</h1>
                    <h1 class="titre_preload">e</h1>
                    <h1 class="titre_preload">u</h1>
                    <h1 class="titre_preload">r</h1>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script>
import LogoAd from '../components/Logo'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        LogoAd
    },
    computed: {
        ...mapGetters({
            loader: 'loader'
        })
    },
    mounted() {
        if (this.loader) this.LoaderToggle()
    },
    methods: {
        ...mapMutations({
            LoaderToggle: 'LoaderToggle'
        })
    }
}
</script>

<style lang="scss" scoped>
.preloader {
    position: fixed;
    width: 100vw;
    display: flex;
    justify-content: center;
    height: 100vh;
    background-color: #121212;
    z-index: 9999;
}
.titre {
    position: absolute;
    color: white;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    top: 80vh;
    text-align: center;
    display: flex;
}
h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 1vw;
    line-height: normal;
    letter-spacing: 0;
    letter-spacing: 0.125vw;
    line-height: 1.875vw;
    text-transform: uppercase;
    transition: opacity 0.2s ease;
    opacity: 0;
}
</style>
