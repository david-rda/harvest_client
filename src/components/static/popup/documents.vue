<template>

    <div class="app-status-content">

        <div class="app-popup-title">წარმოსადგენი დოკუმენტაცია</div>

        <div class="app-popup-content app-documents">

            <div class="app-document">

                <div class="mb-3">
                    <label for="formFile" class="form-label">პოტენციური ბენეფიციარის პირადობის მოწმობის ასლი.</label>
                    <input class="form-control" type="file" id="formFile">
                </div>

            </div>
            
            <div class="app-popup-buttons">

                <router-link class="btn btn-secondary" :to="{ query: {} }">დახურვა</router-link>

            </div>

        </div>

    </div>
    
</template>

<script>
import axios from 'axios'

export default {

    data() {

        return {

            loading: false,

            types: [],

            documents: []

        }

    },

    mounted() {

        axios.get("/application/documents/" + this.$route.query.id).then(response => {

            this.documents = response.data

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>