<template>
    <div>
        <div ref="serie" class="page serie ">
            <Nav />
            <div class="serie-wrapper">
                <div class="serie-image">
                    <div class="image-mask"></div>
                    <img
                        :src="projectItem.file1"
                        data-load="preload"
                        alt="Adeline Trouvé"
                    />
                </div>
                <div class="serie-content">
                    <div class="serie-right">
                        <div class="content-text">
                            <nuxt-link to="/" class="back">
                                <CarouselArrow />
                                <span>
                                    Retour en galerie
                                </span>
                            </nuxt-link>
                            <div class="serie-titre">
                                <div class="titre">
                                    <h3 style="font-weight: 400;">
                                        {{ projectItem.titre }}
                                    </h3>
                                </div>
                                <div class="date">
                                    <p>
                                        <span class="copyright">
                                            ©
                                        </span>
                                        {{ projectItem.date }}
                                    </p>
                                </div>
                            </div>
                            <div class="serie-info">
                                <div class="serie-info-description">
                                    <span>à propos du projet</span>
                                    <p>
                                        {{ projectItem.description }}
                                    </p>
                                </div>
                            </div>
                            <div class="chevron-down">
                                <svg
                                    style="width:32px;height:32px"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="serie-gallery">
                <div
                    v-for="image in projectItemImage"
                    :key="image._id"
                    class="gallery-item"
                    :class="image.type"
                >
                    <div class="relative-container-first">
                        <img
                            class="image"
                            :src="image.file1"
                            :data-src="image.type"
                            alt="salon"
                            style="opacity: 0;"
                        />
                    </div>
                    <div v-if="image.file2" class="relative-container-second">
                        <img :src="image.file2" alt="salon" class="image2" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CarouselArrow from '../../static/CarouselArrow'
