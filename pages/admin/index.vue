<template>
    <div ref="admin">
        <div>
            <p>yo</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    mounted() {
        const body = document.body
        body.style.height = this.$refs.admin.clientHeight + 'px'
    }
}
</script>
