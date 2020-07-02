<template>
    <div>
        <ErrorMessage v-if="errorMessage">
            {{ fetchMessage }}
        </ErrorMessage>
    </div>
</template>
<script>
import { gsap } from 'gsap/all'
import { mapActions, mapGetters } from 'vuex'
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
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            user: 'user',
            users: 'dashboard/users',
            fetchMessage: 'dashboard/message',
            errorMessage: 'dashboard/error'
        })
    },
    created() {
        this.fetchUsers()
    },
    methods: {
        ...mapActions({
            fetchUsers: 'dashboard/fetchUsers'
        })
    }
}
</script>
