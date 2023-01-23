<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-page-title">ინფორმაცია</div>

            <div class="app-info-table">

                <table class="table">

                    <tbody>

                        <tr>
                            <td class="p-3">სტატუსი</td>
                            <td class="p-3">{{ user.role_name }}</td>
                        </tr>
                        <tr>
                            <td class="p-3">დამატებული განცხადებები</td>
                            <td class="p-3">{{ 0 }}</td>
                        </tr>
                        <tr>
                            <td class="p-3">სახელი, გვარი</td>
                            <td class="p-3">{{ user.name + " " + user.lastname }}</td>
                        </tr>
                        <tr>
                            <td class="p-3">ტელეფონის ნომერი</td>
                            <td class="p-3">{{ user.mobile_number }}</td>
                        </tr>
                        <tr>
                            <td class="p-3">ელ. ფოსტა</td>
                            <td class="p-3">{{ user.email }}</td>
                        </tr>
                        <tr>
                            <td class="p-3">პირადი ნომერი</td>
                            <td class="p-3">{{ user.personal_id }}</td>
                        </tr>
                        <tr>
                            <td class="p-3">დაბადების თარიღი</td>
                            <td class="p-3">{{ user.birth_date }}</td>
                        </tr>

                    </tbody>

                </table>

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

            user: {}

        }

    },

    methods: {

        ...mapActions([ 'load' ])

    },

    mounted() {

        document.title = 'ინფორმაცია'
    
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