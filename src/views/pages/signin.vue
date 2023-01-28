<template>

    <Transition name="fade" appear>

        <aside>

            <div class="d-flex justify-content-center p-4">
                <img src="../../assets/images/RDA-Logo-Geo.png" width="400" />
            </div>

            <div class="app-sign-form">

                <form class="card" @submit.prevent="submit">

                    <div class="app-sign-form-title">ავტორიზაცია</div>

                    <div class="app-sign-form-inputs">

                        <div class="row">

                            <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.email.error.length">
                                <label for="email" class="mb-2">ელ. ფოსტა</label>
                                <input type="text" class="form-control" placeholder="ელ. ფოსტა" id="email" v-model="form.inputs.email" :disabled="form.processing">
                            </div>
                            <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.password.error.length">
                                <label for="password" class="mb-2">პაროლი</label>
                                <input type="password" class="form-control" placeholder="პაროლი" id="password" v-model="form.inputs.password" :disabled="form.processing">
                            </div>
                            <div class="col-12 mt-2">
                                <router-link to="/recovery" class="link">პაროლის აღდგენა</router-link>
                            </div>
                            
                        </div>

                        <div class="app-form-buttons mt-4 mb-4 row">

                            <div class="col-7 text-start">
                                არ გაქვს ანგარიში ? <router-link to="/signup" class="link">შექმენი ახალი.</router-link>
                            </div>

                            <div class="col-5 text-end">
                                <button type="submit" class="btn btn-primary" :disabled="form.processing">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="form.processing"></span>
                                    ავტორიზაცია
                                </button>
                            </div>

                        </div>
                    
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

import axios from "axios";

import Errors from '@/components/static/errors.vue'
import Success from '@/components/static/success.vue'

export default {
    
    data() {

        return {

            form: {

                processing: false,

                errors: {},

                success: "",

                state: {

                    email: { error: [] },
                    password: { error: [] }

                },

                inputs: {

                    email : "",
                    password : ""

                }

            }

        }
    },

    components: { Errors, Success },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            this.reset()

            this.form.processing = true

            axios.post("/login", this.form.inputs).then(response => {

                this.form.errors = {}

                this.form.success = response.data.message

                window.localStorage.setItem("user", JSON.stringify({

                    token: response.data.token,
                    id: response.data.user.id,
                    firstname: response.data.user.firstname,
                    lastname: response.data.user.lastname,
                    role: {
                        
                        id: response.data.user.role_id,
                        name: response.data.user.role_name

                    }

                }))

                setTimeout(() => {

                    this.$router.go({ path: '/dashboard' });

                }, 2000)

            }).catch(error => {

                this.form.success = ""

                this.form.errors = error.response.data.errors

                for(let name in this.form.state) {

                    if(error.response.data.errors[name]) {

                        this.form.state[name].error = error.response.data.errors[name]

                    }

                }

                this.form.processing = false

            })
        
        },

        reset() {

            this.form.errors = {}

            for(let name in this.form.state) {

                this.form.state[name].error= []

            }

        }

    },

    mounted() {

        this.load('finish')

    }

}
</script>