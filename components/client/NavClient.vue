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
                    to: '/client/',
                    label: 'Tableau de bord'
                },
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" />
</svg>`,
                    to: '/client/Plans',
                    label: 'Plans'
                },
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z" />
</svg>`,
                    to: '/client/maquette',
                    label: 'Maquette 3D'
                },
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M4,5H7L9,3H15L17,5H20A2,2 0 0,1 22,7V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V7A2,2 0 0,1 4,5M13.09,9.45L11.05,12.18L12.6,14.25L11.73,14.91L9.27,11.64L6,16H18L13.09,9.45Z" />
</svg>`,
                    to: '/client/Rendus',
                    label: 'Rendus 3D'
                },
                {
                    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z" />
</svg>`,
                    to: '/client/shoppingList',
                    label: 'Shopping list'
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
