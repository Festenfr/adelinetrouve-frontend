<template>
    <div class="contact-image">
        <template v-if="!show">
            <div class="contact-chantier">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    style="width:150px; height:170px"
                    viewBox="0 0 48 60"
                    x="0px"
                    y="0px"
                >
                    <path
                        style="fill:white"
                        d="M46.85,1.66A2.48,2.48,0,0,0,45.57.24,2.44,2.44,0,0,0,43.66.15l-11,4a2.5,2.5,0,0,0-.29,4.58v3l-2.69,2.69-2.26-2.26a2.51,2.51,0,0,0-2.29-.68,2.48,2.48,0,0,0-1.82,1.53L19,23.85a2,2,0,0,0,1.85,2.74,2,2,0,0,0,.75-.15h0l10.91-4.31A2.51,2.51,0,0,0,34,20.3,2.48,2.48,0,0,0,33.32,18l-2.26-2.26,3-3a1,1,0,0,0,.29-.7V8.8l11-4a2.48,2.48,0,0,0,1.51-3.19ZM31.91,19.43a.51.51,0,0,1,.14.47.5.5,0,0,1-.31.37L20.82,24.58h0l4.32-10.91a.5.5,0,0,1,.37-.31l.11,0a.49.49,0,0,1,.36.16l2.26,2.26L26,18a1,1,0,0,0,0,1.41,1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l2.24-2.24ZM45,2.71a.48.48,0,0,1-.28.26h0l-11,4A.51.51,0,0,1,33,6.62.5.5,0,0,1,33.31,6l11-4,.17,0a.49.49,0,0,1,.21,0,.48.48,0,0,1,.26.28A.51.51,0,0,1,45,2.71ZM47,34H33V29a1,1,0,0,0-1-1H18a1,1,0,0,0-1,1v5H1a1,1,0,0,0-1,1V47a1,1,0,0,0,1,1H47a1,1,0,0,0,1-1V35A1,1,0,0,0,47,34Zm-1,6H41V36h5Zm-7,0H27V36H39ZM17,40H13V36H25v4Zm2-10H31v4H19ZM2,36h9v4H2Zm0,6H16v4H2Zm16,0H30v4H18Zm28,4H32V42H46Z"
                    />
                </svg>
                <h3 style="margin-left: 0px">Espace en chantier...</h3>
            </div>
        </template>
        <template v-if="show">
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
        </template>
    </div>
</template>

<script>
import Step0 from './Step0'
import { TweenLite, TweenMax, Power4 } from 'gsap'
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
            show: true,
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
        nextIsValid() {
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
.contact-chantier {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    top: -25vh;
    font-size: 3vw;

    font-family: 'Playfair Display', serif;
}
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
