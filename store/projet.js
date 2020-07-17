export const state = () => ({
    projectItem: []
})
export const getters = {
    projectItem: (state) => state.projectItem
}
export const mutations = {
    setProjectItem: (state, data) => (state.projectItem = data),
    newprojectItem: (state, data) => state.projectItem.unshift(data),
    updateItem(state, data) {
        const index = state.projectItem.findIndex(
            (item) => item._id === data._id
        )
        if (index !== -1) state.projectItem.splice(index, 1, data)
    },
    removeItem: (state, id) => {
        const index = state.projectItem.findIndex((item) => item._id === id)
        console.log(index)
        if (index !== -1) state.projectItem.splice(index, 1)
    }
}
export const actions = {
    async addProject({ commit, rootState }, fd) {
        try {
            const { data } = await this.$axios.post('/projet', fd)
            commit('newprojectItem', data)
            rootState.snackbar = true
            rootState.message = 'Le projet ' + data.titre + ' a été ajouté'
            rootState.error = false
        } catch (err) {
            rootState.error = true
            rootState.message = err.response.data
        }
    },
    async fetchProjectsItem({ commit, rootState }) {
        try {
            const { data } = await this.$axios.get('/projet')
            commit('setProjectItem', data)
            rootState.snackbar = true
            rootState.error = false
        } catch (error) {
            rootState.error = true
            rootState.message = error.response.data
        }
    },
    async updateProjectItem({ commit, rootState }, { arg1, arg2 }) {
        try {
            const { data } = await this.$axios.put(`/projet/${arg2}`, arg1)
            commit('updateItem', data)
            rootState.snackbar = true
            rootState.error = false
            rootState.message = 'Le projet est modifié'
        } catch (err) {
            rootState.error = true
            rootState.message = err.response.data
        }
    },
    async deleteProjectItem({ commit, rootState }, id) {
        try {
            const { data } = await this.$axios.delete(`/projet/${id}`)
            commit('removeItem', id)
            rootState.snackbar = true
            rootState.error = false
            rootState.message = 'Le projet est supprimé'
            return data
        } catch (error) {
            rootState.error = true
            rootState.message = error.response.data
        }
    }
}
