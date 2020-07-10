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
                <v-text-field v-model="titre" label="titre" required />
            </div>
            <div style="width:100%">
                <v-text-field
                    v-model="description"
                    label="description"
                    required
                />
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
                    v-model="budjet"
                    class="text-marge"
                    label="budjet"
                    required
                />
            </div>
            <v-switch v-model="isCarousel"></v-switch>
            <v-btn @click="$refs.files.click()">
                <span v-if="selectedFiles[0] === undefined">
                    Image Principale + texture
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
    props: {
        update: {
            type: Boolean
        },
        id: {
            type: String,
            default: ''
        },
        titre: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        surface: {
            type: String,
            default: ''
        },
        date: {
            type: String,
            default: ''
        },
        budjet: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            valid: true,
            isCarousel: false,
            selectedFiles: [],
            uploadFiles: [],
            lazy: true
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
            if (this.$refs.form.validate()) {
                const fd = new FormData()
                fd.append('titreUpdate', this.titre)
                fd.append('descriptionUpdate', this.description)
                fd.append('dateUpdate', this.date)
                fd.append('surfaceUpdate', this.surface)
                fd.append('budjetUpdate', this.budjet)
                fd.append('isCarouselUpdate', this.isCarousel)
                _.forEach(this.uploadFiles, (file) => {
                    fd.append('files', file)
                })
                this.$store.dispatch('projet/updateProjectItem', {
                    arg1: fd,
                    arg2: this.id
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
