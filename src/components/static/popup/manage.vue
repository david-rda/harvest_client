<template>

    <div class="app-status-content" v-if="!loading">

        <div class="app-popup-title">
            
            <strong>{{ application.application_uid }}</strong> განაცხადის მართვა
            
        </div>

        <div class="app-popup-content app-manage">

            <div class="app-form">

                <ul class="nav nav-tabs">

                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active' : tab == 1 }" :to="{ path: '/applications', query: { popup: 'manage', id: this.$route.query.id, tab: 1 } }" v-if="roles.manage.review">განცხადების განხილვა</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active' : tab == 2 }" :to="{ path: '/applications', query: { popup: 'manage', id: this.$route.query.id, tab: 2 } }" v-if="roles.manage.change.reviewer">პირველადი შემფასებლის შეცვლა</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active' : tab == 3 }" :to="{ path: '/applications', query: { popup: 'manage', id: this.$route.query.id, tab: 3 } }" v-if="roles.manage.change.officer">საგრანტო და საინვესტიციო შემფასებლის შეცვლაა</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active' : tab == 4 }" :to="{ path: '/applications', query: { popup: 'manage', id: this.$route.query.id, tab: 4 } }" v-if="roles.manage.add.request">დოკუმენტების მოთხოვნა</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active' : tab == 5 }" :to="{ path: '/applications', query: { popup: 'manage', id: this.$route.query.id, tab: 5 } }" v-if="roles.manage.change.status">სტატუსი</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active' : tab == 6 }" :to="{ path: '/applications', query: { popup: 'manage', id: this.$route.query.id, tab: 6 } }" v-if="roles.manage.change.ongoing_status">მიმდინარე სტატუსი</router-link>
                    </li>

                </ul>

                <div class="app-tab-form" :class="tab == 1 ? 'd-block' : 'd-none'" v-if="roles.manage.review">

                    <form @submit.prevent="submit">

                        <div class="alert alert-warning">გაითვალისწინეთ, რომ განხილული განაცხადის სტატუსის შეცვლა შეუძლებელია.</div>

                        <div class="form-input position-relative mt-3 col-md-7 col-lg-7 col-sm-12 col-xs-12" :data-error="!!form.state.review.review_id.error.length">
                            <label for="review_id" class="mb-2">განხილვის სტატუსი</label>
                            <select class="form-select" id="review_id" v-model="form.inputs.review.review_id">
                                <option value="0" selected disabled>აირჩიეთ განხილვის სტატუსი</option>
                                <option v-for="item in form.data.review" :key="item.id" :value="item.id">{{ item.review_name }}</option>
                            </select>
                        </div>

                        <div class="form-input position-relative mt-3 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.review.comment.error.length">
                            <label for="review-comment" class="mb-2">კომენტარი</label>
                            <textarea class="form-control" placeholder="კომენტარი" id="review-comment" v-model="form.inputs.review.comment"></textarea>
                        </div>
                        
                        <div class="app-form-buttons">

                            <button class="btn btn-success mt-2">განხილვის დასრულება</button>

                        </div>

                        <Errors :errors="form.errors.review" v-if="form.errors.review"/>

                        <Success :message="form.success.review" v-if="form.success.review"/>
                    
                    </form>
                
                </div>

                <div class="app-tab-form" :class="tab == 2 ? 'd-block' : 'd-none'" v-if="roles.manage.change.reviewer">

                    <form @submit.prevent="submit">

                        <div class="form-input position-relative mt-3 col-md-7 col-lg-7 col-sm-12 col-xs-12" :data-error="!!form.state.reviewer.reviewer_id.error.length">
                            <label for="reviewer_id" class="mb-2">პირველადი შემფასებელი</label>
                            <select class="form-select" id="reviewer_id" v-model="form.inputs.reviewer.reviewer_id">
                                <option value="0" selected disabled>აირჩიეთ პირველადი შემფასებელი</option>
                                <option v-for="item in form.data.reviewer" :key="item.id" :value="item.id">{{ item.firstname }} {{ item.lastname }}</option>
                            </select>
                        </div>

                        <div class="app-form-buttons">

                            <button class="btn btn-success mt-2">პირველადი შემფასებლის შეცვლის დასრულება</button>

                        </div>

                        <Errors :errors="form.errors.reviewer" v-if="form.errors.reviewer"/>

                        <Success :message="form.success.reviewer" v-if="form.success.reviewer"/>
                    
                    </form>
                
                </div>

                <div class="app-tab-form" :class="tab == 3 ? 'd-block' : 'd-none'" v-if="roles.manage.change.officer">

                    <form @submit.prevent="submit">

                        <div class="form-input position-relative mt-3 col-md-7 col-lg-7 col-sm-12 col-xs-12" :data-error="!!form.state.officer.officer_id.error.length">
                            <label for="officer_id" class="mb-2">საგრანტო და საინვესტიციო შემფასებელი</label>
                            <select class="form-select" id="officer_id" v-model="form.inputs.officer.officer_id">
                                <option value="0" selected disabled>აირჩიეთ საგრანტო და საინვესტიციო შემფასებელი</option>
                                <option v-for="item in form.data.officer" :key="item.id" :value="item.id">{{ item.firstname }} {{ item.lastname }}</option>
                            </select>
                        </div>

                        <div class="app-form-buttons">

                            <button class="btn btn-success mt-2">საგრანტო და საინვესტიციო შემფასებელის შეცვლის დასრულება</button>

                        </div>

                        <Errors :errors="form.errors.officer" v-if="form.errors.officer"/>

                        <Success :message="form.success.officer" v-if="form.success.officer"/>
                    
                    </form>
                
                </div>

                <div class="app-tab-form" :class="tab == 4 ? 'd-block' : 'd-none'" v-if="roles.manage.add.request">

                    <form @submit.prevent="submit">

                        <div class="alert alert-warning">გაითვალისწინეთ, რომ დოკუმენტის ატვირთვის მაქსიმალური ზომა არის 80 მბ.</div>

                        <div class="form-input position-relative mt-3 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.request.comment.error.length">
                            <label for="request-comment" class="mb-2">მოთხოვნის აღწერა</label>
                            <textarea class="form-control" placeholder="კომენტარი" id="request-comment" v-model="form.inputs.request.comment"></textarea>
                        </div>
                        
                        <div class="form-input position-relative mt-3 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.request.send_email.error.length">
                            <label class="mb-2">შეტყობინება</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="send-email" v-model="form.inputs.request.send_email">
                                <label class="form-check-label" for="send-email">მოთხოვნის ელ. ფოსტაზე გაგზავნა</label>
                            </div>
                        </div>

                        <div class="form-input position-relative mt-3 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.request.extensions.error.length">
                            <label class="mb-2">დასაშვები ფაილის ფორმატები</label>
                            <div class="form-check" v-for="item in form.data.extensions" :key="item.id">
                                <input class="form-check-input" type="checkbox" :value="item.id" :id="'extension'+item.id">
                                <label class="form-check-label" :for="'extension'+item.id">{{ item.extension }}</label>
                            </div>
                        </div>

                        <div class="app-form-buttons">

                            <button class="btn btn-success mt-2">განხილვის დასრულება</button>

                        </div>

                        <Errors :errors="form.errors.request" v-if="form.errors.request"/>

                        <Success :message="form.success.request" v-if="form.success.request"/>
                    
                    </form>

                </div>

                <div class="app-tab-form" :class="tab == 5 ? 'd-block' : 'd-none'" v-if="roles.manage.change.status">

                    <form @submit.prevent="submit">

                        <div class="form-input position-relative col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.status.send_email.error.length">
                            <label class="mb-2">შეტყობინება</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="send-email" v-model="form.inputs.status.send_email">
                                <label class="form-check-label" for="send-email">სტატუსის ცვლილებაზე შეტყობინების ელ. ფოსტაზე გაგზავნა</label>
                            </div>
                        </div>

                        <div class="form-input position-relative mt-3 col-md-7 col-lg-7 col-sm-12 col-xs-12" :data-error="!!form.state.status.status_id.error.length">
                            <label for="status_id" class="mb-2">განაცხადის სტატუსი</label>
                            <select class="form-select" id="status_id" v-model="form.inputs.status.status_id">
                                <option v-for="item in form.data.status" :key="item.id" :value="item.id" :disabled="item.id == 1">{{ item.status_name }}</option>
                            </select>
                        </div>

                        <div class="form-input position-relative mt-3 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.status.comment.error.length">
                            <label for="ongoing-status-comment" class="mb-2">კომენტარი</label>
                            <textarea class="form-control" placeholder="კომენტარი" id="ongoing-status-comment" v-model="form.inputs.status.comment"></textarea>
                        </div>
                        
                        <div class="app-form-buttons">

                            <button class="btn btn-success mt-2">მიმდინარე სტატუსის შეცვლის დასრულება</button>

                        </div>

                        <Errors :errors="form.errors.review" v-if="form.errors.review"/>

                        <Success :message="form.success.review" v-if="form.success.review"/>
                    
                    </form>
                
                </div>

                <div class="app-tab-form" :class="tab == 6 ? 'd-block' : 'd-none'" v-if="roles.manage.change.ongoing_status">

                    <form @submit.prevent="submit">

                        <div class="form-input position-relative col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.ongoing_status.send_email.error.length">
                            <label class="mb-2">შეტყობინება</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="send-email" v-model="form.inputs.ongoing_status.send_email">
                                <label class="form-check-label" for="send-email">მიმდინარე სტატუსის ცვლილებაზე შეტყობინების ელ. ფოსტაზე გაგზავნა</label>
                            </div>
                        </div>

                        <div class="form-input position-relative mt-3 col-md-7 col-lg-7 col-sm-12 col-xs-12" :data-error="!!form.state.ongoing_status.ongoing_status_id.error.length">
                            <label for="ongoing_status_id" class="mb-2">განაცხადის მიმდინარე სტატუსი</label>
                            <select class="form-select" id="ongoing_status_id" v-model="form.inputs.ongoing_status.ongoing_status_id">
                                <option v-for="item in form.data.ongoing_status" :key="item.id" :value="item.id" :disabled="item.id == 1">{{ item.ongoing_status_name }}</option>
                            </select>
                        </div>

                        <div class="form-input position-relative mt-3 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.ongoing_status.comment.error.length">
                            <label for="ongoing-status-comment" class="mb-2">კომენტარი</label>
                            <textarea class="form-control" placeholder="კომენტარი" id="ongoing-status-comment" v-model="form.inputs.ongoing_status.comment"></textarea>
                        </div>
                        
                        <div class="app-form-buttons">

                            <button class="btn btn-success mt-2">მიმდინარე სტატუსის შეცვლის დასრულება</button>

                        </div>

                        <Errors :errors="form.errors.review" v-if="form.errors.review"/>

                        <Success :message="form.success.review" v-if="form.success.review"/>
                    
                    </form>
                
                </div>

            </div>

        </div>

    </div>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import axios from 'axios'

