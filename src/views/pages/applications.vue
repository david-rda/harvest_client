<template>

    <Transition name="fade" appear>

        <aside>

            <Popup v-if="this.$route.query.popup" />

            <div class="app-table-buttons">

                <div class="app-page-title">{{ title }}</div>

            </div>

            <div class="app-table">

                <table class="table">
                
                    <thead>

                        <tr>

                            <th scope="col" class="app-table-id">განაცხადი</th>
                            <th scope="col">სტატუსი</th>
                            <th scope="col">გაგზავნის/დამატების თარიღი</th>
                            <th scope="col" v-if="roles.application.view.reviewer">პირველადი შემფასებელი</th>
                            <th scope="col" v-if="roles.application.view.officer">ოფიცერი</th>
                            <th scope="col" class="text-end">მოქმედება</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="item in data.applications" :key="item.id">

                            <td class="app-table-id">
                                <div class="app-table-uid">{{ item.application_uid }}</div>
                            </td>
                            <td>
                                <div class="app-td-list">
                                    <span data-td-item="status" v-if="item.status">{{ item.status.status_name }}</span>
                                    <span data-td-item="date">{{ item.ongoing_status.ongoing_status_name }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="app-td-list" v-if="item.sent_date">
                                    <span data-td-item="date">{{ moment(new Date(item.sent_date)).format('LLL') }}</span>
                                    <span data-td-item="date">{{ moment(new Date(item.created_at)).format('LLL') }}</span>
                                </div>
                                <div class="app-td-list" v-else>
                                    <span>არ არის გადაგზავნილი</span>
                                    <span data-td-item="date">{{ moment(new Date(item.created_at)).format('LLL') }}</span>
                                </div>
                            </td>

                            <td v-if="roles.application.view.reviewer">
                                <div class="app-table-td">{{ item.reviewer }}</div>
                            </td>

                            <td v-if="roles.application.view.officer">
                                <div class="app-table-td">{{ item.officer ? item.officer : 'არ არის განხილული' }}</div>
                            </td>

                            <td class="text-end">
                                <router-link class="btn btn-requests btn-sm" :to="{ query: { popup: 'requests', id: item.id } }" v-if="item.ongoing_status_id > 1 && roles.application.requests">მოთხოვნილი დოკუმენტები</router-link>
                                <router-link class="btn btn-custom btn-sm" :to="{ query: { popup: 'documents', id: item.id } }">წარმოსადგენი დოკუმენტაცია</router-link>
                                <router-link class="btn btn-success btn-sm" :to="{ query: { popup: 'send', id: item.id } }" v-if="item.ongoing_status_id == 1 && roles.application.send">განაცხადის გაგზავნა</router-link>
                                <router-link class="btn btn-primary btn-sm" :to="'/application.edit?application=' + item.id" v-if="item.ongoing_status_id == 1 && roles.application.edit">რედაქტირება</router-link>
                                <router-link class="btn btn-primary btn-sm" :to="'/application.read?application=' + item.id" v-if="item.ongoing_status_id > 1">წაკითხვა</router-link>
                                <router-link class="btn btn-secondary btn-sm app-manage" :to="{ query: { popup: 'manage', id: item.id, tab: 1 } }" v-if="roles.application.manage"><BIconGearFill />განცხადების მართვა</router-link>
                            </td>

                        </tr>

                    </tbody>

                </table>

                <div class="alert alert-danger text-center" v-if="!data.applications.length">შენ არ გაქვს არც ერთი განაცხადი დამატებული.</div>

            </div>

        </aside>

    </Transition>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import moment from 'moment'
import axios from 'axios'

import Popup from '@/components/static/popup.vue'

export default {

    data() {

        return {
            
            title: 'ჩემი განაცხადები',

            data: {
                
                applications: []

            }

        }

    },

    components: { Popup },

    computed: {

        ...mapState({
            
            roles: state => state.roles

        }),

        ...mapGetters([ 'roles' ])

    },

    methods: {

        ...mapActions([ 'load' ]),

        moment(date) {

            return moment(date)

        },

        applications() {

            axios.get("/application/list").then(response => {

                this.data.applications = response.data

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

                    this.applications()

                    this.$route.params.reload = false

                }

            }


        }

    },

    mounted() {

        document.title = this.title

        moment.locale('ka')

        this.applications()

    }

}
</script>