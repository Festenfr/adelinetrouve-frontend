<template>
    <div class="wrapper-slider">
        <div class="left-col">
            <CarouselSlideImage
                v-for="(project, i) in filterProjectItem"
                :key="project._id"
                :index="i"
                class="little-img image-transition-preload"
                :direction="direction"
            >
                <div class="image-mask"></div>
                <a
                    style="text-decoration:none; color:black; cursor: pointer;"
                    @click="goTo(`/${project.titre.replace(/ /g, '-')}`)"
                >
                    <img :src="project.file1" alt="Adeline Trouvé" />
                </a>
            </CarouselSlideImage>
            <div class="slider-nav">
                <a class="left" @click="previous()">
                    <CarouselArrow />
                    <span>
                        Précedent
                    </span>
                </a>
                <div class="index">
                    <span class="current-index">{{ index + 1 }}</span>
                    <span>/</span>
                    <span class="total">{{ slidesCount }}</span>
                </div>
                <a class="right" @click="next()">
                    <span>
                        Suivant
                    </span>
                    <CarouselArrow />
                </a>
            </div>
            <CarouselSlideText
                v-for="(project, i) in filterProjectItem"
                :key="project.titre"
                :index="i"
                :direction="direction"
                class="series-info"
            >
                <div class="title">
                    <h3>
                        <a
                            style="text-decoration:none; color:black;cursor: pointer;"
                            @click="
                                goTo(`/${project.titre.replace(/ /g, '-')}`)
                            "
                        >
                            {{ project.titre }}
                        </a>
                    </h3>
                </div>

                <div class="date">
                    <p>
                        <span>
                            ©
                        </span>
                        {{ project.date }}
                    </p>
                </div>
            </CarouselSlideText>
            <div class="chevron-down">
                <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                    />
                </svg>
            </div>
        </div>
        <div class="right-col">
            <CarouselSlideImage
                v-for="(project, i) in filterProjectItem"
                :key="project.date"
                :index="i"
                :direction="direction"
                class="big-img image-transition-preload"
            >
                <div class="image-mask2"></div>
                <a
                    style="text-decoration:none; color:black; cursor: pointer;"
                    @click="goTo(`/${project.titre.replace(/ /g, '-')}`)"
                >
                    <img :src="project.file2" alt="Adeline Trouvé" />
                </a>
            </CarouselSlideImage>
        </div>
    </div>
</template>
<script>
import CarouselArrow from '../static/CarouselArrow'
import CarouselSlideImage from '../components/CarouselSlideImage'
import CarouselSlideText from '../components/CarouselSlideText'
import { mapGetters } from 'vuex'
export default {
    components: {
        CarouselSlideImage,
        CarouselSlideText,
        CarouselArrow
    },
    async fetch() {
        await this.$store.dispatch('projet/fetchProjectsItem')
    },
    data() {
        return {
            index: 0,
            direction: ''
        }
    },
    computed: {
        ...mapGetters({
            animate: 'animate',
            projectItem: 'projet/projectItem'
        }),
        filterProjectItem() {
            return this.projectItem.filter((el) => el.isCarousel === true)
        },
        slidesCount() {
            return this.filterProjectItem.length
        }
    },
    methods: {
        goTo(page) {
            $nuxt._router.push(`${page}`)
        },
        previous() {
            if (this.animate === false) {
                this.direction = 'Left'
                if (this.index === 0) {
                    this.index = this.slidesCount - 1
                } else {
                    this.index--
                }
            }
        },
        next() {
            if (this.animate === false) {
                this.direction = 'Right'
                if (this.index >= this.slidesCount - 1) {
                    this.index = 0
                } else {
                    this.index++
                }
            }
        }
    }
}
</script>

<style lang="scss">
.wrapper-slider {
    position: relative;
    padding-left: 8vw;
    padding-right: 8vw;
    margin-bottom: 30vh;
    width: 100vw;
    z-index: 3;
    top: 20vh;
    height: 80vh;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .left-col {
        height: 100%;
        width: 50%;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: flex-start;
        .slider-nav {
            display: flex;
            justify-content: space-between;
            margin-top: 2.75vh;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.875vw;
            line-height: normal;
            letter-spacing: 0;
            letter-spacing: 0.125vw;
            text-transform: uppercase;
            .right {
                cursor: pointer;
                svg {
                    position: relative;
                    margin-left: 1.25vw;
                    transform: rotate(180deg);
                    width: 1.2vw;
                }
            }
            .index {
                display: flex;
                width: 5vw;
                justify-content: space-around;

                span {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.875vw;
                    line-height: normal;
                    letter-spacing: 0;
                }
            }
            .left {
                cursor: pointer;
                svg {
                    position: relative;
                    margin-right: 1.25vw;
                    width: 1.2vw;
                }
            }
        }
        .series-info {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            .title {
                width: 100%;
                text-align: right;
                font-family: 'Playfair Display', serif;
                font-size: 5vw;
                line-height: normal;
                font-weight: normal;
                letter-spacing: 0;
                h3 {
                    font-weight: normal;
                    line-height: 5.5vw;
                }
            }
            .date {
                text-align: right;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.875vw;
                line-height: normal;
                letter-spacing: 0.125vw;
                line-height: 1.875vw;
                p {
                    span {
                        font-family: 'Montserrat', sans-serif;
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
        .chevron-down {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
        .little-img {
            width: 100%;
            .image-mask {
                top: -1px;
                background-color: #fcf9f5;
                position: absolute;
                transform: scaleX(1);
                width: 101%;
                height: 20%;
                display: block;
                z-index: 2;
            }
            img {
                position: relative;
                width: 100%;
                overflow: hidden;
                left: 1px;
                height: 12.5vh;
            }
            .wrapper-info {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 80%;
            }
        }
    }

    .right-col {
        position: relative;
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: flex-end;
        .big-img {
            height: 100%;
            .image-mask2 {
                background-color: #fcf9f5;
                position: absolute;
                transform: scaleX(1);
                width: 101%;
                height: 100%;
                display: block;
                z-index: 2;
            }
            img {
                z-index: 1;
                position: relative;
                right: 0;
                height: 100%;
            }
        }
    }
}
</style>
