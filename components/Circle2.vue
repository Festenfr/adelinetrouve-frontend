<template>
    <nuxt-link to="/contact" class="about-issue">
        <div class="pen">
            <Pen />
        </div>
        <div class="circle">
            <span>C</span>
            <span>R</span>
            <span>E</span>
            <span>E</span>
            <span>R</span>
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
import Pen from '../components/Pen2'
export default {
    components: {
        Pen
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
        TweenMax.to('.circle', 60, {
            rotation: 360,
            ease: 'linear'
        }).repeat(-1)
    }
}
</script>
<style lang="scss" scoped>
.about-issue {
    position: fixed;
    bottom: 2vw;
    left: 2vw;
    z-index: 15;
    width: 10vw;
    height: 10vw;
    .pen {
        position: fixed;
        width: 10vw;
        height: 10vw;
        display: flex;
        align-items: center;
    }
    .circle {
        width: 10vw;
        height: 10vw;
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
    font-size: 0.8vw;
    color: white;
    line-height: normal;
    letter-spacing: 0;
    text-transform: uppercase;
    position: absolute;
    height: 4.5vw;
    width: 0.55vw;
    left: 4.8vw;
    top: 0.6vw;
    -webkit-transform-origin: bottom center;
    transform-origin: bottom center;
}
</style>
