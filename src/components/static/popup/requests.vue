<template>

    <div class="app-status-content" v-if="!loading">

        <div class="app-popup-title">მოთხოვნილი დოკუმენტები</div>

        <div class="app-popup-content app-documents">

            <div class="form-file-input mb-3" v-for="document_type in document_types" :key="document_type.id">

                <label :for="'document-'+document_type.id" class="form-label">{{ document_type.document_name }}</label>
                
                <div class="app-document-extensions" v-if="!document_type.application_status_id">
                    <span class="badge bg-primary" v-for="extension in document_type.extensions" :key="extension.id">{{ extension.extension }}</span>
                </div>

                <input class="form-control" type="file" :id="'document-'+document_type.id" :data-document-type="document_type.id" :ref="'file-'+document_type.id" @change="upload($event, document_type.id)" v-if="!document_type.application_status_id">
                
                <div class="app-uploaded-documents" v-if="document_type.documents.length">
                    <TransitionGroup name="fade" appear>
                        <div class="app-uploaded-document" v-for="file in files[document_type.id]" :key="file.id">
                            <span @click="download($event, file.id)">
                                <BIconDownload />
                                {{ file.original_name }}
                            </span>
                            <div class="app-delete-button text-danger" @click="remove($event, file.id, document_type.id)" v-if="!document_type.application_status_id">წაშლა</div>
                        </div>
                    </TransitionGroup>
                </div>

                <div class="form-messages" v-if="!document_type.documents.length">

                    <div class="alert alert-danger">დოკუმენტები არ არის ატვირთული.</div>

                </div>

            </div>

            <div class="app-popup-buttons">

                <router-link class="btn btn-secondary" :to="{ query: {} }">დახურვა</router-link>

            </div>

        </div>

    </div>
    
</template>

<script>
import { mapActions } from 'vuex'

import axios from 'axios'

export default {

    data() {

        return {

            loading: false,

            types: [],

            document_types: [],

            files: {}

        }

    },

    methods: {

        ...mapActions([ 'load' ]),

        upload(e, id) {

            e.target.classList.add("input-load")

            e.target.disabled = true

            const inputs = new FormData()

            inputs.append('file', e.target.files[0])
            inputs.append('application_id', this.$route.query.id)
            inputs.append('document_type_id', id)

            axios.post("/application/document/upload", inputs, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {

                this.files[id].push(response.data.file)

                e.target.value = ""

                e.target.classList.remove("input-load")

                e.target.disabled = false

            }).catch(error => {

                console.log(error)

            })

        },

        remove(e, id, document_type) {

            axios.delete("/application/document/delete/"+id).then(response => {

                this.files[document_type].splice(this.files[document_type].findIndex(item => item.id === id),1)

                console.log(response.data)

            }).catch(error => {

                console.log(error)

            })
        },

        download(e, id) {

            axios.post("/application/document/download", { id: id }).then(response => {

                const url = document.createElement('a')

                url.href = 'data:'+response.data.file.mime+';base64,'+response.data.file.data

                url.download = response.data.file.name
                
                url.click()

            }).catch(error => {

                console.log(error)

            })

        }

    },

    beforeUpdate() {

        this.load('start')

    },

    mounted() {

        axios.get("/application/documents/" + this.$route.query.id).then(response => {

            this.document_types = response.data

            response.data.forEach(document_type => {

                this.files[document_type.id] = document_type.documents

            })

            this.load('finish')

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>