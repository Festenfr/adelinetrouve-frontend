<template>
    <div v-scroll="handleScroll">
        <div v-for="project in filterProjectItem" :key="project._id">
            <div class="container2">
                <div class="tile__figure">
                    <a
                        class="titre-project"
                        @click="goTo(`/${project.titre.replace(/ /g, '-')}`)"
                    >
                        <h3 class="titre">
                            {{ project.titre }}
                        </h3>
                        <div class="explore">Explore</div>
                    </a>
                    <img
                        crossorigin="anonymous"
                        :src="project.file1"
                        :data-src="project.file1"
                        :data-hover="project.file2"
                        class="tile__image"
                        :alt="project.titre"
                    />
                </div>
                <canvas id="stage"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import { TweenMax as TM } from 'gsap'
import * as THREE from 'three'
import '../directive/scroll'
import { fragmentShader } from '../modules/fragmentShader'
import { vertexShader } from '../modules/vertexShader'
import { mapMutations, mapGetters } from 'vuex'
export default {
    async fetch() {
        await this.$store.dispatch('projet/fetchProjectsItem')
    },
    data() {
        return {
            titreProject: '',
            titre: '',
            hover: '',
            hoverX: '',
            hoverY: '',
            container: '',
            scene: '',
            renderer: '',
            $image: '',
            loaderThree: '',
            image: '',
            hoverImage: '',
            sizes: '',
            offset: '',
            mouse: '',
            mesh: '',
            camera: '',
            geometry: '',
            material: '',
            uniforms: 0,
            oldValue: 0,
            indexMin1: 0,
            indexMin2: 1,
            isFirstInit: true,

            titreProject2: '',
            titre2: '',
            hover2: '',
            hoverX2: '',
            hoverY2: '',
            container2: '',
            scene2: '',
            renderer2: '',
            $image2: '',
            loaderThree2: '',
            image2: '',
            hoverImage2: '',
            sizes2: '',
            offset2: '',
            mouse2: '',
            mesh2: '',
            camera2: '',
            geometry2: '',
            material2: '',
            uniforms2: 0,
            oldValue2: 0,
            isFirstInit2: true,
            images: []
        }
    },
    computed: {
        ...mapGetters({
            projectItem: 'projet/projectItem'
        }),
        filterProjectItem() {
            return this.projectItem.filter((el) => el.isCarousel === false)
        }
    },
    watch: {
        indexMin1() {
            this.init()
        },
        indexMin2() {
            this.init2()
        },
        hover() {
            if (this.hover) {
                this.imageEnter()
            } else {
                this.imageLeave()
            }
        },
        hover2() {
            if (this.hover2) {
                this.imageEnter()
            } else {
                this.imageLeave()
            }
        }
    },
    mounted() {
        if (this.filterProjectItem[0]) {
            this.init()
        }
        if (this.filterProjectItem[1]) {
            this.init2()
        }
    },
    methods: {
        ...mapMutations({
            imageLeave: 'imageLeave',
            imageEnter: 'imageEnter'
        }),
        handleScroll() {
            this.images = document.querySelectorAll('.tile__image')
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
        },
        goTo(page) {
            $nuxt._router.push(`${page}`)
        },
        //scene 1
        init() {
            const images = document.querySelectorAll('.tile__image')
            const titres = document.querySelectorAll('.titre-project')
            const containers = document.querySelectorAll('#stage')
            this.$image = images[this.indexMin1]

            this.container = containers[this.indexMin1]
            this.titreProject = titres[this.indexMin1]

            this.scene = new THREE.Scene()
            this.initLights()
            this.initCamera()
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.container,
                alpha: true
            })
            this.loaderThree = new THREE.TextureLoader()

            this.image = this.loaderThree.load(this.$image.src, () => {
                this.start()
            })

            window.addEventListener('mousemove', (ev) => {
                this.onMouseMove(ev)
            })
            this.hoverImage = this.loaderThree.load(this.$image.dataset.hover)
            this.$image.style.opacity = 0
            this.sizes = new THREE.Vector2(0, 0)
            this.offset = new THREE.Vector2(0, 0)
            this.mouse = new THREE.Vector2(0, 0)

            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.renderer.setPixelRatio(window.devicePixelRatio)
        },
        start() {
            this.getSizes()
            this.createMesh()
            if (this.isFirstInit) {
                this.update1()
            }
            this.isFirstInit = false
        },
        getSizes() {
            const {
                width,
                height,
                top,
                left
            } = this.$image.getBoundingClientRect()
            this.sizes.set(width, height)
            this.randNumber =
                Math.floor(
                    (Math.random() * window.innerWidth) / 2 -
                        window.innerWidth / 4
                ) +
                window.innerWidth / 2 -
                width / 2 -
                left

            this.offset.set(
                Math.floor(
                    (Math.random() * window.innerWidth) / 2 -
                        window.innerWidth / 4
                ) +
                    window.innerWidth / 2 -
                    width / 2 -
                    left,
                top * 0
            )
        },

        createMesh() {
            ;(this.uniforms = {
                u_image: { type: 't', value: this.image },
                u_imagehover: { type: 't', value: this.hoverImage },
                u_mouse: { value: this.mouse },
                u_time: { value: 0 },
                u_progressHover: { value: 0 },
                u_res: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        window.innerHeight
                    )
                }
            }),
                (this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1))
            this.material = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                defines: {
                    PR: window.devicePixelRatio.toFixed(1)
                }
            })

            this.mesh = new THREE.Mesh(this.geometry, this.material)

            this.mesh.position.set(this.offset.x, this.offset.y, 0)
            this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)

            if (this.mesh.position.x >= 0) {
                this.titre = this.titreProject.children[0]
                this.titreProject.style.textAlign = 'right'
                this.titreProject.style.alignItems = 'flex-end'
                this.titreProject.style.left =
                    -window.innerWidth / 4 +
                    window.innerWidth / 2 +
                    -this.mesh.scale.x / 2 +
                    this.mesh.position.x -
                    100 +
                    'px'
            } else {
                this.titre = this.titreProject.children[0]
                this.titreProject.style.textAlign = 'left'
                this.titreProject.style.alignItems = 'flex-start'
                this.titreProject.style.left =
                    window.innerWidth / 2 +
                    this.mesh.scale.x / 2 +
                    this.mesh.position.x +
                    80 +
                    'px'
            }

            this.scene.add(this.mesh)
        },

        onMouseMove(event) {
            let rect = this.$image.getBoundingClientRect()
            const x =
                event.clientX -
                this.mesh.position.x -
                window.innerWidth / 2 +
                this.mesh.scale.x / 2
            const y = event.clientY - rect.top
            if (x > 0 && x < rect.width) {
                this.hoverX = true
            } else {
                this.hoverX = false
            }
            if (y > 0 && y < rect.height) {
                this.hoverY = true
            } else {
                this.hoverY = false
            }
            if (this.hoverX && this.hoverY) {
                this.hover = true
                TM.to(this.mouse, 0.5, {
                    x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
                    y: ((-event.clientY + rect.top) / rect.height) * 2 + 1
                })
            }
            if (this.hoverX === false || this.hoverY === false) {
                this.hover = false
            }
        },

        initLights() {
            const ambientlight = new THREE.AmbientLight(0xffffff, 2)
            this.scene.add(ambientlight)
        },
        initCamera() {
            const perspective = 800
            const fov =
                (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) /
                Math.PI

            this.camera = new THREE.PerspectiveCamera(
                fov,
                window.innerWidth / window.innerHeight,
                1,
                1000
            )
            this.camera.position.set(0, 0, perspective)
        },

        update1() {
            if (this.hoverX && this.hoverY) {
                this.uniforms.u_time.value += 0.006
                if (this.uniforms.u_progressHover.value < 1) {
                    this.uniforms.u_progressHover.value += 0.015
                }
            } else {
                if (this.uniforms.u_progressHover.value > 0.015) {
                    this.uniforms.u_time.value += 0.006
                    this.uniforms.u_progressHover.value -= 0.015
                } else {
                    this.uniforms.u_progressHover.value = 0
                    this.uniforms.u_time.value += 0.0
                }
            }
            this.renderer.render(this.scene, this.camera)
            requestAnimationFrame(this.update1)
        },

        //scene 2
        init2() {
            const images = document.querySelectorAll('.tile__image')
            const containers = document.querySelectorAll('#stage')
            const titres = document.querySelectorAll('.titre-project')
            this.$image2 = images[this.indexMin2]
            this.container2 = containers[this.indexMin2]
            this.titreProject2 = titres[this.indexMin2]

            this.scene2 = new THREE.Scene()
            this.initLights2()
            this.initCamera2()
            this.renderer2 = new THREE.WebGLRenderer({
                canvas: this.container2,
                alpha: true
            })
            this.loaderThree2 = new THREE.TextureLoader()
            window.addEventListener('mousemove', (ev) => {
                this.onMouseMove2(ev)
            })
            this.image2 = this.loaderThree2.load(this.$image2.src, () => {
                this.start2()
            })
            this.hoverImage2 = this.loaderThree2.load(
                this.$image2.dataset.hover
            )
            this.$image2.style.opacity = 0
            this.sizes2 = new THREE.Vector2(0, 0)
            this.offset2 = new THREE.Vector2(0, 0)
            this.mouse2 = new THREE.Vector2(0, 0)

            this.renderer2.setSize(window.innerWidth, window.innerHeight)
            this.renderer2.setPixelRatio(window.devicePixelRatio)
        },
        start2() {
            this.getSizes2()
            this.createMesh2()
            if (this.isFirstInit2) {
                this.update2()
            }
            this.isFirstInit2 = false
        },
        getSizes2() {
            const {
                width,
                height,
                top,
                left
            } = this.$image2.getBoundingClientRect()
            this.sizes2.set(width, height)
            this.offset2.set(
                Math.floor(
                    (Math.random() * window.innerWidth) / 2 -
                        window.innerWidth / 4
                ) +
                    window.innerWidth / 2 -
                    width / 2 -
                    left,
                top * 0
            )
        },

        createMesh2() {
            this.uniforms2 = {
                u_image: { type: 't', value: this.image2 },
                u_imagehover: { type: 't', value: this.hoverImage2 },
                u_mouse: { value: this.mouse2 },
                u_progressHover: { value: 0 },
                u_time: { value: 0 },
                u_res: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        window.innerHeight
                    )
                }
            }
            this.geometry2 = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
            this.material2 = new THREE.ShaderMaterial({
                uniforms: this.uniforms2,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                defines: {
                    PR: window.devicePixelRatio.toFixed(1)
                }
            })

            this.mesh2 = new THREE.Mesh(this.geometry2, this.material2)

            this.mesh2.position.set(this.offset2.x, this.offset2.y, 0)

            this.mesh2.scale.set(this.sizes2.x, this.sizes2.y, 1)

            if (this.offset2.x >= 0) {
                this.titre2 = this.titreProject2.children[0]
                this.titreProject2.style.textAlign = 'right'
                this.titreProject2.style.alignItems = 'flex-end'
                this.titreProject2.style.left =
                    -window.innerWidth / 4 +
                    window.innerWidth / 2 +
                    -this.mesh2.scale.x / 2 +
                    this.mesh2.position.x -
                    100 +
                    'px'
            } else {
                this.titre2 = this.titreProject2.children[0]
                this.titreProject2.style.textAlign = 'left'
                this.titreProject2.style.alignItems = 'flex-start'
                this.titreProject2.style.left =
                    window.innerWidth / 2 +
                    this.mesh2.scale.x / 2 +
                    this.mesh2.position.x +
                    80 +
                    'px'
            }
            this.scene2.add(this.mesh2)
        },

        onMouseMove2(event) {
            let rect = this.$image2.getBoundingClientRect()
            const x =
                event.clientX -
                this.mesh2.position.x -
                window.innerWidth / 2 +
                this.mesh2.scale.x / 2
            const y = event.clientY - rect.top
            if (x > 0 && x < rect.width) {
                this.hoverX2 = true
            } else {
                this.hoverX2 = false
            }
            if (y > 0 && y < rect.height) {
                this.hoverY2 = true
            } else {
                this.hoverY2 = false
            }
            if (this.hoverX2 && this.hoverY2) {
                this.hover2 = true
                TM.to(this.mouse2, 0.5, {
                    x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
                    y: ((-event.clientY + rect.top) / rect.height) * 2 + 1
                })
            }
            if (this.hoverX2 === false || this.hoverY2 === false) {
                this.hover2 = false
            }
        },

        initLights2() {
            const ambientlight = new THREE.AmbientLight(0xffffff, 2)
            this.scene2.add(ambientlight)
        },
        initCamera2() {
            const perspective = 800
            const fov =
                (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) /
                Math.PI

            this.camera2 = new THREE.PerspectiveCamera(
                fov,
                window.innerWidth / window.innerHeight,
                1,
                1000
            )
            this.camera2.position.set(0, 0, perspective)
        },

        update2() {
            if (this.hoverX2 && this.hoverY2) {
                this.uniforms2.u_time.value += 0.006
                if (this.uniforms2.u_progressHover.value < 1) {
                    this.uniforms2.u_progressHover.value += 0.01
                }
            } else {
                if (this.uniforms2.u_progressHover.value > 0.01) {
                    this.uniforms2.u_time.value += 0.006
                    this.uniforms2.u_progressHover.value -= 0.01
                } else {
                    this.uniforms2.u_progressHover.value = 0
                    this.uniforms2.u_time.value += 0.0
                }
            }
            this.renderer2.render(this.scene2, this.camera2)
            requestAnimationFrame(this.update2)
        }
    }
}
</script>

<style lang="scss">
.container2 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 7.5vh;
    margin-bottom: 7.5vh;
    width: 100%;
    height: 100vh;
    z-index: 10;
    .tile__figure {
        height: 75vh;

        .tile__image {
            height: 100%;
        }
        .titre-project {
            position: absolute;
            z-index: 12;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            width: 25vw;
            bottom: 12.5%;
            left: 0;
            cursor: pointer;
            color: black;
            text-decoration: none;

            .titre {
                line-height: normal;
                font-weight: lighter;
                font-family: 'Playfair Display', serif;
                position: relative;
                font-size: 5vw;
                line-height: 1;
                letter-spacing: 0.2vw;
                margin-bottom: 3vh;
            }
            .explore {
                font-family: 'Montserrat', sans-serif;
                position: relative;
                font-size: 1vw;
                letter-spacing: 0.1vw;
                line-height: 1.8;
                border-bottom: 0.1px solid;
            }
        }
    }
    #stage {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 9;
    }
}
</style>
