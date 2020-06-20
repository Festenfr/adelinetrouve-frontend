<template>
    <transition :css="false" @enter="enter" @leave="leave">
        <div v-show="visible">
            <slot />
        </div>
    </transition>
</template>

<script>
import { TweenMax } from 'gsap/all'
import { mapGetters, mapMutations } from 'vuex'
export default {
    props: {
        index: { type: Number, default: 0 },
        direction: { type: String, default: '' }
    },
    computed: {
        ...mapGetters({
            animate: 'animate'
        }),
        visible() {
            return this.index === this.$parent.index
        }
    },
    methods: {
        ...mapMutations({
            isAnimate: 'isAnimate',
            animateIsEnd: 'animateIsEnd'
        }),
        enter(el, done) {
            if (this.direction === 'Right') {
                this.isAnimate()
                TweenMax.fromTo(
                    el,
                    1,
                    {
                        x: -100,
                        opacity: '0',
                        display: 'none'
                    },
                    {
                        x: 0,
                        delay: 1,
                        opacity: '1',
                        ease: 'power3.out',
                        display: 'flex',
                        onComplete: () => {
                            done()
                            this.animateIsEnd()
                        }
                    }
                )
            } else if (this.direction === 'Left') {
                this.isAnimate()
                TweenMax.fromTo(
                    el,
                    1,
                    {
                        x: 100,
                        opacity: '0',
                        display: 'none'
                    },
                    {
                        x: 0,
                        delay: 1,
                        opacity: '1',
                        ease: 'power3.out',
                        display: 'flex',
                        onComplete: () => {
                            done()
                            this.animateIsEnd()
                        }
                    }
                )
            }
        },
        leave(el, done) {
            if (this.direction === 'Right') {
                this.isAnimate()
                TweenMax.fromTo(
                    el,
                    1,
                    {
                        x: 0,
                        opacity: '1'
                    },
                    {
                        x: 100,
                        opacity: '0',
                        ease: 'power3.in',
                        onComplete: () => {
                            done()
                        }
                    }
                )
            }
            if (this.direction === 'Left') {
                this.isAnimate()
                TweenMax.fromTo(
                    el,
                    1,
                    {
                        x: 0,
                        opacity: '1'
                    },
                    {
                        x: -100,
                        opacity: '0',
                        ease: 'power3.in',
                        onComplete: () => {
                            done()
                        }
                    }
                )
            }
        }
    }
}
</script>

<style></style>
