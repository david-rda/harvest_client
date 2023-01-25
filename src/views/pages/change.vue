<template>

    <Transition name="fade" appear>

        <aside>

            <div class="d-flex justify-content-center p-4">
                <img src="../../assets/images/RDA-Logo-Geo.png" width="400" />
            </div>

            <div class="app-sign-form">

                <form class="card" @submit.prevent="submit">

                    <div class="app-sign-form-title">პაროლის შეცვლა</div>

                    <div class="row">

                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.password.error.length">
                            <label for="password" class="mb-2">შეიყვანეთ ახალი პაროლი</label>
                            <input type="password" class="form-control" placeholder="ელ. ფოსტა" id="password" v-model="form.inputs.password">
                        </div>
                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.password.error.length">
                            <label for="confirm_password" class="mb-2">გაიმეორეთ ახალი პაროლი</label>
                            <input type="password" class="form-control" placeholder="პაროლი" id="confirm_password" v-model="form.inputs.confirm_password">
                        </div>
                      
                    </div>

                    <div class="app-form-buttons mt-4 mb-4 row">

                        <div class="col-12">
                            <button type="submit" class="btn btn-primary d-grid">პაროლის შეცვლა</button>
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

import Errors from '@/components/Errors.vue'
import Success from '@/components/Success.vue'

export default {
    
    data() {

        return {

            form: {

                errors: {},

                success: "",

                state: {

                    password: { error: [] },
                    confirm_password: { error: [] }

                },

                inputs: {
                    
                    password : "",
                    confirm_password : ""

                }

            }

        }
    },

    components: { Errors, Success },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.put("/recovery/change/" + this.$route.query.token, this.form.inputs).then(response => {

                this.form.errors = {}

                this.form.success = response.data.message

                // this.$router.push({ path: '/signin' });

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

        this.load('finish')

    }

}
</script>