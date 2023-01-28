<template>

    <Transition name="fade" appear>

        <aside v-if="ready">

            <div class="app-table-buttons">

                <div class="app-page-title">{{ title }}</div>

            </div>

            <div class="app-form">
                
                <form @submit.prevent="submit">

                    <div class="row">

                        <div class="form-input col-3 mb-3" :data-error="!!form.state.from.error.length">
                            <label for="from" class="mb-2">საწყისი თარიღი</label>
                            <input type="date" class="form-control" v-model="form.inputs.from" id="from" placeholder="საწყისი თარიღი ...">
                        </div>

                        <div class="form-input col-3 mb-3" :data-error="!!form.state.to.error.length">
                            <label for="to" class="mb-2">დასრულების თარიღი</label>
                            <input type="date" class="form-control" v-model="form.inputs.to" id="to" placeholder="დასრულების თარიღი ...">
                        </div>

                        <div class="form-input col-3 mb-3" :data-error="!!form.state.status_id.error.length">
                            <label for="status_id" class="mb-2">სტატუსი</label>
                            <select class="form-select" id="status_id" v-model="form.inputs.status_id">
                                <option value="0" disabled selected>სტატუსი</option>
                                <option v-for="item in form.data.statuses" :key="item.id" :value="item.id">{{ item.status_name }}</option>
                            </select>
                        </div>

                        <div class="form-input col-3 mb-3" :data-error="!!form.state.ongoing_status_id.error.length">
                            <label for="ongoing_status_id" class="mb-2">მიმდინარე სტატუსი</label>
                            <select class="form-select" id="ongoing_status_id" v-model="form.inputs.ongoing_status_id">
                                <option value="0" disabled selected>მიმდინარე სტატუსი</option>
                                <option v-for="item in form.data.ongoing_statuses" :key="item.id" :value="item.id">{{ item.ongoing_status_name }}</option>
                            </select>
                        </div>

                    </div>

                    <div class="form-buttons mt-3 mb-4">
                        <button type="submit" class="btn btn-success w-100">რეპორტის ჩამოტვირთვა</button>
                    </div>

                    <Errors :errors="form.errors" v-if="Object.keys(form.errors).length"/>

                    <Success :message="form.success" v-if="form.success"/>
                    
                </form>

            </div>

        </aside>

    </Transition>

</template>

<script>
import { mapState } from  'vuex'

import axios from 'axios'

import Errors from '../../components/static/errors.vue'
import Success from '../../components/static/success.vue'

export default {

    data() {

        return {
            
            title: 'რეპორტის ჩამოტვირთვა',

            form: {

                errors: {},

                success: "",

                state: {

                    from: { error: [] },
                    to: { error: [] },
                    status_id: { error: [] },
                    ongoing_status_id: { error: [] }

                },

                inputs: {

                    from: "",
                    to: "",
                    status_id: 0,
                    ongoing_status_id: 0

                },

                data: {

                    statuses: [],
                    ongoing_statuses: []

                }

            }

        }

    },

    computed: {

        ...mapState([ 'ready' ])

    },

    components: { Errors, Success },

    methods: {

        download() {

            axios.post("/application/report", this.form.inputs).then(response => {

                this.form.errors = {}

                this.form.success = response.data.message

                const url = document.createElement('a')

                url.href = 'data:'+response.data.file.mime+';base64,'+response.data.file.data

                url.download = response.data.file.name
                
                url.click()

            }).catch(error => {

                this.form.success = ""

                this.form.errors = error.response.data.errors

                for(let name in this.form.state) {

                    if(error.response.data.errors[name]) {

                        this.form.state[name].error = error.response.data.errors[name]

                    }

                }

            })

        }

    },

    mounted() {

        document.title = this.title
    
        axios.get("/settings/manage").then(response => {

            this.form.data.statuses = response.data.statuses
            this.form.data.ongoing_statuses = response.data.ongoing_statuses

        }).catch(error => {

            console.log(error)

        })

    }
    
}
</script>