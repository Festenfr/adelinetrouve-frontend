<template>
    <v-app :class="[dark ? 'theme-dark' : 'theme-light']" style="z-index: 5;">
        <div
            class="container_admin"
            :class="[isOpen ? 'container_admin_little' : 'container_admin_big']"
        >
            <NavAdmin></NavAdmin>
            <DarkToLight></DarkToLight>

            <div
                :class="[isOpen ? 'contenu_admin_little' : 'contenu_admin_big']"
            >
                <nuxt-child />
            </div>
        </div>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import NavAdmin from '../components/admin/NavAdmin'
import { TweenLite } from 'gsap'
export default {
    middleware: 'authenticated',
    components: {
        NavAdmin
    },
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
                '.container_nav_open',
                1,
                {
                    x: '-20vw'
                },
                {
                    x: '0vw',
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
                    x: '0vw'
                },
                {
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
    }
}
</script>
<style lang="scss" scoped>
.container_admin_little {
    position: relative;
    z-index: 0;
    background-color: var(--color-1);
    width: 100vw;
    min-height: 100vh;
    transition: 0.5s ease-in-out;
}
.container_admin_big {
    background-color: var(--color-1);
    z-index: 0;
    position: relative;
    width: 100vw;
    min-height: 100vh;
    transition: 0.5s ease-in-out;
}
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
