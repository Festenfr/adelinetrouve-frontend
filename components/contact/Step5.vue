<template>
    <div class="wrapper">
        <v-app>
            <v-form
                ref="form"
                v-model="valid"
                class="form"
                style="width: 400px;"
            >
                <v-text-field
                    v-model="nom"
                    class="text-area"
                    :rules="nameRules"
                    label="Nom"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="phone"
                    :rules="phoneRules"
                    class="text-area"
                    label="telephone"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    class="text-area"
                    label="E-mail"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password1"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    class="text-area"
                    :type="show1 ? 'text' : 'password'"
                    :rules="passwordRules"
                    label="Mot de passe"
                    loading
                    @click:append="show1 = !show1"
                >
                    <template v-slot:progress>
                        <v-progress-linear
                            :value="progress"
                            :color="color"
                            absolute
                            height="7"
                        ></v-progress-linear>
                    </template>
                </v-text-field>
                <v-text-field
                    v-model="password2"
                    class="text-area"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    :rules="passwordRules"
                    label="Verifier le mot de passe"
                    loading
                    @click:append="show2 = !show2"
                >
                    <template v-slot:progress>
                        <v-progress-linear
                            :value="progress2"
                            :color="color2"
                            absolute
                            height="7"
                        ></v-progress-linear> </template
                ></v-text-field>
            </v-form>
        </v-app>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { TweenMax } from 'gsap'
import { mapMutations } from 'vuex'
export default {
    props: {
        valid: {
            type: Boolean,
            required: true,
            default: true
        },
        infos: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            show1: false,
            show2: false,
            nom: '',
            phone: '',
            email: '',
            password1: '',
            password2: '',
            nameRules: [(v) => !!v || 'Nom requis'],
            phoneRules: [
                (v) => !!v || 'Numéro de téléphone requis',
                (v) =>
                    /^0[1-9]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/.test(
                        v
                    ) || 'Le numéro de téléphone doit être valide',
                (v) =>
                    (9 < v && v.length < 11) ||
                    'Le numéro de téléphone  doit contenir 10 chiffres'
            ],
            emailRules: [
                (v) => !!v || 'E-mail requis',
                (v) => /.+@.+\..+/.test(v) || 'E-mail doit être valide'
            ],
            passwordRules: [
                (v) => !!v || 'Le mot de passe est requis',
                (v) =>
                    (v && v.length >= 6) ||
                    'Le mot de passe doit contenir au moins 6 caractères',
                (v) =>
                    (v && v.length <= 50) ||
                    'Le mot de passe doit contenir au maximum 50 caractères'
            ]
        }
    },
    computed: {
        progress() {
            return Math.min(100, this.password1.length * 10)
        },
        progress2() {
            return Math.min(100, this.password2.length * 10)
        },
        color() {
            return ['error', 'warning', 'success'][
                Math.floor(this.progress / 40)
            ]
        },
        color2() {
            return ['error', 'warning', 'success'][
                Math.floor(this.progress2 / 40)
            ]
        }
    },
    watch: {
        valid() {
            let valid = this.valid
            if (valid === false) {
                this.$emit('validChange', valid)
            }
            if (valid === true) {
                setInterval(() => {
                    if (this.valid === true) {
                        let infos = this.infos
                        infos = {
                            nom: this.nom,
                            phone: this.phone,
                            email: this.email,
                            password1: this.password1,
                            password2: this.password2
                        }
                        this.$emit('validInfos', infos)
                    }
                }, 200)
                this.$emit('validChange', valid)
            }
        }
    },
    methods: {
        ...mapMutations({
            validateStep5: 'register/validateStep3',
            invalidateStep5: 'register/invalidateStep3'
        })
    }
}
</script>

<style lang="scss">
.wrapper {
    position: relative;
    top: 15vw;
    height: 65%;
    width: 50vw;
    align-items: center;
    justify-content: center;
    display: flex;
}
.text-area {
    margin-left: 10%;
    margin-right: 10%;
}
</style>
