<template>
    <div class="card">
        <v-btn @click="closeUpdate">
            <v-icon>
                mdi-close
            </v-icon>
        </v-btn>
        <v-form
            ref="form"
            v-model="valid"
            class="form-post-projet"
            :lazy-validation="lazy"
        >
            <div style="width:100%">
                <v-select
                    v-model="type"
                    :items="items"
                    label="Type d'image"
                ></v-select>
            </div>
            <v-btn @click="$refs.files.click()">
                <span v-if="selectedFiles[0] === undefined">
                    Image(s)
                </span>
                <span
                    v-for="(selectedFile, index) in selectedFiles"
                    :key="index"
                >
                    {{ selectedFile.name }} <br />
                </span>
            </v-btn>

            <input
                ref="files"
                style="display:none;"
                multiple
                type="file"
                name="files"
                @change="onFilesSelected"
            />

            <div style=" margin-top: 30px;">
                <v-btn
                    small
                    :disabled="!valid"
                    color="primary"
                    @click="validate"
                >
                    Modifier l'image(s)
                </v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    props: {
        update: {
            type: Boolean
        },
        id: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            items: ['duo', 'paysage', 'portrait'],
            valid: true,
            isCarousel: false,
            selectedFiles: [],
            uploadFiles: [],
            lazy: true
        }
    },
    computed: {
        titrePage() {
            return this.$route.params.id
        }
    },
    methods: {
        closeUpdate() {
            let close = this.update
            close = false
            this.$emit('closeUpdate', close)
        },
        onFilesSelected() {
            const files = this.$refs.files.files
            this.uploadFiles = [...this.uploadFiles, ...files]
            this.selectedFiles = [
                ..._.map(files, (file) => ({
                    name: file.name,
                    size: files.size,
                    type: file.type
                }))
            ]
        },
        validate() {
            let titreWithSpace = this.titrePage.replace(/-/g, ' ')
            if (this.$refs.form.validate()) {
                const fd = new FormData()
                fd.append('typeUpdate', this.type)
                _.forEach(this.uploadFiles, (file) => {
                    fd.append('files', file)
                })
                this.$store.dispatch('projetImage/updateProjectItem', {
                    arg1: fd,
                    arg2: titreWithSpace,
                    arg3: this.id
                })
                this.uploadFiles = []
                this.selectedFiles = []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.form-post-projet {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.ligne-space {
    display: flex;
    justify-content: center;

    .text-marge {
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 10px;
    }
}
</style>
