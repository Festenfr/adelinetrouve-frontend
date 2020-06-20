import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

export default (ctx) => {
    const vuetify = new Vuetify({
        theme: {
            dark: true,
            themes: {
                light: {
                    darken1: '#d0d0d0',
                    darken2: '#e0e0e0',
                    darken3: '#f0f0f0',
                    primary: '#823535',
                    secondary: '#018786',
                    sucess: '#438557',
                    error: '#9C322B',
                    font: '#000000'
                },
                dark: {
                    darken1: '#121212',
                    darken2: '#222222',
                    darken3: '#333333',
                    primary: '#b24c4c',
                    secondary: '#03dac6',
                    sucess: '#68CD86',
                    error: '#E54D42',
                    font: '#ffffff'
                }
            }
        }
    })
    ctx.app.vuetify = vuetify
    ctx.$vuetify = vuetify.framework
}
