<template>
    <nuxt-link to="/contact" class="about-issue">
        <div class="pen">
            <Pen />
        </div>
        <div class="circle">
            <span>C</span>
            <span>R</span>
            <span>E</span>
            <span>O</span>
            <span>N</span>
            <span>S</span>
            <span></span>
            <span>-</span>
            <span></span>
            <span>V</span>
            <span>O</span>
            <span>T</span>
            <span>R</span>
            <span>E</span>
            <span></span>
            <span>-</span>
            <span></span>
            <span>P</span>
            <span>R</span>
            <span>O</span>
            <span>J</span>
            <span>E</span>
            <span>T</span>
            <span></span>
            <span>-</span>
            <span></span>
        </div>
    </nuxt-link>
</template>
<script>
import { TweenMax } from 'gsap/all'
import Pen from '../components/Pen'
import { mapGetters } from 'vuex'
export default {
    components: {
        Pen
    },
    computed: {
        ...mapGetters({
            NewProjectIsWhite: 'NewProjectIsWhite'
        })
    },
    mounted() {
        TweenMax.fromTo(
            '.about-issue',
            4,
            {
                visibility: 'visible',
                opacity: 0
            },
            {
                opacity: 1,
                ease: 'linear'
            }
        )
        TweenMax.to('.circle', 40, {
            rotation: 360,
            ease: 'linear'
        }).repeat(-1)
    }
}
</script>
<style lang="scss" scoped>
.about-issue {
    visibility: hidden;
    position: fixed;
    bottom: 20px;
    left: 40px;
    z-index: 15;
    .pen {
        position: fixed;
        width: 6.375vw;
        height: 6.375vw;
        display: flex;
        align-items: center;
    }
    .circle {
        width: 6.375vw;
        height: 6.375vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
@for $i from 1 through 26 {
    span:nth-child(#{$i}) {
        transform: rotate(14deg * $i);
    }
}
span {
    font-family: 'Playfair Display', serif;
    font-size: 0.625vw;
    color: black;
    line-height: normal;
    letter-spacing: 0;
    text-transform: uppercase;
    position: absolute;
    height: 2.7vw;
    width: 0.156vw;
    left: 2.97vw;
    top: 0.35vw;
    -webkit-transform-origin: bottom center;
    transform-origin: bottom center;
}
</style>
