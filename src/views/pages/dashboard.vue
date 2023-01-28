<template>

    <div class="loading" v-if="!ready"></div>

    <Transition name="fade" appear>

        <aside v-if="ready">

            <div class="app-table-buttons">

                <div class="app-page-title">ანგარიშის ინფორმაცია</div>

            </div>

            <div class="app-info-table">

                <table class="table">

                    <tbody>

                        <tr>
                            <td class="p-3">სტატუსი</td>
                            <td class="p-3">{{ user.role_name }}</td>
                        </tr>
                        <tr>
                            <td class="p-3">დამატებული განცხადებები</td>
                            <td class="p-3">{{ user.application_count }}</td>
                        </tr>
                        <tr>
                            <td class="p-3">სახელი, გვარი</td>
                            <td class="p-3">{{ user.firstname + " " + user.lastname }}</td>
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
import { mapState } from 'vuex'

import axios from "axios";

export default {

    data() {

        return {

            user: {}

        }

    },

    computed: {

        ...mapState({

            ready(state) {
                
                return state.ready && Object.keys(this.user).length

            }

        })

    },
    
    mounted() {

        document.title = 'ინფორმაცია'
    
        const user = JSON.parse(window.localStorage.getItem("user"));

        axios.get("/user/get/" + user.id).then(response => {

            this.user = response.data;

        }).catch(error => {

            console.log(error)

        });
        
    }

}
</script>