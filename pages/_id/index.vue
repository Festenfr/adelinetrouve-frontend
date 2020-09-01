<template>
    <div ref="serie" v-scroll="handleScroll" class="page serie ">
        <Nav />
        <div class="serie-wrapper">
            <div class="serie-image">
                <div class="image-mask"></div>
                <img :src="projectItem.file1" :alt="projectItem.titre" />
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
                        <div class="cache-texte"></div>
                        <a
                            :class="[show ? 'opaque' : 'nonopaque']"
                            class="chevron-down"
                        >
                            <svg
                                v-scroll-to="'.serie-gallery'"
                                style="width:32px;height:32px"
                                viewBox="0 0 24 24"
                                class="chevron-down-svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="serie-gallery">
            <div
                v-for="image in sortProjectItem"
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
                <div v-show="image.file2" class="relative-container-second">
                    <img :src="image.file2" alt="salon" class="image2" />
                </div>
            </div>
        </div>
        <div class="serie_footer">
            <nuxt-link class="serie_previous" to="/Couleur-de-Terre">
                <div class="back_arrow">
                    <a class="left">
                        <CarouselArrow />
                    </a>
                    <h3>De nuit et d'eau</h3>
                </div>
                <div class="date_serie">
                    <i>
                        Juillet 2020
                    </i>
                </div>
            </nuxt-link>
            <nuxt-link class="serie_next" to="/Couleur-de-Terre">
                <div class="date_serie">
                    <i>
                        Juillet 2020
                    </i>
                </div>
                <div class="onward_arrow">
                    <h3>De nuit et d'eau</h3>
                    <a class="right">
                        <CarouselArrow />
                    </a>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>
