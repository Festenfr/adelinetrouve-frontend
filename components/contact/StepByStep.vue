<template>
    <div class="contact-image">
        <div class="image-mask"></div>
        <transition :css="false" @enter="enter" @leave="leave">
            <keep-alive>
                <component
                    :is="step"
                    :valid="valid"
                    :infos="infos"
                    @validChange="valid = $event"
                    @validInfos="infos = $event"
                ></component>
            </keep-alive>
        </transition>

        <div class="contact-nav">
            <a
                class="nav-left"
                :class="[index === 0 ? 'prev-gris' : 'prev-white']"
                @click="prev"
            >
                <CarouselArrow2 />
                <h3 style="font-weight: 400;">
                    Précedent
                </h3>
            </a>
            <div class="cursor-nav">
                <span class="rond"> </span>
                <span class="rond"> </span>
                <span class="rond"> </span>
                <span class="rond"> </span>
                <span class="rond"> </span>
                <span class="rond"> </span>
            </div>
            <a
                v-if="index <= 4"
                class="nav-right"
                :class="[nextIsValid ? 'next-white' : 'next-gris']"
                @click="next"
            >
                <h3 style="font-weight: 400;">
                    Suivant
                </h3>
                <div
                    :class="[nextIsValid ? 'next-white' : 'next-gris']"
                    style="transform: rotate(180deg);"
                >
                    <CarouselArrow2 />
                </div>
            </a>
            <a
                v-if="index === 5"
                class="nav-right"
                :class="[valid ? 'next-white' : 'next-gris']"
                @click="register"
            >
                <h3 style="font-weight: 400;">
                    Creer mon espace client
                </h3>
                <div
                    :class="[valid ? 'next-white' : 'next-gris']"
                    style="transform: rotate(180deg);"
                >
                    <CarouselArrow2 />
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import Step0 from './Step0'
import { TweenLite, TweenMax } from 'gsap'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import CarouselArrow2 from '../../static/CarouselArrow2'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    components: {
        CarouselArrow2,
        // eslint-disable-next-line vue/no-unused-components
        Step0,
        Step1,
        Step2,
        Step3,
        Step4,
        Step5
    },
    data() {
        return {
            valid: true,
            infos: {
                nom: '',
                phone: '',
                email: '',
                password1: '',
                password2: ''
            },
            step: 'step0',
            index: 0,
            direction: '',
            isAnim: false
        }
    },
    computed: {
        ...mapGetters({
            step1: 'register/step1',
            step2: 'register/step2',
            step3: 'register/step3',
            step4: 'register/step4'
        }),
        // eslint-disable-next-line vue/return-in-computed-property
        nextIsValid: function() {
            if (this.index === 0) return true
            else if (this.index === 1) return this.step1
            else if (this.index === 2) return this.step2
            else if (this.index === 3) return this.step3
            else if (this.index === 4) return this.step4
            else if (this.index === 5) return this.valid
        }
    },
    mounted() {
        this.NextAnim()
    },
    methods: {
        ...mapMutations({
            addStep5: 'register/addStep5'
        }),
        ...mapActions({
            addUser: 'register/addUser'
        }),
        register() {
            {
                this.addStep5(this.infos)
                this.addUser()
            }
        },
        enter(el, done) {
            if (this.direction === 'right') {
                TweenMax.fromTo(
                    el,
                    0.5,
                    {
                        x: -300,
                        opacity: 0,
                        display: 'none'
                    },
                    {
                        x: 0,
                        display: 'flex',
                        opacity: 1,
                        delay: 0.5,
                        // eslint-disable-next-line no-undef
                        ease: Power4.easeOut,
                        onComplete: done
                    }
                )
            } else if (this.direction === 'left') {
                TweenMax.fromTo(
                    el,
                    0.5,
                    {
                        x: 300,
                        opacity: 0,
                        display: 'none'
                    },
                    {
                        x: 0,
                        display: 'flex',
                        opacity: 1,
                        delay: 0.5,
                        // eslint-disable-next-line no-undef
                        ease: Power4.easeOut,
                        onComplete: done
                    }
                )
            }
        },
        leave(el, done) {
            if (this.direction === 'right') {
                TweenMax.fromTo(
                    el,
                    0.5,
                    {
                        x: 0,
                        opacity: 1
                    },
                    {
                        x: 300,
                        opacity: 0,
                        // eslint-disable-next-line no-undef
                        ease: Power4.easeOut,
                        onComplete: done
                    }
                )
            } else if (this.direction === 'left') {
                TweenMax.fromTo(
                    el,
                    0.5,
                    {
                        x: 0,
                        opacity: 1
                    },
                    {
                        x: -300,
                        opacity: 0,
                        // eslint-disable-next-line no-undef
                        ease: Power4.easeOut,
                        onComplete: done
                    }
                )
            }
        },
        NextAnim() {
            const NavIndicators = document.querySelectorAll('.rond')
            TweenLite.fromTo(
                NavIndicators[this.index],
                0.5,
                {
                    backgroundColor: '#ffffff',
                    height: '0.5vw',
                    width: '0.5vw'
                },
                {
                    backgroundColor: '#b24c4c',

                    height: '1vw',
                    width: '1vw',
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                NavIndicators[this.index - 1],
                0.5,
                {
                    backgroundColor: '#b24c4c',
                    width: '1vw',
                    height: '1vw'
                },
                {
                    backgroundColor: '#ffffff',
                    width: '0.5vw',
                    height: '0.5vw',
                    ease: 'sine.Out',
                    onComplete: () => {
                        this.isAnim = false
                    }
                }
            )
        },
        prevAnim() {
            const NavIndicators = document.querySelectorAll('.rond')
            TweenLite.fromTo(
                NavIndicators[this.index],
                0.5,
                {
                    backgroundColor: '#ffffff',
                    height: '0.5vw',
                    width: '0.5vw'
                },
                {
                    backgroundColor: '#b24c4c',
                    height: '1vw',
                    width: '1vw',
                    ease: 'sine.Out',
                    onComplete: () => {
                        this.isAnim = false
                    }
                }
            )
            TweenLite.fromTo(
                NavIndicators[this.index + 1],
                0.5,
                {
                    backgroundColor: '#b24c4c',
                    height: '1vw',
                    width: '1vw'
                },
                {
                    backgroundColor: '#ffffff',
                    height: '0.5vw',
                    width: '0.5vw',
                    ease: 'sine.Out'
                }
            )
        },
        next() {
            if (this.isAnim === false) {
                this.isAnim = true
                if (this.index === 5) {
                    this.index = 5
                    this.isAnim = false
                }
                if (this.index !== 5) {
                    this.direction = 'right'
                    this.index++
                    this.step = `step${this.index}`
                    this.NextAnim()
                }
            }
        },
        prev() {
            if (this.isAnim === false) {
                this.isAnim = true
                if (this.index === 0) {
                    this.index = 0
                    this.isAnim = false
                }
                if (this.index !== 0) {
                    this.direction = 'left'
                    this.index--
                    this.step = `step${this.index}`
                    this.prevAnim()
                }
            }
        }
    }
}
</script>

