<template>

    <Transition name="fade" appear>

        <aside>

            <Popup v-if="this.$route.query.popup" />

            <div class="app-table-buttons">

                <div class="app-page-title">{{ title }}</div>

                <router-link class="btn btn-primary" :to="{ path: '/user.add' }">ახალი მომხმარებლის დამატება</router-link>

            </div>

            <div class="app-table">

                <table class="table">
                
                    <thead>

                        <tr>

                            <th scope="col" class="app-table-id">#</th>
                            <th scope="col">სახელი, გვარი</th>
                            <th scope="col">სტატუსი</th>
                            <th scope="col">ელ. ფოსტა</th>
                            <th scope="col">მობილურის ნომერი</th>
                            <th scope="col">განაცხადების რაოდენობა</th>
                            <th scope="col" class="text-end">მოქმედება</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="(item, index) in data.users" :key="item.id">

                            <td class="app-table-id">
                                <div class="app-table-td text-center">{{ index + 1 }}</div>
                            </td>
                            <td>
                                <div class="app-table-td">{{ item.firstname }} {{ item.lastname }}</div>
                            </td>
                            <td>
                                <div class="app-table-td">{{ item.role_name }}</div>
                            </td>
                            <td>
                                <div class="app-table-td">{{ item.email }}</div>
                            </td>
                            <td>
                                <div class="app-table-td">{{ item.mobile_number }}</div>
                            </td>
                            <td>
                                <div class="app-table-td">0</div>
                            </td>
                            <td class="text-end">
                                <router-link class="btn btn-custom btn-sm" :to="{ path: '/manage.user.edit', query: { id: item.id } }">რედაქტირება</router-link>
                            </td>

                        </tr>

                    </tbody>

                </table>

                <div class="alert alert-danger text-center" v-if="!data.users.length">მომხმარებლები არ არის დამატებული.</div>

            </div>

        </aside>

    </Transition>

</template>

<script>
import { mapActions } from 'vuex'

import moment from 'moment'
import axios from 'axios'

import Popup from '@/components/static/popup.vue'

export default {

    data() {

        return {
            
            title: 'მომხმარებლების მართვა',

            data: {
                
                users: []

            }

        }

    },

    components: { Popup },

    methods: {

        ...mapActions([ 'load' ]),

        moment(date) {

            return moment(date)

        },

        users() {

            axios.get("/settings/users").then(response => {

                this.data.users = response.data

                this.load('finish')

            }).catch(error => {

                console.log(error)

            })

        }

    },

    watch: {

        $route: {

            immediate: true,
            deep: true,

            handler(to, from) {

                if(from?.params.reload) {

                    this.users()

                    this.$route.params.reload = false

                }

            }


        }

    },

    mounted() {

        document.title = this.title;

        moment.locale('ka'); 

        this.users()

    }

}
</script>