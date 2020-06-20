<template>
    <div>
        Projet
        <ErrorMessage v-if="errorMessage">
            {{ fetchMessage }}
        </ErrorMessage>
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
