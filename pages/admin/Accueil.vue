<template>
    <div>
        <div class="card">
            yo
        </div>
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
<style lang="scss" scoped>
.card {
    background-color: var(--color-2);
    width: 30vw;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
    box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.75);
}
</style>
