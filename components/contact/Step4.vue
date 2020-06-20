<template>
    <div class="wrapper2">
        <div class="wrapper2-case">
            <a
                class="case"
                :class="[oneActive ? 'isActive' : 'case']"
                @click="activateOne"
            >
                <h3>
                    1 000€
                </h3>
            </a>
            <a
                class="case"
                :class="[twoActive ? 'isActive' : 'case']"
                @click="activateTwo"
            >
                <h3>
                    10 000€
                </h3>
            </a>
            <a
                class="case"
                :class="[threeActive ? 'isActive' : 'case']"
                @click="activateThree"
            >
                <h3>
                    100 000€
                </h3>
            </a>
        </div>
        <div class="wrapper2-budjet">
            <div class="budjet">Budjet : {{ amount }}</div>
            <div class="echelle">
                <div class="curseur2"></div>
                <div class="dragger"></div>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { TweenMax } from 'gsap'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { mapMutations } from 'vuex'
if (process.client) {
    gsap.registerPlugin(Draggable)
}
export default {
    data() {
        return {
            amount: 0,
            translate: [],
            multiplier: 1000,
            oneActive: true,
            twoActive: false,
            threeActive: false
        }
    },
    watch: {
        translate() {
            this.amount =
                Math.round(
                    ((this.translate[0] + window.innerWidth / 100) /
                        (window.innerWidth / 2)) *
                        this.multiplier
                ) + '€'
        }
    },
    mounted() {
        const drag = document.querySelector('.dragger')
        drag.style.transform = `translateX(${window.innerWidth / 4}px)`
        this.amount = Math.round(window.innerWidth / 4) + '€'
        Draggable.create('.dragger', {
            type: 'x',
            bounds: '.wrapper2',
            onDrag: this.makeEmMove
        })
        this.addStep4(500)
    },
    methods: {
        ...mapMutations({
            addStep4: 'register/addStep4'
        }),
        activateOne() {
            this.oneActive = true
            this.twoActive = false
            this.threeActive = false
            this.multiplier = 1000
        },
        activateTwo() {
            this.oneActive = false
            this.twoActive = true
            this.threeActive = false
            this.multiplier = 10000
        },
        activateThree() {
            this.oneActive = false
            this.twoActive = false
            this.threeActive = true
            this.multiplier = 100000
        },
        makeEmMove() {
            const drag = document.querySelector('.dragger')
            function getTranslate(item) {
                var transArr = []

                if (!window.getComputedStyle) return
                var style = getComputedStyle(item),
                    transform =
                        style.transform ||
                        style.webkitTransform ||
                        style.mozTransform ||
                        style.msTransform
                var mat = transform.match(/^matrix3d\((.+)\)$/)
                if (mat) return parseFloat(mat[1].split(', ')[13])

                mat = transform.match(/^matrix\((.+)\)$/)
                mat
                    ? transArr.push(parseFloat(mat[1].split(', ')[4]))
                    : transArr.push(0)
                mat
                    ? transArr.push(parseFloat(mat[1].split(', ')[5]))
                    : transArr.push(0)

                return transArr
            }
            this.translate = getTranslate(drag)

            document.querySelector('.curseur2').style.width =
                this.translate[0] + window.innerWidth / 100 + 'px'
            this.addStep4(this.amount)
        }
    }
}
</script>

<style lang="scss">
.wrapper2 {
    height: 65%;
    width: 50vw;
    align-items: space-around;
    justify-content: center;
    display: flex;
    flex-direction: column;
    .wrapper2-case {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 25%;

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
    .wrapper2-budjet {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 75%;
        .budjet {
            position: relative;
            font-family: 'Montserrat';
            font-size: 1.5vw;
            width: 100%;
            height: 90%;
            color: white;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
        .echelle {
            position: relative;
            width: 100%;
            height: 10%;
            background-color: white;
            display: flex;
            opacity: 1;
            .curseur2 {
                position: absolute;
                z-index: 2;
                width: 50%;
                height: 100%;
                background-color: #b24c4c;
            }
            .dragger {
                position: absolute;
                z-index: 2;
                width: 1vw;
                height: 100%;
                background-color: rgb(48, 48, 48);
            }
        }
    }
}
</style>
