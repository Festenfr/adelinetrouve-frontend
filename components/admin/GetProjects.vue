<template>
    <div>
        <transition :css="false" @enter="enter" @leave="leave">
            <v-data-iterator
                v-if="update === false"
                :items="projectItem"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                :search="search"
                :sort-by="sortBy.toLowerCase()"
                :sort-desc="sortDesc"
                hide-default-footer
            >
                <template v-slot:header>
                    <v-toolbar class="mb-1">
                        <v-text-field
                            v-model="search"
                            class="ma-2"
                            hide-details
                            label="Rechercher"
                        ></v-text-field>
                        <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-spacer></v-spacer>
                            <v-select
                                v-model="sortBy"
                                text
                                class="ma-2"
                                hide-details
                                :items="keys"
                                label="Trier par"
                            ></v-select>
                            <v-spacer></v-spacer>
                            <v-btn-toggle v-model="sortDesc" mandatory>
                                <v-btn small color="#b24c4c" :value="false">
                                    <v-icon>mdi-arrow-up</v-icon>
                                </v-btn>
                                <v-btn small color="#b24c4c" :value="true">
                                    <v-icon>mdi-arrow-down</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </template>
                    </v-toolbar>
                </template>
                <template v-slot:default="props">
                    <v-row>
                        <v-col
                            v-for="(item, i) in props.items"
                            :key="item.titre"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="4"
                        >
                            <v-card>
                                <v-card-title
                                    class="subheading font-weight-bold"
                                    >{{ item.titre }}</v-card-title
                                >

                                <v-divider></v-divider>

                                <v-list dense>
                                    <v-list-item
                                        v-for="(key, index) in filteredKeys"
                                        :key="index"
                                    >
                                        <v-list-item-content
                                            :class="{
                                                'grey--text': sortBy === key
                                            }"
                                            >{{ key }}:</v-list-item-content
                                        >
                                        <v-list-item-content
                                            class="align-end"
                                            :class="{
                                                'grey--text': sortBy === key
                                            }"
                                            >{{
                                                item[key.toLowerCase()]
                                            }}</v-list-item-content
                                        >
                                    </v-list-item>
                                    <div class="actions">
                                        <div
                                            :ref="item._id"
                                            @click="getId(item._id, i)"
                                        >
                                            <p v-show="false">{{ item._id }}</p>
                                            <p v-show="false">
                                                {{ item.titre }}
                                            </p>
                                            <p v-show="false">
                                                {{ item.texte }}
                                            </p>
                                        </div>
                                        <v-btn
                                            small
                                            @click="
                                                updateOneItem(
                                                    item._id,
                                                    item.titre,
                                                    item.description,
                                                    item.surface,
                                                    item.budjet,
                                                    item.date
                                                )
                                            "
                                        >
                                            <v-icon small icon>
                                                mdi-pen
                                            </v-icon>
                                        </v-btn>
                                        <v-btn
                                            small
                                            @click="
                                                goTo(
                                                    `/admin/projet/${item.titre.replace(
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
                                            @click="deleteOneItem(item._id, i)"
                                        >
                                            <v-icon small icon>
                                                mdi-delete
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>

                <template v-slot:footer>
                    <v-row class="mt-2" align="center" justify="center">
                        <span class="mr-4">
                            Page {{ page }} sur {{ numberOfPages }}
                        </span>
                        <v-btn text small class="mr-1" @click="formerPage">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn text small class="ml-1" @click="nextPage">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        </transition>
        <transition :css="false" @enter="enter" @leave="leave">
            <UpdateProject
                v-if="update === true"
                :id="id"
                :update="update"
                :titre="titreUpdate"
                :description="descriptionUpdate"
                :budjet="budjetUpdate"
                :date="dateUpdate"
                :surface="surfaceUpdate"
                @closeUpdate="update = $event"
            />
        </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import UpdateProject from './UpdateProject'
import { TweenMax } from 'gsap'
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
            id: '',
            titre: '',
            description: '',
            surface: '',
            budjet: '',
            date: '',
            titreUpdate: '',
            descriptionUpdate: '',
            surfaceUpdate: '',
            budjetUpdate: '',
            dateUpdate: '',
            itemsPerPageArray: [3, 6, 9],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 3,
            sortBy: 'budjet',
            keys: ['budjet', 'surface', 'date']
        }
    },
    computed: {
        ...mapGetters({
            projectItem: 'projet/projectItem'
        }),
        numberOfPages() {
            return Math.ceil(this.projectItem.length / this.itemsPerPage)
        },
        filteredKeys() {
            return this.keys.filter((key) => key !== `titre`)
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
                }
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
        updateOneItem(id, titre, description, surface, budjet, date) {
            this.id = id
            this.update = true
            this.titreUpdate = titre
            this.descriptionUpdate = description
            this.surfaceUpdate = surface
            this.budjetUpdate = budjet
            this.dateUpdate = date
        },
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },
        deleteOneItem(id) {
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
                    this.$store.dispatch('projet/deleteProjectItem', id)
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
</style>
