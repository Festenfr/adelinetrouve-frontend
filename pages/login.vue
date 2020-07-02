<template>
    <div>
        <Nav />
        <v-app class="theme-dark">
            <div class="app">
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
    </div>
</template>

<script>
import Nav from '../components/NavWhite'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { TweenLite } from 'gsap/all'
export default {
    components: {
        Nav
    },
    transition: {
        css: false,
        mode: 'out-in',
        enter(el, done) {
            done()
        },
        leave(el, done) {
            const form = document.querySelector('.container_form')
            TweenLite.fromTo(
                '.about-issue',
                1,
                {
                    opacity: '1'
                },
                {
                    opacity: 0,
                    ease: 'linear'
                }
            )
            TweenLite.fromTo(
                '.nav',
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    delay: 0.2,
                    opacity: '0',
                    y: 50,
                    ease: 'sine.Out',
                    onComplete: done
                }
            )
            TweenLite.fromTo(
                form,
                0.8,
                {
                    opacity: '1',
                    y: 0
                },
                {
                    opacity: '0',
                    y: 30,
                    ease: 'sine.Out'
                }
            )
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
            loader: 'loader'
        })
    },
    mounted() {
        this.IsNotWhite()
        function enterPage() {
            const form = document.querySelector('.container_form')
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
            TweenLite.fromTo(
                '.theme-dark',
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
            TweenLite.fromTo(
                '.nav',
                0.8,
                {
                    opacity: '0',
                    y: -50
                },
                {
                    opacity: '1',
                    y: 0,
                    ease: 'sine.Out',
                    delay: 1.8
                }
            )
            TweenLite.fromTo(
                form,
                0.5,
                {
                    opacity: '0',
                    y: -30
                },
                {
                    opacity: '1',
                    y: 0,
                    ease: 'sine.Out',
                    delay: 2.5
                }
            )
        }
        if (this.loader === false) enterPage()
        if (this.loader === true) {
            setTimeout(() => {
                enterPage()
            }, 2400)
        }
    },
    methods: {
        ...mapActions({
            giveToken: 'login/giveToken'
        }),
        ...mapMutations({
            IsNotWhite: 'IsNotWhite'
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
