<template>
    <transition-group
        tag="div"
        name="fade"
        class="container_snackbar"
        :class="[dark ? 'theme-dark' : 'theme-light']"
    >
        <div
            v-for="message in messages"
            :key="message.info"
            :class="[message.error ? 'snackbar_error' : 'snackbar_sucess']"
        >
            {{ message.info }}
        </div>
    </transition-group>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            message: 'message',
            messages: 'messages',
            error: 'error',
            snackbar: 'snackbar',
            dark: 'dark'
        })
    },
    watch: {
        message(val) {
            if (val) {
                this.newNotification()
            }
        }
    },
    methods: {
        ...mapMutations({
            newNotification: 'newNotification'
        })
    }
}
</script>
<style lang="scss">
.container_snackbar {
    z-index: 10;
    pointer-events: none;
    position: fixed;
    width: 100%;
    bottom: 20px;
    min-height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.snackbar_sucess {
    cursor: pointer;
    z-index: 10;
    position: relative;
    background-color: var(--color-sucess);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px 5px 5px 5px;
    min-height: 30px;
    max-width: 50%;
}
.snackbar_error {
    margin-bottom: 10px;
    cursor: pointer;
    transition: 0.5s;
    z-index: 10;
    position: relative;
    background-color: var(--color-error);
    padding: 20px;
    border-radius: 5px 5px 5px 5px;
    min-height: 30px;
    max-width: 50%;
    transition: 0.5s ease;
}
.fade-enter {
    opacity: 0;
    transform: translateY(100px);
}
.fade-enter-active {
    transition: all 1s cubic-bezier(0.45, 1.59, 0.55, 1.01);
}
.fade-enter-to {
    opacity: 1;
    transform: translateY(0px);
}
.fade-leave {
    opacity: 1;
    transform: translateY(0px);
}
.fade-leave-active {
    transition: all 1s cubic-bezier(0.45, 1.59, 0.55, 1.01);
}
.fade-leave-to {
    opacity: 0;
    transform: translateY(60px);
}
</style>
