<template>
    <div>
        <div class="preload_img"></div>
        <div class="preload_background"></div>
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
    components: {
        StepByStep
    },
    computed: {
        ...mapGetters({
            loader: 'loader'
        })
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
                scaleY: 1.5,
                ease: 'sine.Out',
                transformOrigin: '0px 0%'
            })
            TweenLite.fromTo(
                '.nav',
                0.6,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: 0,
                    y: 50,
                    ease: 'sine.Out',
                    delay: 0.2,
                    onComplete: done
                }
            )
        }
    },
    mounted() {
        this.IsNotWhite()

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
                '.contact-image',
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
                0.6,
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
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleY: 0,
                skewY: '-=20',
                ease: 'sine.Out',
                transformOrigin: '0px 150%',
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
        body.style.height = this.$refs.contact.clientHeight + 'px'
        setTimeout(() => {
            body.style.backgroundColor = '#121212'
        }, 1200)
    },
    methods: {
        ...mapMutations({
            IsNotWhite: 'IsNotWhite'
        })
    }
}
</script>

<style lang="scss" scoped>
.preload_img {
    position: fixed;
    width: 100vw;
    height: 0vh;
    background-image: url('https://adeona.s3.eu-west-3.amazonaws.com/APropos/Adeline.jpg');
    background-position: 0% 25%; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    z-index: 1;
}
.preload_background {
    position: fixed;
    width: 100vw;
    height: 0vh;
    background-color: #121212;
    z-index: 2;
}
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
