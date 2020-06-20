<template>
    <div>
        <ErrorMessage v-if="errorMessage">
            {{ fetchMessage }}
        </ErrorMessage>
        <div v-else>
            <h2>
                Profil
            </h2>
            <div>
                <nuxt-link to="/admin/register">
                    Ajouter un administrateur.
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            user: 'user',
            users: 'dashboard/users',
            fetchMessage: 'dashboard/message',
            errorMessage: 'dashboard/error'
        })
    },
    created() {
        this.fetchUsers()
    },
    methods: {
        ...mapActions({
            fetchUsers: 'dashboard/fetchUsers'
        })
    }
}
</script>
