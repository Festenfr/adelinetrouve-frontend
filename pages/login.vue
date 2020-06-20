<template>
    <div>
        <Nav />
        <client-only>
            <v-app :class="[dark ? 'theme-dark' : 'theme-light']">
                <div class="app">
                    <DarkToLight></DarkToLight>
                    <div class="centerAll container_form">
                        <v-form ref="form" v-model="valid" class="form">
                            <h1 class="centerAll" style="margin:10px;">
                                Connexion
                            </h1>
                            <v-text-field
                                v-model="email"
                                class="ma-4"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                class="ma-4"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="passwordRules"
                                :type="show ? 'text' : 'password'"
                                label="Mot de passe"
                                required
                                @click:append="show = !show"
                            ></v-text-field>
                            <v-btn
                                :disabled="!valid"
                                color="sucess"
                                class="valider"
                                @click="login"
                            >
                                valider
                            </v-btn>
                        </v-form>
                    </div>
                </div>
            </v-app>
        </client-only>
    </div>
</template>

<script>
import Nav from '../components/NavWhite'
import { mapActions, mapGetters } from 'vuex'
import { gsap } from 'gsap/all'
export default {
    components: {
        Nav
    },
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
            show: false,
            email: '',
            password: '',
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
            giveToken: 'login/giveToken'
        }),
        async login() {
            if (this.$refs.form.validate()) {
                const fd = {
                    email: this.email,
                    password: this.password
                }
                await this.giveToken(fd)
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
