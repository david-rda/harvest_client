<template>

    <Transition name="fade" appear>

        <div class="app-popup-contaner">

            <div class="app-popup">

                <div class="app-documents">

                    <h6>წარმოსადგენი დოკუმენტაცია</h6>

                    <div class="app-document">

                        <div class="mb-3">
                            <label for="formFile" class="form-label">პოტენციური ბენეფიციარის პირადობის მოწმობის ასლი.</label>
                            <input class="form-control" type="file" id="formFile">
                        </div>

                    </div>
                    
                    <!--
                    <aside>
                        <pre>
                            <code>{{ application }}</code>
                        </pre>
                    </aside>
                    -->

                </div>

                <button class="btn btn-secondary" @click="unportal">დახურვა</button>
                
            </div>

        </div>

    </Transition>

</template>

<script>
import { mapActions } from 'vuex'

import axios from 'axios'

export default {

    props: [ 'application' ],

    data() {

        return {

            types: [],

            documents: []

        }

    },

    methods: {

        ...mapActions([ 'unportal' ])

    },

    mounted() {

        axios.get("/application/documents/" + this.application.id).then(response => {

            this.documents = response.data

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>