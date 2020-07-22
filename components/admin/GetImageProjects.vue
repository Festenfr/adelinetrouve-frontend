<template>
    <div>
        <transition :css="false" tag="div" @enter="enter" @leave="leave">
            <div v-if="update === false">
                <div
                    v-for="(projectImage, index) in projectItem"
                    :key="projectImage._id"
                    :data-index="index"
                    class="card-image"
                >
                    <div class="actions">
                        <v-btn
                            small
                            @click="
                                updateOneItem(
                                    projectImage._id,
                                    projectImage.type
                                )
                            "
                        >
                            <v-icon small icon>
                                mdi-pen
                            </v-icon>
                        </v-btn>
                        <v-btn small @click="deleteOneItem(projectImage._id)">
                            <v-icon small icon>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </transition>
        <transition :css="false" @enter="enter" @leave="leave">
            <UpdateImageProject
                v-if="update === true"
                :id="id"
                :update="update"
                :type="typeUpdate"
                @closeUpdate="update = $event"
            />
        </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import UpdateImageProject from './UpdateImageProject'
import { TweenMax } from 'gsap'
export default {
    components: {
        UpdateImageProject
    },
    async fetch() {
        await this.$store.dispatch('projetImage/fetchProjectsItem', {
            titre: this.$route.params.id.replace(/-/g, ' ')
        })
    },
    data() {
        return {
            update: false,
            id: '',
            i: 0,
            type: '',
            typeUpdate: ''
        }
    },
    computed: {
        ...mapGetters({
            projectItem: 'projetImage/projectItem'
        }),
        titrePage() {
            return this.$route.params.id
        }
    },
    methods: {
        enter(el, done) {
            TweenMax.fromTo(
                el,
                0.5,
                {
                    opacity: '0',
                    display: 'none'
                },
                {
                    delay: 0.5,
                    opacity: '1',
                    ease: 'sine.out',
                    display: 'block',
                    onComplete: () => {
                        done()
                    }
                },
                0.1
            )
        },
        leave(el, done) {
            TweenMax.fromTo(
                el,
                0.5,
                {
                    opacity: '1'
                },
                {
                    opacity: '0',
                    ease: 'sine.in',
                    onComplete: () => {
                        done()
                    }
                }
            )
        },
        goTo(page) {
            $nuxt._router.push(`${page}`)
        },
        updateOneItem(id, type) {
            this.id = id
            this.update = true
            this.typeUpdate = type
        },
        deleteOneItem(id) {
            let titreWithSpace = this.titrePage.replace(/-/g, ' ')
            Swal.fire({
                title: 'Supprimer le projet',
                text: 'Es tu sur?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#00BFA5',
                cancelButtonColor: '#c84224',
                confirmButtonText: 'Oui!'
            }).then((result) => {
                if (result.value) {
                    this.$store.dispatch('projetImage/deleteProjectItem', {
                        arg1: id,
                        arg2: titreWithSpace
                    })
                    Swal.fire('Supprimé!', 'success')
                }
            })
        }
    }
}
</script>
<style lang="scss">
.actions {
    margin: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.card-image {
    width: 50vw;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-1);
}
</style>