<script>
import CarouselArrow from '../../static/CarouselArrow'
import { TweenLite } from 'gsap/all'
import '../../directive/scroll'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'Projets',
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
            indexMin2: 1,
            scroll: '',
            show: true
        }
    },

    computed: {
        ...mapGetters({
            loader: 'loader',
            projectItemImage: 'projetImage/projectItem',
            projectItem: 'projetImage/projectItem1'
        }),
        sortProjectItem() {
            const yo = this.projectItemImage
            return yo.sort((v1, v2) => v1.placement - v2.placement)
        }
    },
    watch: {
        isVisible1() {
            if (this.isVisible1 === true) {
                TweenLite.fromTo(
                    this.images[this.indexMin1],
                    0.5,
                    {
                        scale: 0.95,
                        opacity: 0
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        ease: 'sine.Out'
                    }
                )
                if (this.images[this.indexMin1].dataset.src === 'duo') {
                    let image2 = document.querySelectorAll('.image2')[
                        this.indexMin1
                    ]
                    TweenLite.fromTo(
                        image2,
                        0.5,
                        {
                            scale: 0.95,
                            opacity: 0
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            ease: 'sine.Out'
                        }
                    )
                }
            } else if (this.isVisible1 === false) {
                TweenLite.fromTo(
                    this.images[this.indexMin1],
                    0.5,
                    {
                        scale: 1,
                        opacity: 1
                    },
                    {
                        scale: 0.95,
                        opacity: 0,
                        ease: 'sine.Out'
                    }
                )
                let image2
                if (this.images[this.indexMin1].dataset.src === 'duo') {
                    image2 = document.querySelectorAll('.image2')[
                        this.indexMin1
                    ]
                    TweenLite.fromTo(
                        image2,
                        0.5,
                        {
                            scale: 1,
                            opacity: 1
                        },
                        {
                            scale: 0.95,
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
                    0.5,
                    {
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        ease: 'sine.Out'
                    }
                )

                if (this.images[this.indexMin2].dataset.src === 'duo') {
                    let image2 = document.querySelectorAll('.image2')[
                        this.indexMin2
                    ]
                    TweenLite.fromTo(
                        image2,
                        0.5,
                        {
                            scale: 0.95,
                            opacity: 0
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            ease: 'sine.Out'
                        }
                    )
                }
            } else if (this.isVisible2 === false) {
                TweenLite.fromTo(
                    this.images[this.indexMin2],
                    0.5,
                    {
                        scale: 1,
                        opacity: 1
                    },
                    {
                        scale: 0.95,
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
                        0.5,
                        {
                            scale: 1,
                            opacity: 1
                        },
                        {
                            scale: 0.95,
                            opacity: 0,
                            ease: 'sine.Out'
                        }
                    )
                }
            }
        }
    },
    mounted() {
        if (this.projectItemImage !== 'undefined') {
            this.getIndex()
        }
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
                '.about-issue',
                0.5,
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
    },
    methods: {
        handleScroll() {
            this.scroll = window.scrollY
            if (this.scroll <= 50) {
                this.show = true
            } else {
                this.show = false
            }
        },
        getIndex() {
            if (typeof document !== 'undefined') {
                this.images = document.querySelectorAll('.image')
                let cacheTexte = document
                    .querySelector('.cache-texte')
                    .getBoundingClientRect()
                document.querySelector('.cache-texte').style.opacity = 0.9
                if (
                    window.innerHeight - cacheTexte.top <
                    window.innerHeight / 1.5
                ) {
                    document.querySelector('.cache-texte').style.opacity = 0.9
                    let translate = (1.8 * window.innerHeight) / cacheTexte.top
                    TweenLite.to('.cache-texte', 0.25, {
                        y: translate + 'vw',
                        ease: 'none'
                    })
                } else {
                    document.querySelector('.cache-texte').style.opacity = 0
                }
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

                let indexRef = top.indexOf(Math.min(...top))
                if (indexRef > -1) {
                    if (indexRef === 0) {
                        this.indexMin1 = 0
                        this.indexMin2 = 1
                    } else if (indexRef === top.length - 1) {
                        if (top.length % 2 === 0) {
                            this.indexMin1 = top.length - 1
                            this.indexMin2 = this.indexMin1 - 1
                        } else {
                            this.indexMin2 = top.length - 1
                            this.indexMin1 = this.indexMin2 - 1
                        }
                    } else if (indexRef % 2 === 0) {
                        this.indexMin1 = indexRef
                        if (top2[indexRef] >= 10) {
                            this.indexMin2 = indexRef - 1
                        } else {
                            this.indexMin2 = indexRef + 1
                        }
                    } else if (indexRef % 2 === 1) {
                        if (top2[indexRef] >= 10) {
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
                if (typeof this.images[this.indexMin1] !== 'undefined') {
                    if (this.images[this.indexMin1].dataset.src === 'duo') {
                        let translate1 =
                            -(
                                this.images[
                                    this.indexMin1
                                ].getBoundingClientRect().top /
                                window.innerHeight
                            ) * 4
                        TweenLite.to(
                            this.images[this.indexMin1].parentElement,
                            0.25,
                            {
                                y: translate1 + 'vw',
                                ease: 'none'
                            }
                        )
                    }
                }
                if (typeof this.images[this.indexMin2] !== 'undefined') {
                    if (this.images[this.indexMin2].dataset.src === 'duo') {
                        let translate2 =
                            -(
                                this.images[
                                    this.indexMin2
                                ].getBoundingClientRect().top /
                                window.innerHeight
                            ) * 4
                        TweenLite.to(
                            this.images[this.indexMin2].parentElement,
                            0.25,
                            {
                                y: translate2 + 'vw',
                                ease: 'none'
                            }
                        )
                    }
                }
            }
            window.requestAnimationFrame(this.getIndex)
        },
        ...mapMutations({
            createCursor: 'createCursor',
            IsWhite: 'IsWhite'
        })
    },
    head() {
        return {
            title: `${this.projectItem.titre}`,
            meta: [
                {
                    hid: `${this.projectItem.titre}`,
                    name: 'description',
                    content: `${this.projectItem.description}`
                }
            ]
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
        }
    }
}
</script>

<style lang="scss" scoped>
.opaque {
    opacity: 1;
    transform: translateY(0px);
    transition: 0.5s ease-out;
}
.nonopaque {
    opacity: 0;
    transform: translateY(60px);
    transition: 0.5s ease-out;
}
.chevron-down-svg {
    width: 32px;
    height: 32px;
    cursor: pointer;
    color: black;
    transition: 0.5s ease-in-out;
}
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
                            white-space: pre-line;
                            font-family: 'Montserrat', sans-serif;
                            font-size: 1vw;
                            line-height: normal;
                            letter-spacing: 0;
                            line-height: 1.875vw;
                        }
                    }
                }
                .cache-texte {
                    position: absolute;
                    bottom: -10vh;
                    background-color: #fcf9f5;
                    opacity: 0.9;
                    z-index: 1;
                    width: 30vw;
                    height: 18vh;
                }
                .chevron-down {
                    position: absolute;
                    bottom: 0;
                    z-index: 2;
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
.serie_footer {
    margin-top: 42vh;
    margin-bottom: 42vh;
    position: relative;
    display: flex;
    flex-direction: column;
    bottom: 3vh;
    left: 20vw;
    width: 60vw;
    height: 18vh;
    border-top: 1px solid black;
    .serie_previous {
        color: black;
        text-decoration: none;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 8vh;
        border-bottom: 1px solid black;
        .back_arrow {
            h3 {
                margin-left: 10px;
                transition: 0.2s ease-in;
            }
            display: flex;
            .left {
                text-decoration: none;
                cursor: pointer;
                svg {
                    position: relative;
                    margin-right: 1.25vw;
                    width: 1.2vw;
                    margin-top: 4px;
                }
            }
        }
        &:hover {
            .back_arrow {
                h3 {
                    margin-left: 0px;
                    transition: 0.2s ease-in;
                }
            }
        }
        .date_serie {
            font-size: 12px;
        }
    }
    .serie_next {
        text-decoration: none;
        color: black;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 8vh;
        .onward_arrow {
            h3 {
                transition: 0.2s ease-in;
                margin-right: 10px;
                text-align: center;
            }
            display: flex;
            .right {
                text-decoration: none;
                cursor: pointer;
                svg {
                    margin-top: 4px;
                    position: relative;
                    margin-left: 1.25vw;
                    transform: rotate(180deg);
                    width: 1.2vw;
                }
            }
        }
        &:hover {
            .onward_arrow {
                h3 {
                    margin-right: 0px;
                    transition: 0.2s ease-in;
                }
            }
        }
        .date_serie {
            font-size: 12px;
        }
    }
}
</style>
