<template>
    <div class="wrapper">
        <a
            class="case"
            :class="[oneActive ? 'isActive' : 'case']"
            @click="activateOne"
        >
            <h3>
                Creer mon projet et mon espace client
            </h3>
        </a>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wrapper {
    height: 65%;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    display: flex;
    .case {
        cursor: pointer;
        color: white;
        border: 1px solid white;
        text-transform: uppercase;
        font-size: 0.8vw;
        width: 14vw;
        height: 7vw;
        display: flex;
        transition: 0.5s ease-out;
        justify-content: center;
        align-items: center;
    }
}
</style>
