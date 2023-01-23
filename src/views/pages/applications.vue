<template>

    <Transition name="fade" appear>

        <aside>

            <Teleport to="#portal" v-if="Object.keys(portal).length">

                <Documents :application="portal" />

            </Teleport>

            <div class="app-page-title">{{ title }}</div>

            <div class="app-table">

                <table class="table">
                
                    <thead>

                        <tr>

                            <th scope="col" class="app-table-id">განაცხადი</th>
                            <th scope="col">გაგზავნის თარიღი</th>
                            <th scope="col">სტატუსი</th>
                            <th scope="col" class="text-end">მოქმედება</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="item in data.applications" :key="item.id">

                            <td class="app-table-id">
                                <div class="app-table-uid">RDAAAM{{ item.id }}</div>
                            </td>
                            <td>
                                <div class="app-td-list" v-if="item.sent_date">
                                    <span data-td-item="date">{{ moment(new Date(item.sent_date)).format('LL') }}</span>
                                    <span data-td-item="date">{{ moment(new Date(item.sent_date)).format('LT') }}</span>
                                </div>
                                <div class="app-td-list" v-else>
                                    <span>არ არის გადაგზავნილი</span>
                                </div>
                            </td>
                            <td>
                                <div class="app-td-list">
                                    <span data-td-item="status">გადასაგზავნი</span>
                                    <span data-td-item="date">{{ moment(new Date(item.created_at)).format('lll') }}</span>
                                </div>
                            </td>
                            <td class="text-end">
                                <button class="btn btn-custom btn-sm" @click="teleport(item)">დოკუმენტაცია</button>
                                <router-link class="btn btn-success btn-sm" :to="'/application?popup=documents&application=' + item.id">განაცხადის გაგზავნა</router-link>
                                <router-link class="btn btn-primary btn-sm" :to="'/application.edit?application=' + item.id">რედაქტირება</router-link>
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </aside>

    </Transition>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

import axios from 'axios'

import Documents from '@/components/static/Documents.vue'

export default {

    data() {

        return {
            
            title: 'ჩემი განაცხადები',

            data: {
                
                applications: []

            }

        }

    },

    components: { Documents },

    computed: {

        ...mapState({

            portal: state => state.portal

        })

    },

    methods: {

        ...mapActions([ 'load', 'teleport' ]),

        moment(date) {

            return moment(date)

        }

    },

    mounted() {

        document.title = this.title;

        moment.locale('ka'); 

        axios.get("/application/list").then(response => {

            this.data.applications = response.data

            this.load('finish')

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>