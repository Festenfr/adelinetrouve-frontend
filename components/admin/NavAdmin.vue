<template>
    <div class="navAdmin">
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
                Déconnexion
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
                                <path fill="currentColor" d="M13.78 15.3L19.78 21.3L21.89 19.14L15.89 13.14L13.78 15.3M17.5 10.1C17.11 10.1 16.69 10.05 16.36 9.91L4.97 21.25L2.86 19.14L10.27 11.74L8.5 9.96L7.78 10.66L6.33 9.25V12.11L5.63 12.81L2.11 9.25L2.81 8.55H5.62L4.22 7.14L7.78 3.58C8.95 2.41 10.83 2.41 12 3.58L9.89 5.74L11.3 7.14L10.59 7.85L12.38 9.63L14.2 7.75C14.06 7.42 14 7 14 6.63C14 4.66 15.56 3.11 17.5 3.11C18.09 3.11 18.61 3.25 19.08 3.53L16.41 6.2L17.91 7.7L20.58 5.03C20.86 5.5 21 6 21 6.63C21 8.55 19.45 10.1 17.5 10.1Z" />
                            </svg>`,
                    to: '/admin/projet',
                    label: 'Projets'
                },

                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M18.72,14.76C19.07,13.91 19.26,13 19.26,12C19.26,11.28 19.15,10.59 18.96,9.95C18.31,10.1 17.63,10.18 16.92,10.18C13.86,10.18 11.15,8.67 9.5,6.34C8.61,8.5 6.91,10.26 4.77,11.22C4.73,11.47 4.73,11.74 4.73,12A7.27,7.27 0 0,0 12,19.27C13.05,19.27 14.06,19.04 14.97,18.63C15.54,19.72 15.8,20.26 15.78,20.26C14.14,20.81 12.87,21.08 12,21.08C9.58,21.08 7.27,20.13 5.57,18.42C4.53,17.38 3.76,16.11 3.33,14.73H2V10.18H3.09C3.93,6.04 7.6,2.92 12,2.92C14.4,2.92 16.71,3.87 18.42,5.58C19.69,6.84 20.54,8.45 20.89,10.18H22V14.67H22V14.69L22,14.73H21.94L18.38,18L13.08,17.4V15.73H17.91L18.72,14.76M9.27,11.77C9.57,11.77 9.86,11.89 10.07,12.11C10.28,12.32 10.4,12.61 10.4,12.91C10.4,13.21 10.28,13.5 10.07,13.71C9.86,13.92 9.57,14.04 9.27,14.04C8.64,14.04 8.13,13.54 8.13,12.91C8.13,12.28 8.64,11.77 9.27,11.77M14.72,11.77C15.35,11.77 15.85,12.28 15.85,12.91C15.85,13.54 15.35,14.04 14.72,14.04C14.09,14.04 13.58,13.54 13.58,12.91A1.14,1.14 0 0,1 14.72,11.77Z" />
                            </svg>`,
                    to: '/admin/client',
                    label: 'Clients'
                },
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                        </svg>`,
                    to: '/admin/parametre',
                    label: 'Paramètres'
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            user: 'user',
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
