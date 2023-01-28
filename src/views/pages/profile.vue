<template>

    <div class="loading" v-if="!ready"></div>

    <Transition name="fade" appear>

        <aside v-if="ready">

            <div class="app-table-buttons">

                <div class="app-page-title">{{ title }}</div>

            </div>

            <div class="app-form">
                
                <form @submit.prevent="submit">

                    <div class="row">

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.firstname.error.length">
                            <label for="firstname" class="mb-2">სახელი</label>
                            <input type="text" class="form-control" v-model="form.inputs.firstname" id="firstname" placeholder="სახელი ..." :disabled="form.processing">
                        </div>

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.lastname.error.length">
                            <label for="lastname" class="mb-2">გვარი</label>
                            <input type="text" class="form-control" v-model="form.inputs.lastname" id="lastname" placeholder="გვარი ..." :disabled="form.processing">
                        </div>

                    </div>

                    <div class="row">
                        
                        <div class="form-input col-6 mb-3" :data-error="!!form.state.birth_date.error.length">
                            <label for="birth_date" class="mb-2">დაბადების თარიღი</label>
                            <input type="date" class="form-control" v-model="form.inputs.birth_date" id="birth_date" placeholder="დაბადების თარიღი ..." :disabled="form.processing">
                        </div>

                        <div class="form-input col-6  mb-3" :data-error="!!form.state.mobile_number.error.length">
                            <label for="mobile_number" class="mb-2">ტელეფონის ნომერი</label>
                            <input type="text" class="form-control" v-model="form.inputs.mobile_number" id="mobile_number" placeholder="ტელეფონის ნომერი ..." :disabled="form.processing">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 mb-4">

                        <button type="submit" class="btn btn-success" :disabled="form.processing">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="form.processing"></span>
                            პროფილის განახლება
                        </button>

                    </div>

                    <Errors :errors="form.errors" v-if="Object.keys(form.errors).length"/>

                    <Success :message="form.success" v-if="form.success"/>
                    
                </form>

            </div>

        </aside>

    </Transition>

</template>

<script>
import { mapState } from 'vuex'

import axios from "axios"

import Errors from '../../components/static/errors.vue'
import Success from '../../components/static/success.vue'

export default {

    data() {

        return {

            title: 'ანგარიშის პარამეტრები',

            form: {

                processing: false,

                errors: {},

                success: "",
            
                state: {
                    
                    firstname: { error: [] },
                    lastname: { error: [] },
                    birth_date: { error: [] },
                    mobile_number: { error: [] }

                },

                inputs: {

                    firstname : "",
                    lastname : "",
                    birth_date : "",
                    mobile_number : ""

                }

            }

        }

    },

    computed: {

        ...mapState({

            ready(state) {

                return state.ready && this.user

            },

            user(state) {

                return state.user

            }

        })

    },

    components: { Errors, Success },

    methods: {

        submit() {

            this.form.processing = true

            axios.put("/user/info/update", this.form.inputs).then(response => {

                this.form.errors = {}

                this.form.success = response.data.message

                this.form.processing = false

            }).catch(error => {

                this.form.success = ""

                this.form.errors = error.response.data.errors

                for(let name in this.form.state) {

                    if(error.response.data.errors[name]) {

                        this.form.state[name].error = error.response.data.errors[name]

                    }

                }

                this.form.processing = false

            });

        }

    },

    mounted() {

        document.title = this.title
    
        axios.get("/user/get/" + this.user.id).then(response => {

            this.form.inputs.firstname = response.data.firstname
            this.form.inputs.lastname = response.data.lastname
            this.form.inputs.birth_date = response.data.birth_date
            this.form.inputs.mobile_number = response.data.mobile_number

        }).catch(error => {

            console.log(error)

        });
        
    }

}
</script>