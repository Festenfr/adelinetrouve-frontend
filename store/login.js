const ls = require('local-storage')
export const mutations = {
    addToken(state, data) {
        localStorage.setItem('user', JSON.stringify(data))
        this.$axios.setHeader('Authorization', `Bearer ${data.token}`)
        this.$router.push('/admin/')
    },
    deleteToken() {
        ls.remove('user')
        this.$axios.setHeader('Authorization', null)
        this.$router.push('/login/')
    }
}
export const actions = {
    async giveToken({ commit, rootState }, fd) {
        try {
            const { data } = await this.$axios.post('/login', fd)
            rootState.snackbar = true
            rootState.message = 'Vous êtes connecté'
            rootState.error = false
            rootState.user = data.user
            rootState.loggedIn = true
            commit('addToken', data)
        } catch (err) {
            rootState.error = true
            rootState.message = err.response.data
        }
    },
    async removeToken({ commit, rootState }) {
        rootState.user = null
        rootState.loggedIn = false
        rootState.message = 'Vous êtes déconnecté'
        rootState.error = false
        commit('deleteToken')
    }
}
