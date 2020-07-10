<template>
    <div ref="projet" class="container-projet">
        <div class="sous-menu">
            <div
                :class="[component === 'get-projects' ? 'isActif' : 'carre']"
                @click="isGet"
            >
                <svg style="width:50px;height:50px" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H13C12.59,21.75 12.2,21.44 11.86,21.1C9.22,18.67 9.05,14.56 11.5,11.92C13.69,9.5 17.33,9.13 20,11V8L14,2M13,9V3.5L18.5,9H13M20.31,18.9C21.64,16.79 21,14 18.91,12.68C16.8,11.35 14,12 12.69,14.08C11.35,16.19 12,18.97 14.09,20.3C15.55,21.23 17.41,21.23 18.88,20.32L22,23.39L23.39,22L20.31,18.9M16.5,19A2.5,2.5 0 0,1 14,16.5A2.5,2.5 0 0,1 16.5,14A2.5,2.5 0 0,1 19,16.5A2.5,2.5 0 0,1 16.5,19Z"
                    />
                </svg>
            </div>
            <div
                :class="[component === 'post-project' ? 'isActif' : 'carre']"
                @click="isPost"
            >
                <svg style="width:50px;height:50px" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                    />
                </svg>
            </div>
        </div>
        <component :is="component"></component>
    </div>
</template>
<script>
import GetProjects from '../../components/admin/GetProjects'
import PostProject from '../../components/admin/PostProject'
export default {
    components: {
        GetProjects,
        PostProject
    },
    data() {
        return {
            component: 'get-projects'
        }
    },
    mounted() {
        const body = document.body
        body.style.height = this.$refs.projet.clientHeight + 'px'
    },
    methods: {
        isPost() {
            this.component = 'post-project'
        },
        isGet() {
            this.component = 'get-projects'
        }
    }
}
</script>
<style lang="scss">
.container-projet {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .sous-menu {
        display: flex;
        position: relative;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 5%;
        width: 100%;
        .carre {
            justify-content: center;
            border-radius: 5%;
            align-items: center;
            display: flex;
            width: 5vw;
            height: 5vw;
            background-color: var(--color-2);
            transition: 0.5s;
            &:hover {
                background-color: var(--color-3);
                transition: 0.5s;
                cursor: pointer;
            }
        }
        .isActif {
            background-color: var(--color-primary);
            justify-content: center;
            border-radius: 5%;
            align-items: center;
            display: flex;
            width: 5vw;
            height: 5vw;
            transition: 0.5s;
            &:hover {
                background-color: var(--color-primary);
                opacity: 0.8;
                transition: 0.5s;
                cursor: pointer;
            }
        }
    }
}
</style>
