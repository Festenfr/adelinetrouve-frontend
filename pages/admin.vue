<template>
    <client-only>
        <v-app :class="[dark ? 'theme-dark' : 'theme-light']">
            <div
                :class="[
                    isOpen ? 'container_admin_little' : 'container_admin_big'
                ]"
            >
                <NavAdmin></NavAdmin>
                <DarkToLight></DarkToLight>

                <div
                    :class="[
                        isOpen ? 'contenu_admin_little' : 'contenu_admin_big'
                    ]"
                >
                    <nuxt-child />
                </div>
            </div>
        </v-app>
    </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
import NavAdmin from '../components/admin/NavAdmin'
export default {
    middleware: 'authenticated',
    components: {
        NavAdmin
    },
    data() {
        return {}
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
