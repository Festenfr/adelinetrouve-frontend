<template>
    <div>
        <h1>{{ titre }}</h1>
        <div>
            <button @click="isOpen = !isOpen">
                My profile
            </button>
            <transition
                :css="false"
                @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave"
            >
                <div v-if="isOpen" class="drawer">
                    <img
                        src="https://adeona.s3.eu-west-3.amazonaws.com/Accueil/soleilarbrenoir.jpg"
                        alt="dark sun"
                    />
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </transition>
        </div>
        <div>
            <nuxt-link to="/">Create</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titre: 'Admin Part',
            isOpen: false
        }
    }
}
</script>
