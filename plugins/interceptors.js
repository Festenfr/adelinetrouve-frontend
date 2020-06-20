export default ({ store, app: { $axios } }) => {
    $axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                store.dispatch('login/removeToken')
            }
            return Promise.reject(error)
        }
    )
}
