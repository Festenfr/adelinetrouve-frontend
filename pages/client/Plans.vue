<template>
    <div></div>
</template>
<script>
import { gsap, Power3 } from 'gsap/all'
export default {
    transition: {
        css: false,
        mode: 'out-in',
        enter(el, done) {
            const form = document.querySelector('.container_form')
            gsap.from(form, 0.4, {
                opacity: 0,
                scale: 0.7,
                // eslint-disable-next-line no-undef
                ease: Power3.easeOut,
                onComplete: done
            })
            done()
        },
        leave(el, done) {
            const form = document.querySelector('.container_form')
            gsap.to(form, 0.4, {
                opacity: 0,
                scale: 0.7,
                // eslint-disable-next-line no-undef
                ease: Power3.easeOut,
                onComplete: done
            })
        }
    }
}
</script>
