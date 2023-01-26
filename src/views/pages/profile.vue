<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-page-title">ჩემი პროფილი</div>

            <div class="app-form">
                
                <form @submit.prevent="submit">

                    <div class="row">

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.firstname.error.length">
                            <label for="firstname" class="mb-2">სახელი</label>
                            <input type="text" class="form-control" v-model="form.inputs.firstname" id="firstname" placeholder="სახელი ...">
                        </div>

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.lastname.error.length">
                            <label for="lastname" class="mb-2">გვარი</label>
                            <input type="text" class="form-control" v-model="form.inputs.lastname" id="lastname" placeholder="გვარი ...">
                        </div>

                    </div>

                    <div class="row">
                        
                        <div class="form-input col-6 mb-3" :data-error="!!form.state.birth_date.error.length">
                            <label for="birth_date" class="mb-2">დაბადების თარიღი</label>
                            <input type="date" class="form-control" v-model="form.inputs.birth_date" id="birth_date" placeholder="დაბადების თარიღი ...">
                        </div>

                        <div class="form-input col-6  mb-3" :data-error="!!form.state.mobile_number.error.length">
                            <label for="mobile_number" class="mb-2">ტელეფონის ნომერი</label>
                            <input type="text" class="form-control" v-model="form.inputs.mobile_number" id="mobile_number" placeholder="ტელეფონის ნომერი ...">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 mb-4">
                        <button type="submit" class="btn btn-success">პროფილის განახლება</button>
                    </div>

                    <Errors :errors="form.errors" v-if="Object.keys(form.errors).length"/>

                    <Success :message="form.success" v-if="form.success"/>
                    
                </form>

            </div>

        </aside>

    </Transition>

</template>

<script>
import { mapActions } from 'vuex'

import axios from "axios"

import Errors from '@/components/Errors.vue'
import Success from '@/components/Success.vue'

export default {

    data() {

        return {

            title: 'ანგარიშის პარამეტრები',

            form: {

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

    components: { Errors, Success },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.put("/user/info/update", this.form.inputs).then(response => {

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

            });

        }

    },

    mounted() {

        document.title = this.title
    
        const user = JSON.parse(localStorage.getItem("user"))

        axios.get("/user/get/" + user.id).then(response => {

            this.user = response.data
    
            this.form.inputs.firstname = this.user.name
            this.form.inputs.lastname = this.user.lastname
            this.form.inputs.birth_date = this.user.birth_date
            this.form.inputs.mobile_number = this.user.mobile_number

            this.load('finish')

        }).catch(error => {

            console.log(error)

        });
        
    }

}
</script>