import { TweenLite } from 'gsap/all'
import '../../directive/scroll'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        CarouselArrow
    },
    async fetch() {
        await this.$store.dispatch('projetImage/fetchProjectsItem', {
            titre: this.$route.params.id.replace(/-/g, ' ')
        })
        await this.$store.dispatch('projetImage/fetchProjectsItem1', {
            titre: this.$route.params.id.replace(/-/g, ' ')
        })
    },
    data() {
        return {
            isVisible1: false,
            isVisible2: false,
            images: '',
            indexMin1: 0,
            indexMin2: 1
        }
    },
    computed: {
        ...mapGetters({
            loader: 'loader',
            projectItemImage: 'projetImage/projectItem',
            projectItem: 'projetImage/projectItem1'
        })
    },
    watch: {
        isVisible1() {
            if (this.isVisible1 === true) {
                TweenLite.fromTo(
                    this.images[this.indexMin1],
                    0.7,
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1,
                        ease: 'sine.Out'
                    }
                )
                if (this.images[this.indexMin1].dataset.src === 'duo') {
                    const image2 = document.querySelectorAll('.image2')[
                        this.indexMin1
                    ]
                    TweenLite.fromTo(
                        image2,
                        0.7,
                        {
                            opacity: 0
                        },
                        {
                            opacity: 1,
                            ease: 'sine.Out'
                        }
                    )
                }
            } else if (this.isVisible1 === false) {
                TweenLite.fromTo(
                    this.images[this.indexMin1],
                    0.7,
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0,
                        ease: 'sine.Out'
                    }
                )
                if (this.images[this.indexMin1].dataset.src === 'duo') {
                    const image2 = document.querySelectorAll('.image2')[
                        this.indexMin1
                    ]
                    TweenLite.fromTo(
                        image2,
                        0.7,
                        {
                            opacity: 1
                        },
                        {
                            opacity: 0,
                            ease: 'sine.Out'
                        }
                    )
                }
            }
        },
        isVisible2() {
            if (this.isVisible2 === true) {
                TweenLite.fromTo(
                    this.images[this.indexMin2],
                    0.7,
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1,
                        ease: 'sine.Out'
                    }
                )
                if (this.images[this.indexMin2].dataset.src === 'duo') {
                    const image2 = document.querySelectorAll('.image2')[
                        this.indexMin2
                    ]
                    TweenLite.fromTo(
                        image2,
                        0.7,
                        {
                            opacity: 0
                        },
                        {
                            opacity: 1,
                            ease: 'sine.Out'
                        }
                    )
                }
            } else if (this.isVisible2 === false) {
                TweenLite.fromTo(
                    this.images[this.indexMin2],
                    0.7,
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0,
                        ease: 'sine.Out'
                    }
                )
                if (this.images[this.indexMin2].dataset.src === 'duo') {
                    const image2 = document.querySelectorAll('.image2')[
                        this.indexMin2
                    ]
                    TweenLite.fromTo(
                        image2,
                        0.7,
                        {
                            opacity: 1
                        },
                        {
                            opacity: 0,
                            ease: 'sine.Out'
                        }
                    )
                }
            }
        }
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
                '.serie-gallery',
                1.2,
                {
                    opacity: '1'
                },
                {
                    opacity: '0',
                    ease: 'sine.Out'
                }
            )
            TweenLite.fromTo(
                '.serie-content',
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
                '.serie-quote',
                0.8,
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
                scaleY: 1,
                ease: 'sine.Out',
                transformOrigin: '0% 0%'
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
            TweenLite.fromTo(
                '.serie-issue',
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
        this.createCursor()
        this.IsWhite()
        function enterPage() {
            TweenLite.fromTo(
                '.serie-gallery',
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
                '.serie-image',
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
                transformOrigin: '0% 100%',
                delay: 2.2
            })
            TweenLite.fromTo(
                '.serie-content',
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
                '.serie-issue',
                0.7,
                {
                    opacity: '0'
                },
                {
                    delay: 2,
                    opacity: 1,
                    ease: 'linear'
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
            body.style.height = this.$refs.serie.clientHeight + 'px'
            body.style.backgroundColor = '#fcf9f5'
        }, 1200)
        setInterval(() => {
            this.images = document.querySelectorAll('.image')
            let rect = []
            this.images.forEach((el) => {
                rect.push(el.getBoundingClientRect())
            })
            let top = []
            let top2 = []
            rect.map((el) => {
                top.push(Math.abs(el.top))
                top2.push(el.top)
            })

            const indexRef = top.indexOf(Math.min(...top))
            if (indexRef > -1) {
                if (indexRef === 0) {
                    this.indexMin1 = 0
                    this.indexMin2 = 1
                } else if (indexRef === top.length) {
                    if (top.length % 2 === 0) {
                        this.indexMin1 = top.length
                        this.indexMin2 = this.indexMin1 - 1
                    } else {
                        this.indexMin2 = top.length
                        this.indexMin1 = this.indexMin2 - 1
                    }
                } else if (indexRef % 2 === 0) {
                    this.indexMin1 = indexRef
                    if (top2[indexRef] >= 50) {
                        this.indexMin2 = indexRef - 1
                    } else {
                        this.indexMin2 = indexRef + 1
                    }
                } else if (indexRef % 2 === 1) {
                    if (top2[indexRef] >= 50) {
                        this.indexMin1 = indexRef - 1
                    } else {
                        this.indexMin1 = indexRef + 1
                    }
                    this.indexMin2 = indexRef
                }
            }
            if (
                top[this.indexMin1] - window.innerHeight >
                -window.innerHeight / 10
            ) {
                this.isVisible1 = false
            } else if (
                top[this.indexMin1] - window.innerHeight <
                -window.innerHeight / 10
            ) {
                this.isVisible1 = true
            }
            if (
                top[this.indexMin2] - window.innerHeight >
                -window.innerHeight / 10
            ) {
                this.isVisible2 = false
            } else if (
                top[this.indexMin2] - window.innerHeight <
                -window.innerHeight / 10
            ) {
                this.isVisible2 = true
            }

            if (this.images[this.indexMin1].dataset.src === 'duo') {
                let translate1 =
                    -(
                        this.images[this.indexMin1].getBoundingClientRect()
                            .top / window.innerHeight
                    ) * 4
                TweenLite.to(this.images[this.indexMin1].parentElement, 0.25, {
                    y: translate1 + 'vw',
                    ease: 'none'
                })
            }
            if (this.images[this.indexMin2].dataset.src === 'duo') {
                let translate2 =
                    -(
                        this.images[this.indexMin2].getBoundingClientRect()
                            .top / window.innerHeight
                    ) * 4
                TweenLite.to(this.images[this.indexMin2].parentElement, 0.25, {
                    y: translate2 + 'vw',
                    ease: 'none'
                })
            }
        }, 150)
    },
    methods: {
        ...mapMutations({
            createCursor: 'createCursor',
            IsWhite: 'IsWhite'
        })
    }
}
</script>

