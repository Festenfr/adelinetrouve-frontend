<template>
    <div class="wrapper">
        <a
            class="case"
            :class="[oneActive ? 'isActive' : 'case']"
            @click="activateOne"
        >
            <h3>
                Rénovation
            </h3>
        </a>
        <a
            class="case"
            :class="[twoActive ? 'isActive' : 'case']"
            @click="activateTwo"
        >
            <h3>
                Décoration
            </h3>
        </a>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            oneActive: false,
            twoActive: false,
            type: ''
        }
    },
    mounted() {
        this.invalidateStep1()
    },
    methods: {
        ...mapMutations({
            addStep1: 'register/addStep1',
            invalidateStep1: 'register/invalidateStep1',
            validateStep1: 'register/validateStep1'
        }),
        activateOne() {
            this.validateStep1()
            this.type = 'rénovation'
            this.addStep1(this.type)
            this.oneActive = true
            this.twoActive = false
        },
        activateTwo() {
            this.validateStep1()
            this.type = 'décoration'
            this.addStep1(this.type)
            this.oneActive = false
            this.twoActive = true
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    height: 65%;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    display: flex;
    .case {
        cursor: pointer;
        color: white;
        border: 1px solid white;
        text-transform: uppercase;
        font-size: 0.8vw;
        width: 14vw;
        height: 7vw;
        display: flex;
        transition: 0.5s ease-out;
        justify-content: center;
        align-items: center;
    }
    .isActive {
        cursor: pointer;
        color: #b24c4c;
        transition: 0.5s ease-out;
        border: 1px solid #b24c4c;
        text-transform: uppercase;
        font-size: 0.8vw;
        width: 14vw;
        height: 7vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
