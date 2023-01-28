<template>

    <div class="loading" v-if="!ready"></div>

    <Transition name="fade" appear>

        <aside v-if="ready">

            <div class="app-table-buttons">

                <div class="app-page-title">{{ title }}</div>

            </div>

            <div class="cards row">
                    
                <TransitionGroup name="fade" appear>

                    <div class="col-4 mb-4" v-for="item in data.projects" :key="item.id">

                        <div class="card">

                            <img class="card-img-top" src="http://mechanization.rda.gov.ge/client/slides/slide-1.jpg">
                            
                            <div class="card-body">
                                <p class="card-text">{{ item.project_title }}</p>
                                <router-link :to="'/add?name=' + item.project_name" class="btn btn-primary d-grid">ინფორმაცია</router-link>
                            </div>

                            <ul class="list-group list-group-flush">
                                <li class="list-group-item text-center" :class="item.project_active ? 'text-success' : 'text-danger'">{{ item.project_active ? 'პროგრამა აქტიურია' : 'პროგრამა შეჩერებულია' }}</li>
                                <li class="list-group-item text-center">პროექტის ბიუჯეტი შეადგენს <strong>{{ Number(item.project_budget).toLocaleString('ka-GE', { style: 'decimal' }) }}</strong> ლარს</li>
                            </ul>

                            <div class="card-body">
                                <router-link :to="'/add?name=' + item.project_name" class="btn btn-success d-grid">განაცხადის შევსება</router-link>
                            </div>

                        </div>

                    </div>

                </TransitionGroup>

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

            title: 'აირჩიეთ პროექტი',

            data: {
                
                projects: []

            }

        }

    },

    computed: {

        ...mapState({

            ready(state) {
                
                return state.ready && this.data.projects.length

            }

        })

    },

    mounted() {

        document.title = this.title

        axios.get("/settings/projects").then(response => {

            this.data.projects = response.data;

        }).catch(error => {

            console.log(error)

        })
        
    }

}
</script>