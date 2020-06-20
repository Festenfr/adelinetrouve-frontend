const ls = require('local-storage')
export default function({ store }) {
    if (ls.get('user')) {
        const userData = ls.get('user')
        store.commit('setUserData', userData)
    }
}
