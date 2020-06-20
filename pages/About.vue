<template>
    <div>
        <div class="preload_img"></div>
        <div class="preload_background"></div>
        <div ref="about" class="page about ">
            <NavWhite />
            <div class="about-wrapper">
                <div class="about-image">
                    <div class="image-mask"></div>
                    <img
                        src="https://adeona.s3.eu-west-3.amazonaws.com/APropos/Adeline.jpg"
                        data-load="preload"
                        alt="Adeline Trouvé"
                    />
                    <div class="about-quote">
                        <h3 style="font-weight: 400;">
                            Architecture d'interieur et design d'espace
                        </h3>
                    </div>
                </div>
                <div class="about-content">
                    <div class="about-right">
                        <div class="content-text">
                            <div class="paragraph">
                                <p>
                                    Jeune diplomée en Design d’Espace puis en
                                    Arts plastiques et sciences de l’art, j’ai
                                    eu la chance d’effectuer des projets de
                                    scénographies et d’architecture d’intérieur
                                    à travers différents stages. Je suis
                                    passionnée d’architecture et de design, mais
                                    aussi de photographie, que j’aime exploiter
                                    au travers de mes voyages, de la nature, de
                                    l’architecture..
                                </p>
                            </div>
                        </div>
                        <div class="about-footer">
                            <div class="agency-representations">
                                <span>Représentation d'agence</span>
                                <ul>
                                    <li>
                                        <a
                                            href="https://www.kroqy.com/"
                                            target="_blank"
                                            rel="noopener"
                                            style="color:white; "
                                            >Kroqy</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="http://abstudio.tripoint.odns.fr/"
                                            target="_blank"
                                            rel="noopener"
                                            style="color:white; "
                                        >
                                            Arnaud Bielher</a
                                        >
                                    </li>
                                </ul>
                            </div>
                            <div class="credits">
                                <span>Website credits</span>
                                <ul>
                                    <li>
                                        <a
                                            href="https://www.wesleydorsey.com/"
                                            target="_blank"
                                            rel="noopener"
                                            style="color:white;"
                                        >
                                            Wesley Dorsey</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cursor from '../modules/cursor'
import { TweenLite } from 'gsap/all'
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            loader: 'loader'
        })
    },
    transition: {
        css: false,
        mode: 'out-in',
        enter(el, done) {
            done()
        },
        leave(el, done) {
            TweenLite.fromTo(
                '.about-content',
                0.6,
                {
                    opacity: 1,
                    y: 0
                },
                {
                    opacity: 0,
                    y: 50,
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.about-quote',
                0.6,
                {
                    opacity: 1,
                    y: 0
                },
                {
                    opacity: 0,
                    y: 50,
                    ease: 'sine.Out',
                    delay: 0.2
                }
            )
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleY: 1.5,
                ease: 'sine.Out',
                transformOrigin: '0px 0%'
            })
            TweenLite.fromTo(
                '.nav',
                0.6,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: 0,
                    y: 50,
                    ease: 'sine.Out',
                    delay: 0.2,
                    onComplete: done
                }
            )
            TweenLite.fromTo(
                '.about-issue',
                0.8,
                {
                    opacity: '1'
                },
                {
                    opacity: 0,
                    ease: 'linear'
                }
            )
        }
    },
    mounted() {
        this.IsNotWhite()

        function enterPage() {
            TweenLite.fromTo(
                '.preload_img',
                0.5,
                {
                    height: '0vh'
                },
                {
                    height: '100vh',
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.preload_background',
                0.5,
                {
                    height: '0vh'
                },
                {
                    height: '100vh',
                    ease: 'sine.Out',
                    delay: 0.5
                }
            )
            TweenLite.fromTo(
                '.about-image',
                0.2,
                {
                    opacity: '0'
                },
                {
                    opacity: '1',
                    ease: 'sine.Out',
                    delay: 1
                }
            )
            TweenLite.fromTo(
                '.nav',
                0.6,
                {
                    opacity: '0',
                    y: -50
                },
                {
                    opacity: '1',
                    y: 0,
                    ease: 'sine.Out',
                    delay: 1
                }
            )
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleY: 0,
                skewY: '-=20',
                ease: 'sine.Out',
                transformOrigin: '0px 150%',
                delay: 1.2
            })
            TweenLite.fromTo(
                '.about-quote',
                0.6,
                {
                    opacity: 0,
                    y: -50
                },
                {
                    opacity: 1,
                    y: 0,
                    ease: 'sine.Out',
                    delay: 1.4
                }
            )
            TweenLite.fromTo(
                '.about-content',
                0.6,
                {
                    opacity: 0,
                    y: -50
                },
                {
                    opacity: 1,
                    y: 0,
                    ease: 'sine.Out',
                    delay: 1.6
                }
            )
            TweenLite.fromTo(
                '.about-issue',
                0.7,
                {
                    opacity: '0'
                },
                {
                    opacity: 1,
                    ease: 'linear'
                }
            )
        }
        if (this.loader === false) enterPage()
        if (this.loader === true) {
            setTimeout(() => {
                enterPage()
            }, 2400)
        }

        const cursor = new Cursor(document.querySelector('.cursor'))
        ;[...document.querySelectorAll('a')].forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.emit('enter'))
            el.addEventListener('mouseleave', () => cursor.emit('leave'))
        })
        ;[...document.querySelectorAll('.about-issue')].forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.emit('enter'))
            el.addEventListener('mouseleave', () => cursor.emit('leave'))
        })
        let body = document.body
        body.style.height = this.$refs.about.clientHeight + 'px'
        setTimeout(() => {
            body.style.backgroundColor = '#121212'
        }, 1200)
    },
    methods: {
        ...mapMutations({
            IsNotWhite: 'IsNotWhite'
        })
    }
}
</script>

