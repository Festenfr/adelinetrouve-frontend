<template>
    <div>
        <div class="containerError">
            <p class="errorMessage">
                <slot />
            </p>
        </div>
    </div>
</template>

<style lang="scss" scopped>
.containerError {
    background-color: var(--color-2);
    width: 30vw;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
    box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.75);
}
.errorMessage {
    color: var(--color-error);
}
</style>
