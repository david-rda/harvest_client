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

                            <th scope="col" class="app-table-id">#</th>
                            <th scope="col">პროექტის სახელი</th>
                            <th scope="col">სრული ბიუჯეტი</th>
                            <th scope="col">ასათვისებელი ბიუჯეტი</th>
                            <th scope="col">სტატუსი</th>
                            <th scope="col">მიღებული განაცხადები</th>
                            <th scope="col" class="text-end">მოქმედება</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="(item, index) in data.projects" :key="item.id">

                            <td class="app-table-id">
                                <div class="app-table-td text-center">{{ index + 1 }}</div>
                            </td>
                            <td>
                                <div class="app-td-list">
                                    <span>{{ item.project_title }}</span>
                                    <span data-td-item="date">{{ item.project_name }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="app-table-td">{{ item.project_budget }}</div>
                            </td>
                            <td>
                                <div class="app-table-td">{{ item.project_budget }}</div>
                            </td>
                            <td>
                                <div class="app-table-td" :class="{ 'text-success-emphasis': item.project_active }">{{ item.project_active ? 'აქტიური' : 'არ არის აქტიური' }}</div>
                            </td>
                            <td>
                                <div class="app-table-td">0</div>
                            </td>
                            <td class="text-end">
                                <router-link class="btn btn-custom btn-sm" :to="{ path: '/manage.project.edit', query: { id: item.id } }">რედაქტირება</router-link>
                            </td>

                        </tr>

                    </tbody>

                </table>

                <div class="alert alert-danger text-center" v-if="!data.projects.length">პროექტები არ არის დამატებული.</div>

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
            
            title: 'პროექტების მართვა',

            data: {
                
                projects: []

            }

        }

    },

    components: { Popup },

    methods: {

        ...mapActions([ 'load' ]),

        moment(date) {

            return moment(date)

        },

        projects() {

            axios.get("/settings/projects").then(response => {

                this.data.projects = response.data

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

                    this.projects()

                    this.$route.params.reload = false

                }

            }


        }

    },

    mounted() {

        document.title = this.title;

        moment.locale('ka'); 

        this.projects()

    }

}
</script>