<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-table-buttons">

                <div class="app-page-title">ანგარიშის რედაქტირება</div>

            </div>

            <div class="app-form">
                
                <form @submit.prevent="submit">

                    <div class="row">

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.email.error.length">
                            <label for="email" class="mb-2">ელ. ფოსტა</label>
                            <input type="text" class="form-control" v-model="form.inputs.email" id="email" placeholder="ელ. ფოსტა ...">
                        </div>

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.role_id.error.length">
                            <label for="role_id" class="mb-2">დაშვების დონე</label>
                            <select class="form-select" id="role_id" v-model="form.inputs.role_id">
                                <option v-for="item in form.data.roles" :key="item.id" :value="item.id">{{ item.role_name }}</option>
                            </select>
                        </div>

                    </div>

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

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.password.error.length">
                            <label for="password" class="mb-2">ახალი პაროლი</label>
                            <input type="password" class="form-control" name="password" v-model="form.inputs.password" id="password" placeholder="ახალი პაროლი">
                        </div>

                        <div class="form-input col-6 mb-3" :data-error="!!form.state.confirm_password.error.length">
                            <label for="confirm_password" class="mb-2">გაიმეორეთ ახალი პაროლი</label>
                            <input type="password" class="form-control" name="confirm_password" v-model="form.inputs.confirm_password" id="confirm_password" placeholder="გაიმეორეთ ახალი პაროლი">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 mb-4">
                        <button type="submit" class="btn btn-success">ანგარიშის განახლება</button>
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

                    role_id: { error: [] },
                    email: { error: [] },
                    firstname: { error: [] },
                    lastname: { error: [] },
                    password: { error: [] },
                    confirm_password: { error: [] }

                },

                inputs: {

                    role_id: 0,
                    email: "",
                    firstname: "",
                    lastname: "",
                    password: "",
                    confirm_password: ""

                },

                data: {

                    roles: []

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

            axios.put("/user/edit/"+this.$route.query.id, this.form.inputs).then(response => {

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

        axios.get("/settings/roles").then(response => {

            this.form.data.roles = response.data

        }).catch(error => {

            console.log(error)

        })

        axios.get("/user/get/"+this.$route.query.id).then(response => {

            this.form.inputs.role_id = response.data.role_id
            this.form.inputs.email = response.data.email
            this.form.inputs.firstname = response.data.firstname
            this.form.inputs.lastname = response.data.lastname

            this.load('finish')

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>