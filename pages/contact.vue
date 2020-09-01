<template>
    <div>
        <div ref="contact">
            <NavWhite />
            <div class="contact-wrapper">
                <StepByStep />
            </div>
        </div>
    </div>
</template>

<script>
import StepByStep from '../components/contact/StepByStep'
import Cursor from '../modules/cursor'
import { TweenLite } from 'gsap/all'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'Contact',
    components: {
        StepByStep
    },
    computed: {
        ...mapGetters({
            loader: 'loader'
        })
    },
    mounted() {
        this.IsNotWhite()

        function enterPage() {
            TweenLite.fromTo(
                '.contact-nav',
                0.8,
                {
                    opacity: '0',
                    y: -20
                },
                {
                    opacity: 1,
                    y: 0,
                    delay: 2,
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.contact-image',
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
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleY: 0,
                ease: 'sine.Out',
                transformOrigin: '0px 100%',
                delay: 1.2
            })
            TweenLite.fromTo(
                '.contact-image',
                0.6,
                {
                    opacity: 0,
                    y: -50
                },
                {
                    opacity: 1,
                    y: 0,
                    ease: 'sine.Out',
                    delay: 1.4
                }
            )
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
        }
        if (this.loader === false) enterPage()
        if (this.loader === true) {
            setTimeout(() => {
                enterPage()
            }, 2400)
        }

        const cursor = new Cursor(document.querySelector('.cursor'))
        ;[...document.querySelectorAll('a')].forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.emit('enter'))
            el.addEventListener('mouseleave', () => cursor.emit('leave'))
        })
        ;[...document.querySelectorAll('.contact-issue')].forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.emit('enter'))
            el.addEventListener('mouseleave', () => cursor.emit('leave'))
        })
        let body = document.body
        body.style.height = 100 + 'vh'
        setTimeout(() => {
            body.style.height = this.$refs.contact.clientHeight + 'px'
            body.style.backgroundColor = '#121212'
        }, 1300)
    },
    methods: {
        ...mapMutations({
            IsNotWhite: 'IsNotWhite'
        })
    },

    head() {
        return {
            name: 'Contact adeline trouvé',
            meta: [
                {
                    hid: 'Contact',
                    name: 'description',
                    content: `Soumettez votre projet de rénovation ou décoration pour votre espace intérieur`
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
                '.contact-image',
                0.6,
                {
                    opacity: 1,
                    y: 0
                },
                {
                    opacity: 0,
                    y: 50,
                    ease: 'sine.Out',
                    delay: 0.2
                }
            )
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleY: 1,
                ease: 'sine.Out',
                transformOrigin: '0px 0%'
            })
            TweenLite.fromTo(
                '.nav',
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: 0,
                    y: 50,
                    ease: 'sine.Out',
                    delay: 0.4,
                    onComplete: done
                }
            )
            TweenLite.fromTo(
                '.contact-nav',
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: 0,
                    y: 20,
                    ease: 'sine.Out',
                    delay: 0.4
                }
            )
            TweenLite.fromTo(
                '.about-issue',
                0.7,
                {
                    opacity: '1'
                },
                {
                    delay: 0.4,
                    opacity: 0,
                    ease: 'linear'
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
.contact-wrapper {
    padding: 10.313vw 8vw 0;
    margin: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    z-index: 3;
}
</style>