<style lang="scss">
.contact-image {
    width: 100%;
    height: 80vh;
    top: 0vw;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    .image-mask {
        background-color: #121212;
        position: absolute;
        transform: scaleY(1);
        width: 100%;
        height: 100%;
        display: block;
        z-index: 2;
    }
    .contact-nav {
        position: absolute;
        top: 80%;
        height: 10vh;
        width: 60vw;
        font-family: 'Playfair Display', serif;
        font-size: 1vw;
        color: white;
        display: flex;
        justify-content: space-between;
        .prev-gris {
            opacity: 0.3;
            pointer-events: none;
            transition: 0.5s ease-in;
        }
        .prev-white {
            transition: 0.5s ease-in;
            opacity: 1;
        }
        .next-gris {
            opacity: 0.3;
            pointer-events: none;
            transition: 0.5s ease-in;
        }
        .next-white {
            transition: 0.5s ease-in;
            opacity: 1;
        }
        .nav-left {
            cursor: pointer;
            display: flex;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            width: 20%;
        }
        .cursor-nav {
            width: 15vw;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span {
                width: 0.5vw;
                height: 0.5vw;
                background-color: white;
            }
        }
        .nav-right {
            cursor: pointer;
            display: flex;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            width: 20%;
        }
    }
}
</style>
