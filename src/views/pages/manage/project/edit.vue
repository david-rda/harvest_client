<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-table-buttons">

                <div class="app-page-title">პროექტის რედაქტირება</div>

            </div>

            <div class="app-form">
                
                <form @submit.prevent="submit">

                    <div class="row">

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.project_title.error.length">
                            <label for="project_title" class="mb-2">პროექტის სახელი</label>
                            <input type="text" class="form-control" v-model="form.inputs.project_title" id="project_name" placeholder="პროექტის სახელი ...">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 mb-4">
                        <button type="submit" class="btn btn-success">პროექტის განახლება</button>
                    </div>

                    <Errors :errors="form.errors" v-if="Object.keys(form.errors).length"/>

                    <Success :message="form.success" v-if="form.success"/>
                    
                </form>

            </div>

        </aside>

    </Transition>

</template>

<script>
import { mapState, mapActions } from 'vuex'

import axios from 'axios'

import Errors from '../../../../components/static/errors.vue'
import Success from '../../../../components/static/success.vue'

export default {

    data() {

        return {

            form: {

                errors: {},

                success: "",

                state: {

                    project_title: { error: [] }

                },

                inputs: {

                    project_title: 0

                }

            }
            
        }

    },

    components: { Errors, Success },

    computed: {

        ...mapState({

            loading: state => state.loading

        })

    },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.put("/project/edit/"+this.$route.query.id, this.form.inputs).then(response => {

                this.form.errors = {}

                this.form.success = response.data.message

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

        axios.get("/project/get/"+this.$route.query.id).then(response => {

            this.form.inputs.project_title = response.data.project_title

            this.load('finish')

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>