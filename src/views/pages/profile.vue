<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-page-title">{{ title }}</div>

            <div class="app-form">
                
                <form @submit.prevent="submit">

                    <div class="row">

                        <div class="form-input col-6 mb-3">
                            <label for="old_password" class="mb-2">სახელი</label>
                            <input type="text" class="form-control" v-model.trim="form.inputs.firstname" placeholder="სახელი ...">
                        </div>

                        <div class="form-input col-6 mb-3">
                            <label for="old_password" class="mb-2">გვარი</label>
                            <input type="text" class="form-control" v-model.trim="form.inputs.lastname" placeholder="გვარი ...">
                        </div>

                    </div>

                    <div class="row">
                        
                        <div class="form-input col-6 mb-3">
                            <label for="old_password" class="mb-2">დაბადების თარიღი</label>
                            <input type="date" class="form-control" v-model.trim="form.inputs.bd" placeholder="დაბადების თარიღი ...">
                        </div>

                        <div class="form-input col-6  mb-3">
                            <label for="old_password" class="mb-2">ტელეფონის ნომერი</label>
                            <input type="text" class="form-control" v-model.trim="form.inputs.phone" placeholder="ტელეფონის ნომერი ...">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 d-grid">
                        <button type="submit" class="btn btn-success">პროფილის განახლება</button>
                    </div>

                </form>

            </div>

        </aside>

    </Transition>

</template>

<script>
import { mapActions } from 'vuex'

import axios from "axios";

export default {

    data() {

        return {

            title: 'ჩემი პროფილი',

            form: {
                
                state: {
                    
                    firstname: { error: [] },
                    lastname: { error: [] },
                    bd: { error: [] },
                    phone: { error: [] }

                },

                inputs: {

                    firstname : "",
                    lastname : "",
                    bd : "",
                    phone : ""

                }

            }

        }

    },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.put("/user/info/update", this.form.inputs).then(response => {

                console.log(response.data)

            }).catch(error => {

                console.log(error)

            });

        }

    },

    mounted() {

        document.title = this.title
    
        const id = window.localStorage.getItem("user_id");

        axios.get("/user/get/" + id).then(response => {

            this.user = response.data
    
            this.form.inputs.firstname = this.user.name
            this.form.inputs.lastname = this.user.lastname
            this.form.inputs.bd = this.user.birth_date
            this.form.inputs.phone = this.user.mobile_number

            this.load('finish')

        }).catch(error => {

            console.log(error)

        });
        
    }

}
</script>