<style lang="scss" scoped>
.preload_img {
    position: fixed;
    width: 100vw;
    height: 0vh;
    background-image: url('https://adeona.s3.eu-west-3.amazonaws.com/APropos/Adeline.jpg');
    background-position: 0% 25%; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    z-index: 1;
}
.preload_background {
    position: fixed;
    width: 100vw;
    height: 0vh;
    background-color: #121212;
    z-index: 2;
}
.about-wrapper {
    padding: 10.313vw 8vw 0;
    margin: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    z-index: 3;
    .about-image {
        height: calc(100vh - 10.313vw);
        width: 40%;
        left: -8vw;
        position: relative;
        display: flex;
        opacity: 0;
        pointer-events: none;
        .image-mask {
            background-color: #121212;
            position: absolute;
            transform: scaleY(1);
            top: -2px;
            width: 100%;
            height: 100%;
            display: block;
            z-index: 2;
        }
        img {
            opacity: 0.94;
            width: 100%;
            height: 100%;
            position: absolute;
            object-fit: cover;
            object-position: 0% 50%;
        }
        .about-quote {
            position: absolute;
            width: 40vw;
            font-family: 'Playfair Display', serif;
            font-size: 5vw;
            color: white;
            left: calc(100% - 6.25vw);
            top: 8vw;
            z-index: 2;
            opacity: 0;
        }
    }
    .about-content {
        opacity: 0;
        display: flex;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        color: white;
        width: calc(65% - 11.25vw);
        margin-top: 25.75vw;
        .about-right {
            display: flex;
            flex-direction: column;
            .content-text {
                margin-top: 11.25vw;
                .paragraph {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 2vw;
                    line-height: normal;
                    letter-spacing: 0;
                    line-height: 3.125vw;
                }
            }
            .about-footer {
                color: #fff;
                margin-top: 3.75vw;
                padding-bottom: 8.125vw;
                display: flex;
                justify-content: space-between;
                .agency-representations,
                .credits {
                    width: calc(50% - 1.25vw);

                    span {
                        display: block;
                        font-family: 'Montserrat', sans-serif;
                        font-size: 0.875vw;
                        font-weight: bold;
                        line-height: normal;
                        letter-spacing: 0;
                        line-height: 1.3125vw;
                        letter-spacing: 0.125vw;
                        text-transform: uppercase;
                        margin-bottom: 0.625vw;
                        color: #fff;
                    }
                    ol,
                    ul {
                        list-style: none;
                    }
                    li {
                        list-style: none;
                        font-family: 'Montserrat', sans-serif;
                        font-size: 1.125vw;
                        line-height: normal;
                        letter-spacing: 0;
                        line-height: 1.875vw;
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>
