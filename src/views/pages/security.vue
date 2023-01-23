<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-page-title">{{ title }}</div>

            <div class="app-form">
                
                <form method="POST" @submit.prevent="submit">

                    <div class="row">

                        <div class="form-input col-12 mb-3">
                            <label for="old_password" class="mb-2">ძველი პეროლი</label>
                            <input type="password" class="form-control" name="old_password" id="old_password" v-model="form.inputs.current_password" placeholder="ძველი პაროლი">
                        </div>

                    </div>
                    
                    <div class="row">

                        <div class="form-input col-6 mb-3">
                            <label for="new_password" class="mb-2">ახალი პაროლი</label>
                            <input type="password" class="form-control" name="new_password" id="new_password" v-model="form.inputs.new_password" placeholder="ახალი პაროლი">
                        </div>

                        <div class="form-input col-6 mb-3">
                            <label for="confirm_password" class="mb-2">გაიმეორეთ ახალი პაროლი</label>
                            <input type="password" class="form-control" name="confirm_password" id="confirm_password" v-model="form.inputs.confirm_password" placeholder="გაიმეორეთ ახალი პაროლი">
                        </div>

                    </div>

                    <div class="form-buttons mt-3 d-grid">
                        <button type="submit" class="btn btn-success">პაროლის განახლება</button>
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

            title: 'პაროლის შეცვლა',

            form: {
                
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

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.put("/password/change", this.form.inputs).then(response => {

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

            this.user = response.data;

            this.load('finish')

        }).catch(error => {

            console.log(error)

        });
        
    }

}
</script>