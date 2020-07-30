<template>
    <div>
        <div v-show="NewProjectIsWhite === true && isAdminOrClient === false">
            <CircleProject />
        </div>
        <div v-show="NewProjectIsWhite === false && isAdminOrClient === false">
            <CircleProject2 />
        </div>
        <Preloader />
        <div class="preload_img"></div>
        <div
            :class="[
                NewProjectIsWhite
                    ? 'preload_background_white'
                    : 'preload_background_black'
            ]"
        ></div>
        <div :class="[isAdminOrClient ? 'classic' : 'viewport']">
            <div :class="[isAdminOrClient ? '' : 'scroll-container']">
                <div :class="[isAdminOrClient ? '' : 'content']">
                    <nuxt />
                </div>
            </div>
        </div>
        <div
            v-if="isAdminOrClient === true"
            :class="[dark ? 'theme-dark' : 'theme-light']"
            style="z-index:155; position: fixed; height:100vh;"
        >
            <v-app id="little_app">
                <NavAdmin></NavAdmin>
                <DarkToLight></DarkToLight>
            </v-app>
        </div>

        <RondBlanc v-if="isAdminOrClient === false" style="z-index:5" />
        <Notification style="z-index:10"></Notification>
        <ScrollToTop />
    </div>
</template>
<script>
import { TweenLite } from 'gsap/all'
import CircleProject from '../components/Circle'
import CircleProject2 from '../components/Circle2'
import RondBlanc from '../components/RondBlanc'
import Notification from '../components/Notification'
import Preloader from '../components/Preloader'
import { mapGetters, mapMutations } from 'vuex'
import NavAdmin from '../components/admin/NavAdmin'
import ScrollToTop from '../components/ScrollToTop'
import ls from 'local-storage'
export default {
    components: {
        ScrollToTop,
        Notification,
        NavAdmin,
        RondBlanc,
        Preloader,
        CircleProject,
        CircleProject2
    },
    data() {
        return {
            isAdminOrClient: false,
            html: '',
            body: '',
            scroller: {},
            requestId: null
        }
    },
    computed: {
        ...mapGetters({
            dark: 'dark',
            NewProjectIsWhite: 'NewProjectIsWhite',
            pageChange: 'pageChange',
            pageName: 'pageName',
            iscomputer: 'isComputer'
        })
    },

    watch: {
        pageChange() {
            setTimeout(() => {
                if (
                    this.$route.matched[0].path === '/admin' ||
                    this.$route.matched[0].path === '/cleint'
                ) {
                    this.isAdminOrClient = true
                    TweenLite.fromTo(
                        '.dark_to_light',
                        1,
                        {
                            display: 'none',
                            y: '10vh',
                            opacity: 0
                        },
                        {
                            display: 'block',
                            opacity: 1,
                            y: '0vh',
                            ease: 'sine.Out'
                        }
                    )
                } else {
                    this.isAdminOrClient = false
                    this.setPageName(this.$route.path)
                    var list = document.querySelector('.preload_img')
                    list.style.backgroundImage = "url('" + this.pageName + "')"
                    TweenLite.fromTo(
                        '.preload_img',
                        1,
                        {
                            y: '-100vh'
                        },
                        {
                            delay: 1.2,
                            y: '0vh',
                            ease: 'sine.Out'
                        }
                    )
                    if (this.NewProjectIsWhite === true) {
                        TweenLite.fromTo(
                            '.preload_background_white',
                            1,
                            {
                                height: '0vh'
                            },
                            {
                                height: '100vh',
                                ease: 'sine.Out',
                                delay: 2.2
                            }
                        )
                    } else {
                        TweenLite.fromTo(
                            '.preload_background_black',
                            1,
                            {
                                height: '0vh'
                            },
                            {
                                height: '100vh',
                                ease: 'sine.Out',
                                delay: 2.2
                            }
                        )
                    }
                }
            }, 0.1)
        },
        isAdminOrClient() {
            this.onLoad()
        }
    },
    created() {
        if (ls.get('user')) {
            let userData = ls.get('user')
            this.$store.commit('setUserData', userData)
        }
        if (
            this.$route.path === '/contact' ||
            this.$route.path === '/about' ||
            this.$route.path === '/login'
        ) {
            this.IsNotWhite()
        } else {
            this.IsWhite()
        }
    },
    mounted() {
        if (
            this.$route.matched[0].path === '/admin' ||
            this.$route.matched[0].path === '/cleint'
        ) {
            this.isAdminOrClient = true
        } else {
            this.isAdminOrClient = false
            window.addEventListener('resize', this.getWindowWidth)
            this.getWindowWidth()
            this.setPageName(this.$route.path)

            var list = document.querySelector('.preload_img')
            list.style.backgroundImage = "url('" + this.pageName + "')"
            TweenLite.fromTo(
                '.preload_img',
                1,
                {
                    y: '-100vh'
                },
                {
                    y: '0vh',
                    delay: 2.4,
                    ease: 'sine.Out'
                }
            )
            if (this.NewProjectIsWhite === true) {
                TweenLite.fromTo(
                    '.preload_background_white',
                    1,
                    {
                        height: '0vh'
                    },
                    {
                        height: '100vh',
                        ease: 'sine.Out',
                        delay: 3.4
                    }
                )
            } else {
                TweenLite.fromTo(
                    '.preload_background_black',
                    1,
                    {
                        height: '0vh'
                    },
                    {
                        height: '100vh',
                        ease: 'sine.Out',
                        delay: 3.4
                    }
                )
            }
            TweenLite.fromTo(
                '.about-issue',
                0.7,
                {
                    display: 'none',
                    opacity: 0
                },
                {
                    opacity: 1,
                    display: 'block',
                    ease: 'linear'
                }
            )

            TweenLite.set(this.scroller.target, {})
            this.html = document.documentElement
            this.body = document.body
            this.scroller = {
                target: document.querySelector('.scroll-container'),
                ease: 0.06,
                endY: 0,
                y: 0,
                resizeRequest: 1,
                scrollRequest: 0
            }
            this.requestId = null
            window.addEventListener('load', this.onLoad)
            this.$nextTick(this.onLoad())
        }
    },
    methods: {
        onLoad() {
            this.updateScroller()
            window.focus()
            window.addEventListener('resize', this.onResize)
            document.addEventListener('scroll', this.onScroll)
        },
        updateScroller() {
            if (this.isAdminOrClient === false) {
                let resized = this.scroller.resizeRequest > 0
                if (resized) {
                    var height = this.scroller.target.clientHeight
                    this.body.style.height = height + 150 + 'px'
                    this.scroller.resizeRequest = 0
                }
                var scrollY =
                    window.pageYOffset ||
                    this.html.scrollTop ||
                    this.body.scrollTop ||
                    0

                this.scroller.endY = scrollY
                this.scroller.y +=
                    (scrollY - this.scroller.y) * this.scroller.ease

                if (Math.abs(scrollY - this.scroller.y) < 0.05 || resized) {
                    this.scroller.y = scrollY
                    this.scroller.scrollRequest = 0
                }
                TweenLite.set(this.scroller.target, {
                    y: -this.scroller.y
                })
                this.requestId =
                    this.scroller.scrollRequest > 0
                        ? requestAnimationFrame(this.updateScroller)
                        : null
            }
        },
        onScroll() {
            this.scroller.scrollRequest++
            if (!this.requestId) {
                this.requestId = requestAnimationFrame(this.updateScroller)
            }
        },

        onResize() {
            this.scroller.resizeRequest++
            if (!this.requestId) {
                this.requestId = requestAnimationFrame(this.updateScroller)
            }
        },
        ...mapMutations({
            getWindowWidth: 'getWindowWidth',
            IsWhite: 'IsWhite',
            IsNotWhite: 'IsNotWhite',
            setPageName: 'setPageName'
        })
    }
}
</script>
<style lang="scss">
.preload_img {
    position: fixed;
    width: 100vw;
    height: 100vh;
    transform: translateY(-100vh);
    background-position: 0% 25%;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
}
.preload_background_black {
    position: fixed;
    width: 100vw;
    height: 0;
    z-index: 2;
    background-color: #121212;
}
.preload_background_white {
    position: fixed;
    width: 100vw;
    height: 0;
    z-index: 2;
    background-color: #fcf9f5;
}
.viewport {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
}
.classic {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
}
.content {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.scroll-container {
    width: 100%;
    position: absolute;
    height: auto;
    z-index: 10;
    display: flex;
    justify-content: center;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}
.fade-enter {
    opacity: 0;
    top: -15vh;
}
.fade-enter-active {
    transition: 1.5s;
}
.fade-enter-to {
    opacity: 1;
    top: 0vh;
}
</style>
