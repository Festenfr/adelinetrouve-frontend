<template>
    <div class="wrapper">
        <div class="wrapper-piece">
            <div :class="[oneActive ? 'visible' : 'invisible']">
                <p class="decrease" @click="decrease1">-</p>
                <p>
                    {{ number1 }}
                </p>
                <p class="increase" @click="increase1">+</p>
            </div>
            <a :class="[oneActive ? 'isActive' : 'case']" @click="activateOne">
                <div>
                    <h3>
                        Séjour
                    </h3>
                </div>
            </a>
        </div>
        <div class="wrapper-piece">
            <div :class="[twoActive ? 'visible' : 'invisible']">
                <p class="decrease" @click="decrease2">-</p>
                <p>
                    {{ number2 }}
                </p>
                <p class="increase" @click="increase2">+</p>
            </div>
            <a :class="[twoActive ? 'isActive' : 'case']" @click="activateTwo">
                <div>
                    <h3>
                        Salle de bain
                    </h3>
                </div>
            </a>
        </div>
        <div class="wrapper-piece">
            <div :class="[threeActive ? 'visible' : 'invisible']">
                <p class="decrease" @click="decrease3">-</p>
                <p>
                    {{ number3 }}
                </p>
                <p class="increase" @click="increase3">+</p>
            </div>
            <a
                :class="[threeActive ? 'isActive' : 'case']"
                @click="activateThree"
            >
                <div>
                    <h3>
                        cuisine
                    </h3>
                </div>
            </a>
        </div>
        <div class="wrapper-piece">
            <div :class="[fourActive ? 'visible' : 'invisible']">
                <p class="decrease" @click="decrease4">-</p>
                <p>
                    {{ number4 }}
                </p>
                <p class="increase" @click="increase4">+</p>
            </div>
            <a
                :class="[fourActive ? 'isActive' : 'case']"
                @click="activateFour"
            >
                <div>
                    <h3>
                        chambre
                    </h3>
                </div>
            </a>
        </div>
        <div class="wrapper-piece">
            <div :class="[fiveActive ? 'visible' : 'invisible']">
                <p class="decrease" @click="decrease5">-</p>
                <p>
                    {{ number5 }}
                </p>
                <p class="increase" @click="increase5">+</p>
            </div>
            <a
                :class="[fiveActive ? 'isActive' : 'case']"
                @click="activateFive"
            >
                <div>
                    <h3>
                        terrasse
                    </h3>
                </div>
            </a>
        </div>
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
            number1: 0,
            number2: 0,
            number3: 0,
            number4: 0,
            number5: 0,
            pieces: [
                '0 séjour',
                '0 salle de bain',
                '0 cuisine',
                '0 chambre',
                '0 terrasse'
            ]
        }
    },
    methods: {
        ...mapMutations({
            addStep3: 'register/addStep3',
            validateStep3: 'register/validateStep3',
            invalidateStep3: 'register/invalidateStep3'
        }),

        increase1() {
            if (this.number1 === 4) {
                this.number1 = 4
            } else {
                this.number1++
            }
            this.pieces[0] = `${this.number1} séjour(s)`
            this.addStep3(this.pieces)
        },
        decrease1() {
            this.number1--
            if (this.number1 <= 0) {
                this.number1 = 0
                this.oneActive = false
            }
            this.pieces[0] = `${this.number1} séjour(s)`
            this.addStep3(this.pieces)
        },
        activateOne() {
            if (this.oneActive === true) {
                this.number1 = 0
            } else {
                this.number1 = 1
            }

            this.oneActive = !this.oneActive
            if (this.oneActive === true) {
                this.validateStep3()
            }
            if (
                this.oneActive === false &&
                this.twoActive === false &&
                this.threeActive === false &&
                this.fourActive === false &&
                this.fiveActive === false
            ) {
                this.invalidateStep3()
            }
            this.pieces[0] = `${this.number1} séjour(s)`
            this.addStep3(this.pieces)
        },
        increase2() {
            if (this.number2 === 4) {
                this.number2 = 4
            } else {
                this.number2++
            }
            this.pieces[1] = `${this.number2} salle de bain`
            this.addStep3(this.pieces)
        },
        decrease2() {
            this.number2--
            if (this.number2 <= 0) {
                this.number2 = 0
                this.twoActive = false
            }
            this.pieces[1] = `${this.number2} salle de bain`
            this.addStep3(this.pieces)
        },
        activateTwo() {
            if (this.twoActive === true) {
                this.number2 = 0
            } else {
                this.number2 = 1
            }

            this.twoActive = !this.twoActive
            if (this.twoActive === true) {
                this.validateStep3()
            }
            if (
                this.oneActive === false &&
                this.twoActive === false &&
                this.threeActive === false &&
                this.fourActive === false &&
                this.fiveActive === false
            ) {
                this.invalidateStep3()
            }
            this.pieces[1] = `${this.number2} salle de bain`
            this.addStep3(this.pieces)
        },
        increase3() {
            if (this.number3 === 4) {
                this.number3 = 4
            } else {
                this.number3++
            }
            this.pieces[2] = `${this.number3} cuisine`
            this.addStep3(this.pieces)
        },
        decrease3() {
            this.number3--
            if (this.number3 <= 0) {
                this.number3 = 0
                this.threeActive = false
            }
            this.pieces[2] = `${this.number3} cuisine`
            this.addStep3(this.pieces)
        },
        activateThree() {
            if (this.threeActive === true) {
                this.number3 = 0
            } else {
                this.number3 = 1
            }

            this.threeActive = !this.threeActive
            if (this.threeActive === true) {
                this.validateStep3()
            }
            if (
                this.oneActive === false &&
                this.twoActive === false &&
                this.threeActive === false &&
                this.fourActive === false &&
                this.fiveActive === false
            ) {
                this.invalidateStep3()
            }
            this.pieces[2] = `${this.number3} cuisine`
            this.addStep3(this.pieces)
        },
        increase4() {
            if (this.number4 === 4) {
                this.number4 = 4
            } else {
                this.number4++
            }
            this.pieces[3] = `${this.number4} chambre`
            this.addStep3(this.pieces)
        },
        decrease4() {
            this.number4--
            if (this.number4 <= 0) {
                this.number4 = 0
                this.fourActive = false
            }
            this.pieces[3] = `${this.number4} chambre`
            this.addStep3(this.pieces)
        },
        activateFour() {
            if (this.fourActive === true) {
                this.number4 = 0
            } else {
                this.number4 = 1
            }
            this.fourActive = !this.fourActive
            if (this.fourActive === true) {
                this.validateStep3()
            }
            if (
                this.oneActive === false &&
                this.twoActive === false &&
                this.threeActive === false &&
                this.fourActive === false &&
                this.fiveActive === false
            ) {
                this.invalidateStep3()
            }
            this.pieces[3] = `${this.number4} chambre`
            this.addStep3(this.pieces)
        },
        increase5() {
            if (this.number5 === 4) {
                this.number5 = 4
            } else {
                this.number5++
            }
            this.pieces[4] = `${this.number5} terrasse`
            this.addStep3(this.pieces)
        },
        decrease5() {
            this.number5--
            if (this.number5 <= 0) {
                this.number5 = 0
                this.fiveActive = false
            }
            this.pieces[4] = `${this.number5} terrasse`
            this.addStep3(this.pieces)
        },
        activateFive() {
            if (this.fiveActive === true) {
                this.number5 = 0
            } else {
                this.number5 = 1
            }

            this.fiveActive = !this.fiveActive
            if (this.fiveActive === true) {
                this.validateStep3()
            }
            if (
                this.oneActive === false &&
                this.twoActive === false &&
                this.threeActive === false &&
                this.fourActive === false &&
                this.fiveActive === false
            ) {
                this.invalidateStep3()
            }
            this.pieces[4] = `${this.number5} terrasse`
            this.addStep3(this.pieces)
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
    .wrapper-piece {
        height: 8vw;
        font-size: 0.8vw;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .case {
            z-index: 2;
            cursor: pointer;
            color: white;
            transition: 0.5s ease-out;
            border: 1px solid white;
            text-transform: uppercase;
            font-size: 0.8vw;
            width: 7vw;
            height: 5vw;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .isActive {
            z-index: 2;
            cursor: pointer;
            color: #b24c4c;
            transition: 0.5s ease-out;
            border: 1px solid #b24c4c;
            text-transform: uppercase;
            font-size: 0.8vw;
            width: 7vw;
            height: 5vw;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .visible {
            z-index: 1;
            position: relative;
            display: flex;
            width: 10vw;
            opacity: 1;
            top: 0vh;
            transition: 0.5s ease-out;
            justify-content: space-around;
            p {
                width: 2vw;
                height: 2vw;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.5s ease-out;
                font-size: 1vw;
                color: #b24c4c;
            }
            .increase {
                cursor: pointer;
            }
            .decrease {
                cursor: pointer;
            }
        }
        .invisible {
            z-index: 1;
            position: relative;
            display: flex;
            width: 10vw;
            opacity: 0;
            top: 2vh;
            transition: 0.5s ease-out;
            justify-content: space-around;
            p {
                transition: 0.5s ease-out;
                font-size: 1vw;
                color: white;
            }
        }
    }
}
</style>
