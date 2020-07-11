export const state = () => ({
    projectItem: [],
    projectItem1: []
})
export const getters = {
    projectItem: (state) => state.projectItem,
    projectItem1: (state) => state.projectItem1
}
export const mutations = {
    setProjectItem: (state, data) => (state.projectItem = data),
    setProjectItem1: (state, data) => (state.projectItem1 = data),
    newprojectItem: (state, data) => state.projectItem.unshift(data),
    updateItem(state, data) {
        const index = state.projectItem.findIndex(
            (item) => item._id === data._id
        )
        if (index !== -1) state.projectItem.splice(index, 1, data)
    },
    removeItem: (state, i) => {
        state.projectItem.splice(i, 1)
    }
}
export const actions = {
    async addProject({ commit, rootState }, { arg1, arg2 }) {
        try {
            const { data } = await this.$axios.post(
                `/projetImage/${arg1}`,
                arg2
            )
            commit('newprojectItem', data)
            rootState.snackbar = true
            rootState.message = 'image(s) ajouté au projet'
            rootState.error = false
        } catch (err) {
            rootState.error = true
            rootState.message = err.response.data
        }
    },
    async fetchProjectsItem1({ commit, rootState }, { titre }) {
        const titreWithSpace = titre.replace(/_/g, ' ')
        const titreDecoded = decodeURI(titreWithSpace)
        try {
            const { data } = await this.$axios.get(
                `/projetImage/${titreDecoded}/1`
            )
            commit('setProjectItem1', data)
            rootState.snackbar = true
            rootState.error = false
        } catch (error) {
            rootState.error = true
            rootState.message = error.response.data
        }
    },
    async fetchProjectsItem({ commit, rootState }, { titre }) {
        const titreWithSpace = titre.replace(/_/g, ' ')
        const titreDecoded = decodeURI(titreWithSpace)
        try {
            const { data } = await this.$axios.get(
                `/projetImage/${titreDecoded}`
            )
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
    async deleteProjectItem({ commit, rootState }, { arg1, arg2, arg3 }) {
        try {
            const { data } = await this.$axios.delete(
                `/projetImage/${arg3}/${arg2}`
            )
            commit('removeItem', arg1)
            rootState.snackbar = true
            rootState.error = false
            rootState.message = 'image(s) du projet supprimé'
            return data
        } catch (error) {
            rootState.error = true
            rootState.message = error.response.data
        }
    }
}
