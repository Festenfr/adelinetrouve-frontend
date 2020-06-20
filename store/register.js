export const state = () => ({
    step1: false,
    step2: false,
    step3: false,
    step4: true,
    step5: false,
    formData: {},
    type: {},
    surface: 0,
    pieces: [],
    budjet: 0,
    info: {}
})
export const getters = {
    step1: (state) => state.step1,
    step2: (state) => state.step2,
    step3: (state) => state.step3,
    step4: (state) => state.step4,
    step5: (state) => state.step5,
    formData: (state) => state.formData,
    type: (state) => state.type,
    surface: (state) => state.surface,
    pieces: (state) => state.pieces,
    budjet: (state) => state.budjet,
    nom: (state) => state.nom,
    phone: (state) => state.phone,
    email: (state) => state.email,
    password1: (state) => state.password1,
    password2: (state) => state.password2
}
export const mutations = {
    addStep1(state, type) {
        state.type = { type: type }
        state.formData = Object.assign(state.formData, state.type)
    },
    addStep2(state, surface) {
        state.surface = { surface: surface }
        state.formData = Object.assign(state.formData, state.surface)
    },
    addStep3(state, pieces) {
        state.pieces = { pieces: pieces }
        state.formData = Object.assign(state.formData, state.pieces)
    },
    addStep4(state, budjet) {
        state.budjet = { budjet: budjet }
        state.formData = Object.assign(state.formData, state.budjet)
    },
    addStep5(state, infos) {
        state.info = infos
        state.formData = Object.assign(state.formData, state.info)
    },
    validateStep1(state) {
        state.step1 = true
    },
    invalidateStep1(state) {
        state.step1 = false
    },
    validateStep2(state) {
        state.step2 = true
    },
    invalidateStep2(state) {
        state.step2 = false
    },
    validateStep3(state) {
        state.step3 = true
    },
    invalidateStep3(state) {
        state.step3 = false
    },
    validateStep5(state) {
        state.step5 = true
    },
    invalidateStep5(state) {
        state.step = false
    },
    addToken(state, data) {
        localStorage.setItem('user', JSON.stringify(data))
        this.$axios.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${data.token}`

        this.$router.push('/admin/')
    }
}
export const actions = {
    async addUser({ state, commit, rootState }) {
        try {
            const { data } = await this.$axios.post('/register', state.formData)
            rootState.user = data.user
            rootState.loggedIn = true
            rootState.message = 'Votre projet est crée'
            rootState.error = false
            commit('addToken', data)
        } catch (err) {
            rootState.error = true
            rootState.message = err.response.data
        }
    }
}
