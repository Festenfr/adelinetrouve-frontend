<template>
    <div>
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
                            " Réaliser des espaces uniques pour des clients
                            uniques "
                        </h3>
                    </div>
                </div>
                <div class="about-content">
                    <div class="about-right">
                        <div class="content-text">
                            <div class="paragraph">
                                <p>
                                    Adeline Trouvé, diplomée en design d’espace
                                    à Bordeaux et d’une licence d’arts
                                    plastiques et science de l’art à la
                                    Sorbonne, a travaillé comme Architecte
                                    d’Intérieur dans plusieurs agences ce qui
                                    lui a permis, en plus de l’expérience
                                    acquise, d’affiner les critères de son
                                    avenir professionnel. <br />
                                    <br />
                                    Ce qui la fait vibrer ? Voir le sourire de
                                    ses clients à qui elle livre leur projet de
                                    vie. De nature passionnée et proche des
                                    gens, imaginer, créer, réaliser, aider,
                                    conseiller, et surtout vivre de nouvelles
                                    experiences est essentielles pour elle.
                                    <br />
                                    <br />
                                    Son domaine d’intervention va de la
                                    restructuration de lieux jusqu’à la
                                    décoration pure. Elle vous accompagne donc
                                    dans toutes les étapes du projet :
                                    définition du plan idéal d’aménagement,
                                    conception détaillée (choix des matériaux,
                                    éclairage, meubles sur mesure), consultation
                                    des entreprises et direction des travaux.
                                    Mais intervient aussi dans différents
                                    secteurs du bâtiment : habitations,
                                    restaurants, boutiques.
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
                                    <li>
                                        <a
                                            href="https://www.face-sa.fr/filiales/lcb/"
                                            target="_blank"
                                            rel="noopener"
                                            style="color:white; "
                                        >
                                            LCB Bardage</a
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
import { TweenLite } from 'gsap/all'
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            loader: 'loader',
            pageName: 'pageName'
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
                '.about-issue',
                0.6,
                {
                    opacity: '1'
                },
                {
                    opacity: 0,
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.about-content',
                0.8,
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
                0.8,
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
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleY: 1,
                ease: 'sine.Out',
                transformOrigin: '0px 0%'
            })
            TweenLite.fromTo(
                '.nav',
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: 0,
                    y: 50,
                    ease: 'sine.Out',
                    delay: 0.4,
                    onComplete: done
                }
            )
        }
    },
    mounted() {
        this.createCursor()
        this.IsNotWhite()

        function enterPage() {
            TweenLite.fromTo(
                '.about-image',
                0.2,
                {
                    opacity: '0'
                },
                {
                    opacity: '1',
                    ease: 'sine.Out',
                    delay: 2
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
                    delay: 2
                }
            )
            TweenLite.to('.image-mask', 1.2, {
                visibility: 'visible',
                scaleY: 0,
                ease: 'sine.Out',
                transformOrigin: '0px 101%',
                delay: 2.2
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
                    delay: 2.4
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
                    delay: 2.7
                }
            )
            TweenLite.fromTo(
                '.about-issue',
                0.7,
                {
                    opacity: '0'
                },
                {
                    delay: 2.4,
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

        let body = document.body
        body.style.height = 100 + 'vh'
        setTimeout(() => {
            body.style.height = this.$refs.about.clientHeight + 'px'
            body.style.backgroundColor = '#121212'
        }, 1300)
    },
    methods: {
        ...mapMutations({
            createCursor: 'createCursor',
            IsNotWhite: 'IsNotWhite'
        })
    }
}
</script>

<style lang="scss" scoped>
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
            width: 50vw;
            font-family: 'Playfair Display', serif;
            font-size: 4vw;
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
                margin-top: 6vw;
                .paragraph {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 1.5vw;
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
