<template>
    <div class="card">
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
                    image
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
                    Creer le projet
                </v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    data() {
        return {
            valid: true,
            items: ['duo', 'paysage', 'portrait'],
            type: '',
            titre: '',
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
                fd.append('type', this.type)
                _.forEach(this.uploadFiles, (file) => {
                    fd.append('files', file)
                })
                this.$store.dispatch('projetImage/addProject', {
                    arg1: titreWithSpace,
                    arg2: fd
                })
                this.uploadFiles = []
                this.selectedFiles = []
            }
        }
    }
}
</script>

<style lang="scss">
.card {
    width: 60%;
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
