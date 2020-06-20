<template>
    <div>
        <div class="centerAll ">
            <v-form ref="form" v-model="valid" class="form">
                <h1 class="centerAll" style="margin:20px;">
                    Nouvel Administrateur
                </h1>
                <v-text-field
                    v-model="email"
                    class="ma-4"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password1"
                    class="ma-4"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Mot de passe"
                    required
                    @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                    v-model="password2"
                    class="ma-4"
                    :rules="passwordRules"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    label="Mot de passe"
                    required
                    @click:append="show2 = !show2"
                ></v-text-field>
                <v-btn
                    :disabled="!valid"
                    color="sucess"
                    class="valider"
                    @click="register"
                >
                    valider
                </v-btn>
                <span style="margin:10px;"
                    >Déja un compte?
                    <nuxt-link to="/admin/login">Connectez vous</nuxt-link>
                </span>
            </v-form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { gsap } from 'gsap/all'
export default {
    transition: {
        css: false,
        mode: 'out-in',
        enter(el, done) {
            const form = document.querySelector('.container_form')
            gsap.from(form, 0.4, {
                opacity: 0,
                scale: 0.7,
                // eslint-disable-next-line no-undef
                ease: Power3.easeOut,
                onComplete: done
            })
            done()
        },
        leave(el, done) {
            const form = document.querySelector('.container_form')
            gsap.to(form, 0.4, {
                opacity: 0,
                scale: 0.7,
                // eslint-disable-next-line no-undef
                ease: Power3.easeOut,
                onComplete: done
            })
        }
    },
    data() {
        return {
            valid: true,
            show1: false,
            show2: false,
            email: '',
            password1: '',
            password2: '',
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
        ...mapGetters({
            dark: 'dark'
        })
    },
    methods: {
        ...mapActions({
            addUser: 'register/addUser'
        }),

        async register() {
            if (this.$refs.form.validate()) {
                const fd = {
                    email: this.email,
                    password1: this.password1,
                    password2: this.password2
                }
                await this.addUser(fd)
                this.snackbar = true
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 800px) {
    .container_form {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    .valider {
        margin: 15px;
    }
}
@media screen and (max-width: 800px) {
    .container_form {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    .valider {
        margin: 10px;
    }
}
</style>
