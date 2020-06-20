<template>
    <div>
        <CircleProject v-if="NewProjectIsWhite === true" />
        <CircleProject2 v-if="NewProjectIsWhite === false" />
        <Preloader />
        <div class="viewport cursor_rond">
            <div id="scroll-container" class="scroll-container">
                <div class="content">
                    <nuxt />
                </div>
            </div>
        </div>
        <RondBlanc />

        <Notification></Notification>
    </div>
</template>
<script>
import { TweenLite } from 'gsap/all'
import CircleProject from '../components/Circle'
import CircleProject2 from '../components/Circle2'
import RondBlanc from '../components/RondBlanc'
import Notification from '../components/Notification'
import Preloader from '../components/Preloader'
import { mapGetters } from 'vuex'
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
            NewProjectIsWhite: 'NewProjectIsWhite'
        })
    },
    mounted() {
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
    }
}
</script>
<style lang="scss">
.viewport {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
