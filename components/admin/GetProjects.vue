<template>
    <div>
        <div v-if="update === false">
            <div
                v-for="(project, index) in sortProjectItem"
                :key="project._id"
                class="card-image"
            >
                <div class="info_titre">
                    <h3>
                        {{ project.titre }}
                    </h3>
                </div>
                <div class="images_duo">
                    <div class="image1">
                        <img :src="project.file1" :alt="project.file1" />
                    </div>
                    <div class="image2">
                        <img :src="project.file2" :alt="project.file2" />
                    </div>
                </div>
                <div class="projet_info">
                    <div class="description_info">
                        <p>
                            {{ project.description }}
                        </p>
                    </div>
                    <div class="surface_info">
                        <strong> {{ project.surface }} m² </strong>
                    </div>
                    <div class="budget_info">
                        <strong>{{ project.budget }} €</strong>
                    </div>
                    <div class="date_info">
                        <i> {{ project.date }} </i>
                    </div>
                </div>
                <div class="change_index">
                    <v-btn
                        v-if="index !== 0"
                        icon
                        fab
                        small
                        @click="topOrBottom('isTop', project._id)"
                    >
                        <v-icon>
                            mdi-chevron-up
                        </v-icon>
                    </v-btn>

                    {{ index + 1 }}
                    <v-btn
                        v-if="index !== sortProjectItem.length - 1"
                        icon
                        fab
                        small
                        @click="topOrBottom('isBottom', project._id)"
                    >
                        <v-icon>
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </div>
                <div class="actions">
                    <v-btn
                        small
                        class="darken2"
                        @click="
                            updateOneItem(
                                project._id,
                                project.titre,
                                project.description,
                                project.surface,
                                project.budget,
                                project.date
                            )
                        "
                    >
                        <v-icon small icon>
                            mdi-pen
                        </v-icon>
                    </v-btn>
                    <v-btn
                        class="success"
                        small
                        @click="
                            goTo(
                                `/admin/projet/${project.titre.replace(
                                    / /g,
                                    '-'
                                )}`
                            )
                        "
                    >
                        <v-icon small icon>
                            mdi-camera-plus
                        </v-icon>
                    </v-btn>
                    <v-btn
                        small
                        class="error"
                        @click="deleteOneItem(project._id)"
                    >
                        <v-icon small icon>
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <UpdateProject
            v-if="update === true"
            :id="id"
            :update="update"
            :titre="titreUpdate"
            :description="descriptionUpdate"
            :budget="budgetUpdate"
            :date="dateUpdate"
            :surface="surfaceUpdate"
            @closeUpdate="update = $event"
        />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import UpdateProject from './UpdateProject'
export default {
    components: {
        UpdateProject
    },
    async fetch() {
        await this.$store.dispatch('projet/fetchProjectsItem')
    },
    data() {
        return {
            update: false,
            titre: '',
            description: '',
            surface: '',
            budget: '',
            date: '',
            titreUpdate: '',
            descriptionUpdate: '',
            surfaceUpdate: '',
            budgetUpdate: '',
            dateUpdate: '',
            id: '',
            i: 0,
            type: '',
            typeUpdate: ''
        }
    },
    computed: {
        ...mapGetters({
            projectItem: 'projet/projectItem'
        }),
        sortProjectItem() {
            const yo = this.projectItem
            return yo.sort((v1, v2) => v1.placement - v2.placement)
        },

        titrePage() {
            return this.$route.params.id
        }
    },
    methods: {
        topOrBottom(topOrBottom, id) {
            this.$store.dispatch('projet/updatePlacement', {
                arg1: id,
                arg2: topOrBottom
            })
        },
        goTo(page) {
            $nuxt._router.push(`${page}`)
        },
        updateOneItem(id, titre, description, surface, budget, date) {
            this.id = id
            this.update = true
            this.titreUpdate = titre
            this.descriptionUpdate = description
            this.surfaceUpdate = surface
            this.budgetUpdate = budget
            this.dateUpdate = date
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
.card-image {
    position: relative;
    margin: 5vh;
    padding: 5vh;
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-2);
    .actions {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .image {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 2vw;
        img {
            width: 66%;
        }
    }
    .images_duo {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 2vw;
        .image1 {
            width: 33%;
            img {
                width: 100%;
            }
        }
        .image2 {
            width: 33%;
            img {
                width: 100%;
            }
        }
    }
    .change_index {
        margin-top: 2vh;
        margin-bottom: 2vh;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    .projet_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .description_info {
            font-size: 0.8vw;
            white-space: pre-line;
        }
        .surface_info {
            font-size: 1vw;
        }
        .budget_info {
            font-size: 1vw;
            margin-bottom: 3vh;
        }
        .date_info {
            font-size: 0.8vw;
        }
    }
}
</style>
