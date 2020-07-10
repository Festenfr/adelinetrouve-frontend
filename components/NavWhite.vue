<template>
    <div class="nav">
        <ul>
            <li>
                <nuxt-link
                    to="/"
                    exact-active-class="titre_nav_actif"
                    class="titre_nav"
                >
                    <img
                        style="height:10vh"
                        src="https://wesleydorsey.s3.eu-west-3.amazonaws.com/Logo_Blanc_Ad.png"
                        alt="Logo *****"
                    />
                </nuxt-link>
            </li>
            <li>
                <nuxt-link
                    to="/about"
                    exact-active-class="titre_nav_actif"
                    class="titre_nav"
                    style="margin-right: 20px;"
                >
                    about
                </nuxt-link>

                <nuxt-link
                    v-if="!user"
                    to="/login"
                    exact-active-class="titre_nav_actif"
                    class="titre_nav"
                    style="margin-left: 20px;"
                >
                    login
                </nuxt-link>
                <nuxt-link
                    v-else-if="user.isAdmin === false"
                    to="/client"
                    exact-active-class="titre_nav_actif"
                    class="titre_nav"
                    style="margin-left: 20px;"
                >
                    espace client
                </nuxt-link>
                <nuxt-link
                    v-else-if="user.isAdmin === true"
                    to="/admin"
                    exact-active-class="titre_nav_actif"
                    class="titre_nav"
                    style="margin-left: 20px;"
                >
                    Admin
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
    .nav {
        position: fixed;
        top: 0;
        margin: auto;
        width: 100%;
        z-index: 5;
        padding: 5.5vh 9.333vw;
    }
    li {
        display: list-item;
        text-align: -webkit-match-parent;
    }
    .nav ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .nav ul li {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        font-size: 2.5vw;
        line-height: normal;
        letter-spacing: 0;
        letter-spacing: 0.125vw;
        line-height: 1.875vw;
        text-transform: uppercase;
        transition: opacity 0.2s ease;
    }
    ol,
    ul {
        list-style: none;
    }
    .titre_nav {
        text-decoration: none;
        color: white;
    }
    .titre_nav_actif {
        color: white;
        text-decoration: none;
    }
}
@media screen and (min-width: 768px) {
    .nav {
        padding: 5vh 8vw 0;
        position: fixed;
        top: 0;
        margin: auto;
        width: 100%;
        z-index: 5;
    }
    li {
        display: list-item;
        text-align: -webkit-match-parent;
    }
    .nav ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .nav ul li {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.875vw;
        font-weight: bold;
        line-height: normal;
        letter-spacing: 0;
        letter-spacing: 0.125vw;
        line-height: 1.875vw;
        text-transform: uppercase;
        transition: opacity 0.2s ease;
    }
    ol,
    ul {
        list-style: none;
    }
    .titre_nav {
        text-decoration: none;
        color: white;
    }
    .titre_nav_actif {
        color: white;
        text-decoration: none;
    }
}
</style>
