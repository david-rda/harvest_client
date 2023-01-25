<template>

    <Transition name="fade" appear>

        <aside>

            <div class="d-flex justify-content-center p-4">
                <img src="../../assets/images/RDA-Logo-Geo.png" width="400" />
            </div>

            <div class="app-sign-form">

                <form class="card" @submit.prevent="submit">

                    <div class="app-sign-form-title">ანგარიშის შექმნა</div>

                    <div class="row">

                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.firstname.error.length">
                            <label for="firstname" class="mb-2">სახელი</label>
                            <input type="text" class="form-control" placeholder="სახელი" id="firstname" v-model="form.inputs.firstname">
                        </div>

                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.lastname.error.length">
                            <label for="lastname" class="mb-2">გვარი</label>
                            <input type="text" class="form-control" placeholder="გვარი" id="lastname" v-model="form.inputs.lastname">
                        </div>

                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.personal_id.error.length">
                            <label for="personal_id" class="mb-2">პირადი ნომერი</label>
                            <input type="text" class="form-control" placeholder="პირადი ნომერი" id="personal_id" v-model="form.inputs.personal_id">
                        </div>

                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.email.error.length">
                            <label for="email" class="mb-2">ელ. ფოსტა</label>
                            <input type="email" class="form-control" placeholder="ელ. ფოსტა" id="email" v-model="form.inputs.email">
                        </div>

                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.birth_date.error.length">
                            <label for="birth_date" class="mb-2">დაბადების თარიღი</label>
                            <input type="date" class="form-control" placeholder="დაბადების თარიღი" id="birth_date" v-model="form.inputs.birth_date">
                        </div>

                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.mobile_number.error.length">
                            <label for="mobile_number" class="mb-2">მობილურის ნომერი</label>
                            <input type="text" class="form-control" placeholder="მობილურის ნომერი" id="mobile_number" v-model="form.inputs.mobile_number">
                        </div>
                        
                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.gender_id.error.length">
                            <label for="gender_id" class="mb-2">სქესი</label>
                            <select class="form-select" id="gender_id" v-model="form.inputs.gender_id">
                                <option value="0" disabled selected>აირჩიეთ სქესი</option>
                                <option v-for="item in form.data.genders" :key="item.id" :value="item.id">{{ item.gender_name }}</option>
                            </select>
                        </div>
                        
                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.password.error.length">
                            <label for="password" class="mb-2">პაროლი</label>
                            <input type="password" class="form-control" placeholder="პაროლი" id="password" v-model="form.inputs.password">
                        </div>
                        
                        <div class="form-input position-relative mt-3 col-12" :data-error="!!form.state.confirm_password.error.length">
                            <label for="confirm_password" class="mb-2">გაიმეორეთ პაროლი</label>
                            <input type="password" class="form-control" placeholder="გაიმეორეთ პაროლი" id="confirm_password" v-model="form.inputs.confirm_password">
                        </div>

                        <div class="col-12 mt-2">
                            <router-link to="/recovery" class="link">პაროლის აღდგენა</router-link>
                        </div>
                        
                    </div>

                    <div class="app-form-buttons mt-4 mb-4 row">

                        <div class="col-7 text-start">
                            გაქვს ანგარიში ? <router-link to="/signin" class="link">გაიარე ავტორიზაცია.</router-link>
                        </div>

                        <div class="col-5 text-end">
                            <button type="submit" class="btn btn-primary">რეგისტრაცია</button>
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

                data: {

                    genders: []

                },

                state: {

                    firstname: { error: [] },
                    lastname: { error: [] },
                    birth_date: { error: [] },
                    personal_id: { error: [] },
                    mobile_number: { error: [] },
                    email: { error: [] },
                    password: { error: [] },
                    confirm_password: { error: [] },
                    gender_id: { error: [] }

                },

                inputs: {

                    firstname: "",
                    lastname: "",
                    birth_date: "",
                    personal_id: "",
                    mobile_number: "",
                    email: "",
                    gender_id: 0,
                    password: "",
                    confirm_password: ""

                }

            }

        }
    },

    components: { Errors, Success },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.post("/register", this.form.inputs).then(response => {

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

        axios.post("/settings/project", { name: this.$route.query.name }).then(response => {

            this.form.data.genders = response.data.genders;

            this.load('finish')

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>