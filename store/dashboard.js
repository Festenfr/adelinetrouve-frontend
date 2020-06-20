export const state = () => ({
    users: '',
    message: '',
    error: null
})
export const getters = {
    users: (state) => state.users,
    message: (state) => state.message,
    error: (state) => state.error
}
export const mutations = {
    setUsers(state, data) {
        state.users = data
        state.error = false
        state.message = ''
    },
    errorMessage: (state, err) => {
        state.error = true
        state.message = err
        console.log(err)
    }
}
export const actions = {
    async fetchUsers({ commit }) {
        try {
            const { data } = await this.$axios.get('/register')
            commit('setUsers', data)
        } catch (err) {
            commit('errorMessage', err)
        }
    }
}