<style lang="scss" scoped>
.serie-wrapper {
    margin: auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 3;
    .serie-image {
        height: 100vh;
        width: 70.69555302166477vh;
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        opacity: 0;
        pointer-events: none;
        .image-mask {
            background-color: #fcf9f5;
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
    }
    .serie-content {
        position: relative;
        opacity: 0;
        display: flex;
        justify-content: flex-start;
        color: black;
        top: 20vh;
        width: 55vw;
        height: 80vh;

        .serie-right {
            display: flex;
            flex-direction: column;
            .content-text {
                .back {
                    text-decoration: none;
                    color: black;
                    font-weight: bold;
                    text-transform: uppercase;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.875vw;
                    line-height: normal;
                    letter-spacing: 0;
                    line-height: 1.875vw;
                    letter-spacing: 0.125vw;
                }
                .serie-titre {
                    flex-direction: column;
                    max-width: 50vw;
                    margin-top: 3vw;
                    z-index: 2;
                    .titre {
                        font-family: 'Playfair Display', serif;
                        font-size: 5vw;
                        line-height: normal;
                        letter-spacing: 0;
                    }
                    .date {
                        font-family: 'Montserrat', sans-serif;
                        font-size: 0.875vw;
                        line-height: normal;
                        letter-spacing: 0;
                        margin-top: 1vw;
                        letter-spacing: 0.125vw;
                        line-height: 1.875vw;
                        p {
                            box-sizing: border-box;
                            color: #121212;
                            .copyright {
                                font-size: 1.25vw;
                                line-height: normal;
                                letter-spacing: 0;
                                position: relative;
                                top: 0.125vw;
                                padding-right: 0.625vw;
                            }
                        }
                    }
                }
                .serie-info {
                    display: flex;
                    justify-content: space-between;
                    max-width: 30vw;
                    margin-top: 3vw;
                    z-index: 2;
                    width: 100%;
                    .serie-info-description {
                        span {
                            font-weight: bold;
                            display: block;
                            font-family: 'Montserrat', sans-serif;
                            font-size: 0.875vw;
                            line-height: normal;
                            letter-spacing: 0;
                            line-height: 1.3125vw;
                            letter-spacing: 0.125vw;
                            text-transform: uppercase;
                            margin-bottom: 0.45vw;
                        }
                        p {
                            font-family: 'Montserrat', sans-serif;
                            font-size: 1vw;
                            line-height: normal;
                            letter-spacing: 0;
                            line-height: 1.875vw;
                        }
                    }
                }
                .chevron-down {
                    position: absolute;
                    bottom: 0;
                }
            }
        }
    }
}
.serie-gallery {
    max-width: 80vw;
    left: 10vw;
    position: relative;
    opacity: 1;
    .gallery-item.duo {
        margin-top: 13.438vw;
        margin-bottom: 12.5vw;
        display: flex;
        justify-content: space-around;
        height: 50vw;
        width: 100%;
        .relative-container-first {
            position: relative;
            max-width: 100%;
            width: 100%;
            overflow: hidden;
            img {
                height: 100%;
            }
        }
        .relative-container-second {
            position: relative;
            max-width: 100%;
            width: 100%;
            transform: translateY(50px);
            overflow: hidden;
            img {
                height: 100%;
            }
        }
    }
    .gallery-item.paysage {
        margin-top: 13.438vw;
        margin-bottom: 12.5vw;
        display: flex;
        justify-content: center;
        width: 100%;
        .relative-container-first {
            position: relative;
            display: flex;
            justify-content: center;
            max-width: 100%;
            width: 100%;
            overflow: hidden;
            img {
                max-width: 60vw;
            }
        }
    }
    .gallery-item.portrait {
        margin-top: 13.438vw;
        margin-bottom: 12.5vw;
        display: flex;
        justify-content: center;
        height: 50vw;
        width: 100%;
        .relative-container-first {
            position: relative;
            display: flex;
            justify-content: center;
            max-width: 100%;
            width: 100%;
            overflow: hidden;
            img {
                height: 100%;
            }
        }
    }
}
</style>