import Errors from '@/components/static/errors.vue'
import Success from '@/components/static/success.vue'

export default {

    data() {

        return {

            application: {},

            form: {

                errors: {

                    review: {},
                    reviewer: {},
                    officer: {},
                    request: {},
                    status: {},
                    ongoing_status: {}

                },

                success: {

                    review: "",
                    reviewer: "",
                    officer: "",
                    request: "",
                    status: "",
                    ongoing_status: ""

                },

                state: {

                    review: {

                        review_id: { error: [] },
                        comment: { error: [] }

                    },

                    request: {

                        send_email: { error: [] },
                        extensions: { error: [] },
                        comment: { error: [] }

                    },

                    status: {

                        send_email: { error: [] },
                        status_id: { error: [] },
                        comment: { error: [] }

                    },

                    ongoing_status: {

                        send_email: { error: [] },
                        ongoing_status_id: { error: [] },
                        comment: { error: [] }

                    },

                    reviewer: {

                        reviewer_id: { error: [] }

                    },

                    officer:  {
                        
                        officer_id: { error: [] }

                    }

                },

                inputs: {

                    review: {

                        review_id: 0,
                        comment: ""

                    },

                    request: {

                        send_email: 0,
                        extensions: [],
                        comment: ""
                        
                    },

                    status: {
                        
                        send_email: 0,
                        status_id: 0,
                        comment: ""

                    },

                    ongoing_status: {
                        
                        send_email: 0,
                        ongoing_status_id: 0,
                        comment: ""

                    },

                    reviewer: {

                        reviewer_id: 0

                    },

                    officer: {

                        officer_id: 0

                    }

                },

                data: {

                    review: [],
                    reviewer: [],
                    officer: [],
                    extensions: [],
                    status: [],
                    ongoing_status: []

                }

            }

        }

    },

    components: { Errors, Success },

    computed: {

        ...mapState({

            loading: state => state.loading

        }),

        ...mapGetters([ 'roles' ]),

        tab() {

            return this.$route.query.tab

        }

    },

    methods: {

        ...mapActions([ 'load' ]),

        submit() {

            axios.put("/application/review/"+this.$route.query.id, this.form.inputs.review).then(response => {

                this.form.errors.review = {}

                this.form.success.review = response.data.message

            }).catch(error => {

                this.form.success.review = ""

                this.form.errors.review = error.response.data.errors

                for(let name in this.form.state.review) {

                    if(error.response.data.errors[name]) {

                        this.form.state.review[name].error = error.response.data.errors[name]

                    }

                }
            })

        },

        switch(e) {

            this.tab = e.target.index()

        }

    },

    mounted() {

        axios.get("/settings/manage").then(response => {

            this.form.data.review = response.data.review;

        }).catch(error => {

            console.log(error)

        })

        axios.get("/application/get/"+this.$route.query.id).then(response => {

            this.application = response.data

            this.form.inputs.reviewer.reviewer_id = response.data.reviewer_id
            
            this.form.inputs.officer.officer_id = response.data.officer_id
            
            this.form.inputs.status.status_id = response.data.status_id
            
            this.form.inputs.ongoing_status.ongoing_status_id = response.data.ongoing_status_id
            
            this.load('finish')

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>