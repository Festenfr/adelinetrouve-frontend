<template>
    <div v-scroll="handleScroll" class="position">
        <a
            :class="[NewProjectIsWhite ? 'menu_text_noir' : 'menu_text_blanc']"
            @click="goToTop"
        >
            <svg
                :class="[show ? 'opaque' : 'nonopaque']"
                style="width:24px;height:24px"
                viewBox="0 0 24 24"
            >
                <path
                    :fill="NewProjectIsWhite ? 'black' : 'white'"
                    d="M19.78,11.78L18.36,13.19L12,6.83L5.64,13.19L4.22,11.78L12,4L19.78,11.78Z"
                />
            </svg>
        </a>
    </div>
</template>

<script>
import '../directive/scroll'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            scroll: 0,
            show: false
        }
    },
    computed: {
        ...mapGetters({
            NewProjectIsWhite: 'NewProjectIsWhite'
        })
    },
    methods: {
        handleScroll() {
            this.scroll = window.scrollY
            if (this.scroll >= 200) {
                this.show = true
            } else {
                this.show = false
            }
        },
        goToTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0
        }
    }
}
</script>

<style lang="scss">
.position {
    position: fixed;
    z-index: 999;
    bottom: 3vh;
    right: 5vh;
}
.menu_text_blanc {
    padding: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    z-index: 10;
    text-transform: uppercase;
    line-height: 20px;
    transition: 2s cubic-bezier(0.5, -0.005, 0.2, 1) !important;
}
.menu_text_noir {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    cursor: pointer;
    color: #000;
    font-size: 14px;
    text-decoration: none;
    z-index: 10;
    text-transform: uppercase;
    line-height: 20px;
    transition: 2s cubic-bezier(0.5, -0.005, 0.2, 1) !important;
}
.opaque {
    opacity: 1;
    transform: translateY(0px);
    transition: 0.5s ease-out;
}
.nonopaque {
    opacity: 0;
    transform: translateY(60px);
    transition: 0.5s ease-out;
}
</style>
