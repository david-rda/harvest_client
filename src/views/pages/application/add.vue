<template>

    <Transition name="fade" appear>

        <aside>

            <h4>{{ title }}</h4>

            <div class="cards row">
                
                <div class="col-6" v-for="item in projects" :key="item.id">
                    <div class="card">
                        <img class="card-img-top" src="http://mechanization.rda.gov.ge/client/slides/slide-1.jpg">
                        <div class="card-body">
                            <p class="card-text">{{ item.project_title }}</p>
                            <router-link :to="'/projects.' + item.project_name" class="btn btn-primary d-grid">ინფორმაცია</router-link>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-center" :class="item.project_active ? 'text-success' : 'text-danger'">{{ item.project_active ? 'პროგრამა აქტიურია' : 'პროგრამა შეჩერებულია' }}</li>
                            <li class="list-group-item text-center">პროექტის ბიუჯეტი შეადგენს <strong>{{ item.project_budget }}</strong> ლარს</li>
                            <li class="list-group-item">
                                <ul class="mt-3 mb-3">
                                    <li v-for="type in item.project_types" :key="type.id">{{ type.project_type_name }} ({{ type.percent }})%</li>
                                </ul>
                            </li>
                        </ul>
                        <div class="card-body">
                            <router-link :to="'/application/add/' + item.project_name" class="btn btn-success d-grid">განაცხადის შევსება</router-link>
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

            title: 'განაცხადის დამატება',

            projects: []

        }

    },

    methods: {

        ...mapActions([ 'load' ])

    },

    mounted() {

        document.title = this.title
    
        axios.get("/settings/projects").then(response => {

            this.projects = response.data;

            this.load('finish')

        }).catch(error => {

            console.log(error)

        });
        
    }

}
</script>