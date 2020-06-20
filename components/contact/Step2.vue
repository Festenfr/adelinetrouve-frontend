<template>
    <div class="wrapper">
        <a
            class="case"
            :class="[oneActive ? 'isActive' : 'case']"
            @click="activateOne"
        >
            <h3>
                0 à 30m²
            </h3>
        </a>
        <a
            class="case"
            :class="[twoActive ? 'isActive' : 'case']"
            @click="activateTwo"
        >
            <h3>
                30 à 60m²
            </h3>
        </a>
        <a
            class="case"
            :class="[threeActive ? 'isActive' : 'case']"
            @click="activateThree"
        >
            <h3>
                60 à 90m²
            </h3>
        </a>
        <a
            class="case"
            :class="[fourActive ? 'isActive' : 'case']"
            @click="activateFour"
        >
            <h3>
                90 à 120m²
            </h3>
        </a>
        <a
            class="case"
            :class="[fiveActive ? 'isActive' : 'case']"
            @click="activateFive"
        >
            <h3>
                > 120 M²
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
            threeActive: false,
            fourActive: false,
            fiveActive: false,
            surface: ''
        }
    },
    mounted() {
        this.invalidateStep2()
    },
    methods: {
        ...mapMutations({
            addStep2: 'register/addStep2',
            invalidateStep2: 'register/invalidateStep2',
            validateStep2: 'register/validateStep2'
        }),
        activateOne() {
            this.validateStep2()
            this.surface = '0 à 30m²'
            this.addStep2(this.surface)
            this.oneActive = true
            this.twoActive = false
            this.threeActive = false
            this.fourActive = false
            this.fiveActive = false
        },
        activateTwo() {
            this.validateStep2()
            this.surface = '30 à 60m²'
            this.addStep2(this.surface)
            this.oneActive = false
            this.twoActive = true
            this.threeActive = false
            this.fourActive = false
            this.fiveActive = false
        },
        activateThree() {
            this.validateStep2()
            this.surface = '60 à 90m²'
            this.addStep2(this.surface)
            this.oneActive = false
            this.twoActive = false
            this.threeActive = true
            this.fourActive = false
            this.fiveActive = false
        },
        activateFour() {
            this.validateStep2()
            this.surface = '90 à 120m²'
            this.addStep2(this.surface)
            this.oneActive = false
            this.twoActive = false
            this.threeActive = false
            this.fourActive = true
            this.fiveActive = false
        },
        activateFive() {
            this.validateStep2()
            this.surface = '> 120m²'
            this.addStep2(this.surface)
            this.oneActive = false
            this.twoActive = false
            this.threeActive = false
            this.fourActive = false
            this.fiveActive = true
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    height: 65%;
    width: 80%;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    display: flex;
    .case {
        cursor: pointer;
        color: white;
        border: 1px solid white;
        font-size: 0.8vw;
        width: 7vw;
        height: 5vw;
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
        font-size: 0.8vw;
        width: 7vw;
        height: 5vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
