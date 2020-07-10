<template>
    <div>
        <div v-show="NewProjectIsWhite === true">
            <CircleProject />
        </div>
        <div v-show="NewProjectIsWhite === false">
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
        <div class="viewport cursor_rond">
            <div id="scroll-container" class="scroll-container">
                <div class="content">
                    <nuxt />
                </div>
            </div>
        </div>
        <RondBlanc style="z-index:5" />
        <Notification style="z-index:10"></Notification>
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
import ls from 'local-storage'
export default {
    components: {
        Notification,
        RondBlanc,
        Preloader,
        CircleProject,
        CircleProject2
    },
    computed: {
        ...mapGetters({
            NewProjectIsWhite: 'NewProjectIsWhite',
            pageChange: 'pageChange',
            pageName: 'pageName'
        })
    },

    watch: {
        pageChange() {
            setTimeout(() => {
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
            }, 0.01)
        }
    },
    created() {
        if (ls.get('user')) {
            const userData = ls.get('user')
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

        var html = document.documentElement
        var body = document.body
        var scroller = {
            target: document.querySelector('#scroll-container'),
            ease: 0.06,
            endY: 0,
            y: 0,
            resizeRequest: 1,
            scrollRequest: 0
        }
        var requestId = null
        TweenLite.set(scroller.target, {})
        window.addEventListener('load', onLoad)
        function onLoad() {
            updateScroller()
            window.focus()
            window.addEventListener('resize', onResize)
            document.addEventListener('scroll', onScroll)
        }
        function updateScroller() {
            var resized = scroller.resizeRequest > 0
            if (resized) {
                var height = scroller.target.clientHeight
                body.style.height = height + 150 + 'px'
                scroller.resizeRequest = 0
            }
            var scrollY =
                window.pageYOffset || html.scrollTop || body.scrollTop || 0

            scroller.endY = scrollY
            scroller.y += (scrollY - scroller.y) * scroller.ease

            if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
                scroller.y = scrollY
                scroller.scrollRequest = 0
            }
            TweenLite.set(scroller.target, {
                y: -scroller.y
            })
            requestId =
                scroller.scrollRequest > 0
                    ? requestAnimationFrame(updateScroller)
                    : null
        }
        function onScroll() {
            scroller.scrollRequest++
            if (!requestId) {
                requestId = requestAnimationFrame(updateScroller)
            }
        }

        function onResize() {
            scroller.resizeRequest++
            if (!requestId) {
                requestId = requestAnimationFrame(updateScroller)
            }
        }
        this.$nextTick(onLoad())
    },
    methods: {
        ...mapMutations({
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
