<template>
    <v-app :class="[dark ? 'theme-dark' : 'theme-light']" style="z-index: 5;">
        <div :class="[isOpen ? 'contenu_admin_little' : 'contenu_admin_big']">
            <nuxt-child />
        </div>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import { TweenLite } from 'gsap'
export default {
    middleware: 'authenticated',

    data() {
        return {}
    },
    transition: {
        css: false,
        mode: 'out-in',
        enter(el, done) {
            TweenLite.fromTo(
                '.theme-dark',
                1,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.theme-light',
                1,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.nav_admin',
                0.2,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.container_nav_open',
                1,
                {
                    x: '-20vw',
                    display: 'none'
                },
                {
                    x: '0vw',
                    display: 'flex',
                    ease: 'linear',
                    onComplete: done
                }
            )
        },
        leave(el, done) {
            TweenLite.fromTo(
                '.container_nav_open',
                0.5,
                {
                    display: 'flex',
                    x: '0vw'
                },
                {
                    display: 'none',
                    x: '-20vw',
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.theme-dark',
                1,
                {
                    opacity: 1
                },
                {
                    opacity: 0,
                    ease: 'linear',
                    onComplete: done
                }
            )
            TweenLite.fromTo(
                '.nav_admin',
                1,
                {
                    opacity: 1
                },
                {
                    opacity: 0,
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.theme-light',
                1,
                {
                    opacity: 1
                },
                {
                    opacity: 0,
                    ease: 'linear'
                }
            )
        }
    },
    computed: {
        ...mapGetters({
            dark: 'dark',
            isOpen: 'isOpen'
        })
    },
    mounted() {
        let body = document.body
        body.style.height = 'auto'
    }
}
</script>
<style lang="scss" scoped>
.contenu_admin_little {
    position: relative;
    width: 60vw;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    transform: translateX(30vw);
    transition: 0.5s ease-in-out;
}
.contenu_admin_big {
    width: 80vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    transform: translateX(10vw);
    transition: 0.5s ease-in-out;
}
</style>
