const ls = require('local-storage')
export default function({ store }) {
    if (ls.get('user')) {
        const userData = ls.get('user')
        console.log(userData)

        store.commit('setUserData', userData)
    }
    store.commit('changePageName')
}
