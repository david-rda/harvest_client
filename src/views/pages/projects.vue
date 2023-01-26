<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-page-title">{{ title }}</div>

            <div class="cards row">
                
                <div class="col-4" v-for="item in projects" :key="item.id">
                    <div class="card">
                        <img class="card-img-top" src="http://mechanization.rda.gov.ge/client/slides/slide-1.jpg">
                        <div class="card-body">
                            <p class="card-text">{{ item.project_title }}</p>
                            <router-link :to="'/project?name=' + item.project_name" class="btn btn-primary d-grid">ინფორმაცია</router-link>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-center" :class="item.project_active ? 'text-success' : 'text-danger'">{{ item.project_active ? 'პროგრამა აქტიურია' : 'პროგრამა შეჩერებულია' }}</li>
                            <li class="list-group-item text-center">პროექტის ბიუჯეტი შეადგენს <strong>{{ Number(item.project_budget).toLocaleString('ka-GE', { style: 'decimal' }) }}</strong> ლარს</li>
                        </ul>
                        <div class="card-body">
                            <router-link :to="'/project?name=' + item.project_name" class="btn btn-success d-grid">განაცხადის შევსება</router-link>
                        </div>
                    </div>
                </div>

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

            title: 'პროექტები',

            projects: []

        }

    },

    methods: {

        ...mapActions([ 'load' ])

    },

    mounted() {

        this.load('start')

        document.title = this.title

        axios.get("/settings/projects").then(response => {

            this.projects = response.data;

            this.load('finish')

        }).catch(error => {

            console.log(error)

        })
        
    }

}
</script>