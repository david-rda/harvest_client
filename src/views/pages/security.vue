<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-page-title">{{ title }}</div>

            <div class="app-form">
                
                <form @submit.prevent="submit">

                    <div class="row">

                        <div class="form-input col-12 mb-3" :data-error="!!form.state.current_password.error.length">
                            <label for="current_password" class="mb-2">მიმდინარე პეროლი</label>
                            <input type="password" class="form-control" name="old_password" v-model="form.inputs.current_password" id="current_password" placeholder="მიმდინარე პაროლი">
                        </div>

                    </div>
                    
                    <div class="row">

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.new_password.error.length">
                            <label for="new_password" class="mb-2">ახალი პაროლი</label>
                            <input type="password" class="form-control" name="new_password" v-model="form.inputs.new_password" id="new_password" placeholder="ახალი პაროლი">
                        </div>

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.confirm_password.error.length">
                            <label for="confirm_password" class="mb-2">გაიმეორეთ ახალი პაროლი</label>
                            <input type="password" class="form-control" name="confirm_password" v-model="form.inputs.confirm_password" id="confirm_password" placeholder="გაიმეორეთ ახალი პაროლი">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 mb-4">
                        <button type="submit" class="btn btn-success">პაროლის შეცვლა</button>
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

import Errors from '@/components/static/errors.vue'
import Success from '@/components/static/success.vue'

export default {

    data() {

        return {

            title: 'პაროლის შეცვლა',

            form: {
                
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

    },

    components: { Errors, Success },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.put("/password/change", this.form.inputs).then(response => {

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

        document.title = this.title
    
        const user = JSON.parse(localStorage.getItem("user"));

        axios.get("/user/get/" + user.id).then(response => {

            this.user = response.data;

            this.load('finish')

        }).catch(error => {

            console.log(error)

        });
        
    }

}
</script>