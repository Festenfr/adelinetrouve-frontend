<template>
    <div class="card">
        <v-form
            ref="form"
            v-model="valid"
            class="form-post-projet"
            :lazy-validation="lazy"
        >
            <div style="width:100%">
                <v-textarea
                    v-model="titre"
                    label="Titre"
                    required
                    outlined
                    name="input-7-4"
                />
            </div>
            <div style="width:100%">
                <v-textarea
                    v-model="description"
                    label="Déscription"
                    required
                    outlined
                    name="input-7-4"
                ></v-textarea>
            </div>

            <div class="ligne-space">
                <v-text-field
                    v-model="date"
                    class="text-marge"
                    label="date"
                    required
                />
                <v-text-field
                    v-model="surface"
                    label="surface"
                    class="text-marge"
                    required
                />
                <v-text-field
                    v-model="budget"
                    class="text-marge"
                    label="budget"
                    required
                />
            </div>
            <v-switch v-model="isCarousel"></v-switch>
            <v-btn @click="$refs.files.click()">
                <span v-if="selectedFiles[0] === undefined">
                    Image Principale + Texture
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
import { mapActions } from 'vuex'
import _ from 'lodash'
export default {
    data() {
        return {
            valid: true,
            isCarousel: false,
            titre: '',
            description: '',
            date: '',
            surface: '',
            budget: '',
            selectedFiles: [],
            uploadFiles: [],
            lazy: true
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
            console.log(this.uploadFiles)
        },
        validate() {
            if (this.$refs.form.validate()) {
                const fd = new FormData()
                fd.append('titre', this.titre)
                fd.append('description', this.description)
                fd.append('date', this.date)
                fd.append('surface', this.surface)
                fd.append('budget', this.budget)
                fd.append('isCarousel', this.isCarousel)
                _.forEach(this.uploadFiles, (file) => {
                    fd.append('files', file)
                })
                this.addProject(fd)
                this.uploadFiles = []
                this.selectedFiles = []
            }
        },
        ...mapActions({
            addProject: 'projet/addProject'
        })
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
