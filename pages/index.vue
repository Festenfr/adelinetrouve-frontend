<template>
    <div>
        <div class="preload_img" :data-image="preloadImage"></div>
        <div class="preload_background"></div>
        <div ref="accueil">
            <Nav />
            <Carousel />
            <AllProjects />
        </div>
    </div>
</template>
<script>
import '../directive/scroll'
import Carousel from '../components/Carousel'
import AllProjects from '../components/AllProjects'
import { TweenLite } from 'gsap/all'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        Carousel,
        AllProjects
    },
    transition: {
        css: false,
        mode: 'out-in',
        enter(el, done) {
            done()
        },
        leave(el, done) {
            TweenLite.fromTo(
                '.series-info',
                1,
                {
                    opacity: '1',
                    x: 0
                },
                {
                    opacity: '0',
                    x: 100,
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.slider-nav',
                1,
                {
                    opacity: '1',
                    x: 0
                },
                {
                    opacity: '0',
                    x: 50,
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.chevron-down',
                1,
                {
                    opacity: '1',
                    x: 0
                },
                {
                    opacity: '0',
                    x: 20,
                    ease: 'sine.Out',
                    onComplete: done
                }
            )
            TweenLite.fromTo(
                '.nav',
                0.6,
                {
                    opacity: '1',
                    x: 0
                },
                {
                    opacity: '0',
                    x: 50,
                    ease: 'sine.Out',
                    delay: 0.5,
                    onComplete: done
                }
            )
            TweenLite.fromTo(
                '.about-issue',
                1.2,
                {
                    opacity: '1'
                },
                {
                    opacity: 0,
                    ease: 'linear'
                }
            )
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleX: 1.5,
                skewX: '-=5',
                ease: 'sine.Out',
                transformOrigin: '0% 0%'
            })
            TweenLite.to('.image-mask2', 1.2, {
                visibility: 'visible',
                scaleX: 1.5,
                skewX: '-=5',
                ease: 'sine.Out',
                transformOrigin: '0% 0%',
                onComplete: done
            })
        }
    },
    data() {
        return {
            cursor: '',
            preloadImage:
                'https://adeona.s3.eu-west-3.amazonaws.com/Accueil/soleilarbrenoir.jpg'
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
        var list = document.querySelector('.preload_img')
        var url = list.getAttribute('data-image')
        list.style.backgroundImage = "url('" + url + "')"

        function enterPage() {
            TweenLite.fromTo(
                '.preload_img',
                0.5,
                {
                    height: '0vh'
                },
                {
                    height: '100vh',
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.preload_background',
                0.5,
                {
                    height: '0vh'
                },
                {
                    height: '100vh',
                    ease: 'sine.Out',
                    delay: 0.5
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
                    delay: 1
                }
            )
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
                    delay: 1
                }
            )

            TweenLite.fromTo(
                '.slider-nav',
                1,
                {
                    opacity: '0',
                    x: -50
                },
                {
                    opacity: '1',
                    x: 0,
                    ease: 'sine.Out',
                    delay: 1.2
                }
            )
            TweenLite.fromTo(
                '.chevron-down',
                1,
                {
                    opacity: '0',
                    x: -20
                },
                {
                    opacity: '1',
                    x: 0,
                    ease: 'sine.Out',
                    delay: 1.2
                }
            )
            TweenLite.fromTo(
                '.series-info',
                1,
                {
                    opacity: '0',
                    x: -100
                },
                {
                    opacity: '1',
                    x: 0,
                    ease: 'sine.Out',
                    delay: 1.2
                }
            )
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleX: 0,
                skewX: '-=10',
                ease: 'sine.Out',
                transformOrigin: '130% 0%',
                delay: 1.2
            })
            TweenLite.to('.image-mask2', 1.2, {
                visibility: 'visible',
                scaleX: 0,
                skewX: '-=10',
                ease: 'sine.Out',
                transformOrigin: '130% 0%',
                delay: 1.2
            })
            TweenLite.fromTo(
                '.about-issue',
                0.7,
                {
                    opacity: '0'
                },
                {
                    opacity: 1,
                    ease: 'linear',
                    delay: 1.2
                }
            )
        }
        if (this.loader === false) enterPage()
        if (this.loader === true) {
            setTimeout(() => {
                enterPage()
            }, 2400)
        }

        const body = window.document.body
        setTimeout(() => {
            body.style.backgroundColor = '#fcf9f5'
            body.style.height = this.$refs.accueil.clientHeight + 'px'
        }, 1200)
    },
    methods: {
        ...mapMutations({
            IsWhite: 'IsWhite',
            createCursor: 'createCursor'
        })
    }
}
</script>
<style lang="scss">
.preload_img {
    position: fixed;
    width: 100vw;
    height: 0vh;
    background-position: 0% 25%;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
}
.preload_background {
    position: fixed;
    width: 100vw;
    height: 0vh;
    background-color: #fcf9f5;
    z-index: 2;
}
</style>
