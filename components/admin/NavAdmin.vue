<template>
    <div>
        <div
            :class="[isOpen ? 'position_hamb_open' : 'position_hamb_close']"
            @click="toggleMenu"
        >
            <div class="hamburger_top"></div>
            <div class="hamburger_bottom"></div>
        </div>
        <div :class="[isOpen ? 'container_nav_open' : 'container_nav_close']">
            <div class="contaiiner_logo">
                <img
                    v-if="dark"
                    style="height:10vh"
                    src="https://wesleydorsey.s3.eu-west-3.amazonaws.com/Logo_Blanc_Ad.png"
                    alt="Logo *****"
                    @click="$router.push('/')"
                />
                <img
                    v-else-if="!dark"
                    style="height:10vh"
                    src="https://wesleydorsey.s3.eu-west-3.amazonaws.com/Logo_Home_Noir.png"
                    alt="Logo *****"
                    @click="$router.push('/')"
                />
            </div>
            <div class="separation">
                <hr />
            </div>
            <div
                :class="[
                    isOpen
                        ? 'container_nav_item_open'
                        : 'container_nav_item_close'
                ]"
            >
                <nuxt-link
                    v-for="item in items"
                    :key="item.label"
                    class="navItem"
                    :to="item.to"
                    exact-active-class="current"
                >
                    <div style="display:flex; align-items:center; ">
                        <!-- eslint-disable-next-line-->
                        <div v-html="item.icon" style="color:var(--font-color)"></div>
                        <span class="label">{{ item.label }}</span>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <div class="topbar">
            <v-btn v-if="loggedIn" :color="'darken3'" small @click="logout">
                Logout
            </v-btn>
            <v-btn v-else :color="'darken3'" small to="/login">
                Login
            </v-btn>
            <v-btn
                :color="
                    $nuxt.$route.name === 'admin-Profil' ||
                    $nuxt.$route.name === 'admin-register'
                        ? 'primary'
                        : 'darken3'
                "
                fab
                small
                to="/admin/profil"
            >
                <v-icon>
                    mdi-account
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            items: [
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
                            </svg>`,
                    to: '/admin/',
                    label: 'Tableau de bord'
                },
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                            </svg>`,
                    to: '/admin/Accueil',
                    label: 'Accueil'
                },
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z" />
                            </svg>`,
                    to: '/admin/Projet',
                    label: 'Projet'
                },
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                            </svg>`,
                    to: '/admin/Photo',
                    label: 'Photo'
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            dark: 'dark',
            isOpen: 'isOpen',
            loggedIn: 'loggedIn'
        })
    },
    methods: {
        ...mapMutations({
            toggleMenu: 'toggleMenu'
        }),
        ...mapActions({
            removeToken: 'login/removeToken'
        }),
        logout() {
            this.removeToken()
        }
    }
}
</script>

<style lang="scss">
.contaiiner_logo {
    position: relative;
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.separation {
    position: relative;
    width: 60%;
    border-width: 0.5px;
    opacity: 0.5;
    left: 20%;
    margin-top: 10px;
}
.container_nav_open {
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: var(--color-2);
    z-index: 2;
    top: 0;
    left: 0;
    width: 20vw;
    height: 100vh;
    transition: 0.5s ease-in-out;
    box-shadow: 0px 0px 25px -6px rgba(0, 0, 0, 0.75);
}
.container_nav_close {
    position: fixed;
    z-index: 2;
    display: flex;
    flex-direction: column;
    background-color: var(--color-2);
    top: 0;
    left: 0;
    width: 0vw;
    opacity: 0;
    pointer-events: none;
    height: 100vh;
    transition: 0.5s ease-in-out;
    box-shadow: 0px 0px 25px -6px rgba(0, 0, 0, 0.75);
}
.container_nav_item_open {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    transition: 0.5s ease-in-out;
    margin-top: 15px;
    height: 90vh;
}
.container_nav_item_close {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    transition: 0.5s ease-in-out;
    margin-top: 15px;
    height: 90vh;
    transform: translateX(-20vw);
}
.navItem {
    height: 50px;
    width: 80%;
    margin-top: 10px;
    padding-left: 10px;
    border-radius: 15px 15px 15px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: start;
    text-decoration: none;
    background-color: var(--color-2);
    opacity: 0.7;
    transition: 0.5s ease-in-out;
    &:hover {
        opacity: 1;
        background-color: var(--color-3);
    }
}
.current {
    height: 50px;
    padding-left: 10px;
    width: 80%;
    margin-top: 10px;
    border-radius: 15px 15px 15px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: start;
    text-decoration: none;
    color: var(--font-color);
    background-color: var(--color-primary);
    opacity: 0.8;
    transition: 0.5s ease-in-out;
    &:hover {
        opacity: 1;
        background-color: var(--color-primary);
    }
}
.label {
    margin-left: 15px;
    color: var(--font-color);
}
.position_hamb_open {
    z-index: 3;
    position: fixed;
    cursor: pointer;
    display: flex;
    justify-content: center;
    width: 10vw;
    transform: translateX(18vw);
    height: 60px;
    transition: 0.5s ease-in-out;
}
.position_hamb_close {
    position: fixed;
    cursor: pointer;
    display: flex;
    justify-content: center;
    width: 10vw;
    height: 60px;
    transition: 0.5s ease-in-out;
}
.hamburger_top {
    position: absolute;
    width: 15px;
    top: 4vh;
    transform: rotate(45deg) translateY(15px);
    background-color: var(--font-color);
    transition: background-color 0.5s ease-in-out;
    height: 1px;
}
.hamburger_bottom {
    position: absolute;
    width: 15px;
    transform: rotate(-45deg) translateY(-15px);
    top: calc(4vh + 10px);
    background-color: var(--font-color);
    transition: background-color 0.5s ease-in-out;
    height: 1px;
}

.topbar {
    position: fixed;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 15px;
    right: 0;
    top: 0;
    z-index: 2;
    width: 80vw;
    height: 10vh;
    transition: background-color 0.5s ease-in-out;
}
.btn {
    transition: 0.5s ease-in-out;
    background-color: var(--color-3);
    margin-right: 10px;
}
.btn_actif {
    transition: 0.5s ease-in-out;
    color: red;
    background-color: var(--color-primary);
    margin-right: 10px;
}
</style>
