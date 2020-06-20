<template>
    <transition :name="goTo" mode="in-out">
        <div v-show="visible">
            <slot />
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        index: { type: Number, default: 0 },
        direction: { type: String, default: '' }
    },
    computed: {
        visible() {
            return this.index === this.$parent.index
        },
        goTo() {
            return `clipPathAnim${this.direction}`
        }
    }
}
</script>

<style lang="scss">
.clipPathAnimRight-enter {
    position: absolute;
    z-index: 10;
    clip-path: polygon(0% 0%, -10% 0%, -30% 100%, 0% 100%);
}
.clipPathAnimRight-enter-active {
    transition: clip-path 1s cubic-bezier(0.3, 0.99, 0.43, 1);
}
.clipPathAnimRight-enter-to {
    z-index: 10;
    position: absolute;
    clip-path: polygon(0% 0%, 105% 0%, 100% 100%, 0% 100%);
}

.clipPathAnimRight-leave {
    opacity: 1;
}
.clipPathAnimRight-leave-active {
    transition: opacity 1s;
}
.clipPathAnimRight-leave-to {
    opacity: 1;
}

.clipPathAnimLeft-enter {
    position: absolute;
    z-index: 10;
    clip-path: polygon(110% 0%, 100% 0%, 100% 100%, 130% 100%);
}
.clipPathAnimLeft-enter-active {
    transition: clip-path 1s cubic-bezier(0.3, 0.99, 0.43, 1);
}
.clipPathAnimLeft-enter-to {
    z-index: 10;
    position: absolute;
    clip-path: polygon(-5% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.clipPathAnimLeft-leave {
    opacity: 1;
}
.clipPathAnimLeft-leave-active {
    transition: opacity 1s;
}
.clipPathAnimLeft-leave-to {
    opacity: 1;
}
</style>
