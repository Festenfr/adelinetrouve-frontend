<template>
    <div ref="projet" class="container-projet">
        <div class="sous-menu">
            <div
                :class="[
                    component === 'get-image-projects' ? 'isActif' : 'carre'
                ]"
                @click="isGet"
            >
                <svg style="width:50px;height:50px" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M7,15L11.5,9L15,13.5L17.5,10.5L21,15M22,4H14L12,2H6A2,2 0 0,0 4,4V16A2,2 0 0,0 6,18H22A2,2 0 0,0 24,16V6A2,2 0 0,0 22,4M2,6H0V11H0V20A2,2 0 0,0 2,22H20V20H2V6Z"
                    />
                </svg>
            </div>
            <div
                :class="[
                    component === 'post-image-project' ? 'isActif' : 'carre'
                ]"
                @click="isPost"
            >
                <svg style="width:50px;height:50px" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M3 4V1H5V4H8V6H5V9H3V6H0V4M6 10V7H9V4H16L17.8 6H21C22.1 6 23 6.9 23 8V20C23 21.1 22.1 22 21 22H5C3.9 22 3 21.1 3 20V10M13 19C17.45 19 19.69 13.62 16.54 10.46C13.39 7.31 8 9.55 8 14C8 16.76 10.24 19 13 19M9.8 14C9.8 16.85 13.25 18.28 15.26 16.26C17.28 14.25 15.85 10.8 13 10.8C11.24 10.8 9.8 12.24 9.8 14Z"
                    />
                </svg>
            </div>
        </div>
        <component :is="component"></component>
    </div>
</template>
<script>
import GetImageProjects from '../../../../components/admin/GetImageProjects'
import PostImageProject from '../../../../components/admin/PostImageProject'
export default {
    components: {
        GetImageProjects,
        PostImageProject
    },
    data() {
        return {
            component: 'get-image-projects'
        }
    },
    methods: {
        isPost() {
            this.component = 'post-image-project'
        },
        isGet() {
            this.component = 'get-image-projects'
        }
    }
}
</script>
<style lang="scss">
.container-projet {
    width: 100%;
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
