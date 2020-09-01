<template>
    <div ref="accueil">
        <Nav />
        <Carousel />
        <AllProjects />
    </div>
</template>
<script>
import '../directive/scroll'
import Carousel from '../components/Carousel'
import AllProjects from '../components/AllProjects'
import { TweenLite } from 'gsap/all'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'Accueil',
    components: {
        Carousel,
        AllProjects
    },
    data() {
        return {
            cursor: ''
        }
    },
    computed: {
        ...mapGetters({
            loader: 'loader'
        })
    },

    mounted() {
        this.createCursor()
        this.IsWhite()

        function enterPage() {
            TweenLite.fromTo(
                '.about-issue',
                0.7,
                {
                    opacity: '0'
                },
                {
                    delay: 2.4,
                    opacity: 1,
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.image-transition-preload',
                0.2,
                {
                    opacity: '0'
                },
                {
                    opacity: '1',
                    ease: 'sine.Out',
                    delay: 2
                }
            )
            TweenLite.to('.image-mask', 0.5, {
                visibility: 'visible',
                scaleY: 0,
                ease: 'sine.Out',
                transformOrigin: '0% 80%',
                delay: 2
            })
            TweenLite.fromTo(
                '.nav',
                0.8,
                {
                    opacity: '0',
                    y: -50
                },
                {
                    opacity: '1',
                    y: 0,
                    ease: 'sine.Out',
                    delay: 1.8
                }
            )
            TweenLite.to('.image-mask2', 1.2, {
                visibility: 'visible',
                scaleY: 0,
                ease: 'sine.Out',
                transformOrigin: '0% 100%',
                delay: 2
            })
            TweenLite.to('.container2', 1.2, {
                opacity: 1,
                ease: 'sine.Out'
            })
            TweenLite.fromTo(
                '.slider-nav',
                0.5,
                {
                    opacity: '0',
                    y: -30
                },
                {
                    opacity: '1',
                    y: 0,
                    ease: 'sine.Out',
                    delay: 2.5
                }
            )
            TweenLite.fromTo(
                '.series-info',
                0.8,
                {
                    opacity: '0',
                    y: -40
                },
                {
                    opacity: '1',
                    y: 0,
                    ease: 'sine.Out',
                    delay: 2.7
                }
            )
            TweenLite.fromTo(
                '.chevron-down',
                0.8,
                {
                    opacity: '0',
                    y: -20
                },
                {
                    opacity: '1',
                    y: 0,
                    ease: 'sine.Out',
                    delay: 2.7
                }
            )
        }
        if (this.loader === false) enterPage()
        if (this.loader === true) {
            setTimeout(() => {
                enterPage()
            }, 2400)
        }

        const body = document.body
        body.style.height = 100 + 'vh'
        setTimeout(() => {
            body.style.height = this.$refs.accueil.clientHeight + 'px'
            body.style.backgroundColor = '#fcf9f5'
        }, 1300)
    },
    methods: {
        ...mapMutations({
            IsWhite: 'IsWhite',
            createCursor: 'createCursor'
        })
    },
    head() {
        return {
            title: 'Accueil Adeline trouvé',
            meta: [
                {
                    hid: 'Belletazar Perruche à collier',
                    name: 'description',
                    content: `Passioné et diplomé en architecture d'intérieur et design d'espace, adeline trouvé propose ses services de rénovations et de décorations pour particuliers et professionnels`
                }
            ]
        }
    },
    transition: {
        css: false,
        mode: 'out-in',
        enter(el, done) {
            done()
        },
        leave(el, done) {
            TweenLite.fromTo(
                '.about-issue',
                0.6,
                {
                    opacity: '1'
                },
                {
                    opacity: 0,
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.series-info',
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: '0',
                    y: 100,
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.slider-nav',
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: '0',
                    y: 50,
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.chevron-down',
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: '0',
                    y: 20,
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.nav',
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: '0',
                    y: 50,
                    ease: 'sine.Out',
                    delay: 0.4
                }
            )
            TweenLite.to('.image-mask', 0.5, {
                visibility: 'visible',
                scaleY: 1,
                ease: 'sine.Out',
                transformOrigin: '-1% -1%'
            })
            TweenLite.to('.image-mask2', 1.2, {
                visibility: 'visible',
                scaleY: 1,
                ease: 'sine.Out',
                transformOrigin: '-1% -1%',
                onComplete: done
            })
            TweenLite.to('.container2', 1.2, {
                visibility: 'visible',
                opacity: 0,
                ease: 'sine.Out'
            })
        }
    }
}
</script>
