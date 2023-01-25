<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-page-title">ჩემი პროფილი</div>

            <div class="app-form">
                
                <form @submit.prevent="update">

                    <div class="row">

                        <div class="form-input col-6 mb-3" :data-error="!!form.update.state.firstname.error.length">
                            <label for="firstname" class="mb-2">სახელი</label>
                            <input type="text" class="form-control" v-model="form.update.inputs.firstname" id="firstname" placeholder="სახელი ...">
                        </div>

                        <div class="form-input col-6 mb-3" :data-error="!!form.update.state.lastname.error.length">
                            <label for="lastname" class="mb-2">გვარი</label>
                            <input type="text" class="form-control" v-model="form.update.inputs.lastname" id="lastname" placeholder="გვარი ...">
                        </div>

                    </div>

                    <div class="row">
                        
                        <div class="form-input col-6 mb-3" :data-error="!!form.update.state.birth_date.error.length">
                            <label for="birth_date" class="mb-2">დაბადების თარიღი</label>
                            <input type="date" class="form-control" v-model="form.update.inputs.birth_date" id="birth_date" placeholder="დაბადების თარიღი ...">
                        </div>

                        <div class="form-input col-6  mb-3" :data-error="!!form.update.state.mobile_number.error.length">
                            <label for="mobile_number" class="mb-2">ტელეფონის ნომერი</label>
                            <input type="text" class="form-control" v-model="form.update.inputs.mobile_number" id="mobile_number" placeholder="ტელეფონის ნომერი ...">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 mb-4">
                        <button type="submit" class="btn btn-success">პროფილის განახლება</button>
                    </div>

                    <Errors :errors="form.update.errors" v-if="Object.keys(form.update.errors).length"/>

                    <Success :message="form.update.success" v-if="form.update.success"/>
                    
                </form>

            </div>

            <div class="app-page-title">პაროლის შეცვლა</div>

            <div class="app-form">
                
                <form @submit.prevent="change">

                    <div class="row">

                        <div class="form-input col-12 mb-3" :data-error="!!form.change.state.current_password.error.length">
                            <label for="current_password" class="mb-2">ძველი პეროლი</label>
                            <input type="password" class="form-control" name="old_password" v-model="form.change.inputs.current_password" id="current_password" placeholder="ძველი პაროლი">
                        </div>

                    </div>
                    
                    <div class="row">

                        <div class="form-input col-6 mb-3" :data-error="!!form.change.state.new_password.error.length">
                            <label for="new_password" class="mb-2">ახალი პაროლი</label>
                            <input type="password" class="form-control" name="new_password" v-model="form.change.inputs.new_password" id="new_password" placeholder="ახალი პაროლი">
                        </div>

                        <div class="form-input col-6 mb-3" :data-error="!!form.change.state.confirm_password.error.length">
                            <label for="confirm_password" class="mb-2">გაიმეორეთ ახალი პაროლი</label>
                            <input type="password" class="form-control" name="confirm_password" v-model="form.change.inputs.confirm_password" id="confirm_password" placeholder="გაიმეორეთ ახალი პაროლი">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 mb-4">
                        <button type="submit" class="btn btn-success">პაროლის შეცვლა</button>
                    </div>

                    <Errors :errors="form.change.errors" v-if="Object.keys(form.change.errors).length"/>

                    <Success :message="form.change.success" v-if="form.change.success"/>
                    
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

                update: {

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

                },

                change: {

                    errors: {},

                    success: "",
                
                    state: {
                        
                        current_password: { error: [] },
                        new_password: { error: [] },
                        confirm_password: { error: [] }

                    },

                    inputs: {

                        current_password: "",
                        new_password: "",
                        confirm_password: ""

                    }

                }

            }

        }

    },

    components: { Errors, Success },

    methods: {

        ...mapActions([ 'load' ]),

        update() {

            axios.put("/user/info/update", this.form.update.inputs).then(response => {

                this.form.update.errors = {}

                this.form.update.success = response.data.message

            }).catch(error => {

                this.form.update.success = ""

                this.form.update.errors = error.response.data.errors

                for(let name in this.form.update.state) {

                    if(error.response.data.errors[name]) {

                        this.form.update.state[name].error = error.response.data.errors[name]

                    }

                }

            });

        },

        change() {

            axios.put("/password/change", this.form.change.inputs).then(response => {

                this.form.change.errors = {}

                this.form.change.success = response.data.message

            }).catch(error => {

                this.form.change.success = ""

                this.form.change.errors = error.response.data.errors

                for(let name in this.form.change.state) {

                    if(error.response.data.errors[name]) {

                        this.form.change.state[name].error = error.response.data.errors[name]

                    }

                }

            })

        }

    },

    mounted() {

        document.title = this.title
    
        const user = JSON.parse(localStorage.getItem("user"))

        axios.get("/user/get/" + user.id).then(response => {

            this.user = response.data
    
            this.form.update.inputs.firstname = this.user.name
            this.form.update.inputs.lastname = this.user.lastname
            this.form.update.inputs.birth_date = this.user.birth_date
            this.form.update.inputs.mobile_number = this.user.mobile_number

            this.load('finish')

        }).catch(error => {

            console.log(error)

        });
        
    }

}
</script>