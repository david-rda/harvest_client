<template>

    <Transition name="fade" appear>

        <aside>

            <div class="d-flex justify-content-center p-4">
                <img src="../../assets/images/RDA-Logo-Geo.png" width="400" />
            </div>

            <div class="app-sign-form">

                <form class="card" @submit.prevent="submit">

                    <div class="app-sign-form-title">პაროლის აღდგენა</div>

                    <div class="row">

                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.email.error.length">
                            <label for="email" class="mb-2">ელ. ფოსტა</label>
                            <input type="text" class="form-control" placeholder="ელ. ფოსტა" id="email" v-model="form.inputs.email">
                        </div>
                        
                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.personal_id.error.length">
                            <label for="personal_id" class="mb-2">პირადი ნომერი</label>
                            <input type="text" class="form-control" placeholder="პირადი ნომერი" id="personal_id" v-model="form.inputs.personal_id">
                        </div>
                        
                    </div>

                    <div class="app-form-buttons mt-4 mb-4 row">

                        <div class="col-7 text-start">
                            გაქვს ანგარიში ? <router-link to="/signin" class="link">გაიარე ავტორიზაცია.</router-link>
                        </div>

                        <div class="col-5 text-end">
                            <button type="submit" class="btn btn-primary">პაროლის აღდგენა</button>
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

                errors: {},

                success: "",

                state: {

                    email: { error: [] },
                    personal_id: { error: [] }

                },

                inputs: {

                    email : "",
                    personal_id : ""

                }

            }

        }
    },

    components: { Errors, Success },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.post("/password/recovery", this.form.inputs).then(response => {

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