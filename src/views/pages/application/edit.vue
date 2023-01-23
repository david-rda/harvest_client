<template>

    <Transition name="fade" appear>

        <aside>

            <div class="app-page-title">{{ form.data.project.project_title }}</div>

            <form class="app-form" @submit.prevent="saveApplication">

                <section class="mb-5">

                    <h6>ზოგადი ინფორმაცია განმცხადებელზე</h6>

                    <div class="row">
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.applicant_firstname.error.length">
                            <label for="name" class="mb-2">განმცხადებლის სახელი</label>
                            <input type="text" class="form-control" placeholder="სახელი" id="name" v-model="form.inputs.applicant_firstname">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.applicant_lastname.error.length">
                            <label for="lastname" class="mb-2">განმცხადებლის გვარი</label>
                            <input type="text" class="form-control" placeholder="გვარი" id="lastname" v-model="form.inputs.applicant_lastname">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.applicant_phone.error.length">
                            <label for="phone" class="mb-2">მობილური ტელეფონის ნომერი</label>
                            <input type="text" class="form-control" placeholder="ნომერი" id="phone" v-model="form.inputs.applicant_phone" maxlength="9">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.applicant_email.error.length">
                            <label for="email" class="mb-2">ელ. ფოსტა</label>
                            <input type="text" class="form-control" placeholder="ელ. ფოსტა" id="email" v-model="form.inputs.applicant_email">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-input position-relative mt-3 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.applicant_additional_info.error.length">
                            <label for="email" class="mb-2">დამატებითი ინფორმაცია</label>
                            <textarea class="form-control" placeholder="დამატებითი ინფორმაცია" id="applicant_additional_info" v-model="form.inputs.applicant_additional_info"></textarea>
                        </div>
                    </div>

                </section>

                <section class="mb-5">

                    <h6>ზოგადი ინფორმაცია პოტენციურ ბენეფიციარზე</h6>

                    <div class="row">
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_legal_status_id.error.length">
                            <label class="mb-2">იურიდიული სტატუსი</label>
                            <select class="form-select" id="beneficiary_legal_status_id" v-model="form.inputs.beneficiary_legal_status_id" v-on:change="setJuridicalStatus($event)">
                                <option v-for="item in form.data.legal_status" :key="item.id" :value="item.id">{{ item.legal_status_name }}</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- ინდ. მეწარმის ან ფიზიკური პირის ველები -->
                    <div class="row" v-show="!form.params.is_legal">
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_firstname.error.length">
                            <label for="beneficiary_firstname" class="mb-2">ბენეფიციარის სახელი</label>
                            <input type="text" class="form-control" placeholder="სახელი" id="beneficiary_firstname" v-model="form.inputs.beneficiary_firstname">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_lastname.error.length">
                            <label for="beneficiary_lastname" class="mb-2">ბენეფიციარის გვარი</label>
                            <input type="text" class="form-control" placeholder="გვარი" id="beneficiary_lastname" v-model="form.inputs.beneficiary_lastname">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_pid.error.length">
                            <label for="beneficiary_pid" class="mb-2">ბენეფიციარის პირადი ნომერი</label>
                            <input type="text" class="form-control" placeholder="პირადი ნომერი" id="beneficiary_pid" v-model="form.inputs.beneficiary_pid">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_gender.error.length">
                            <label for="beneficiary_gender" class="mb-2">ბენეფიციარის სქესი</label>
                            <select class="form-select" id="beneficiary_gender" v-model="form.inputs.beneficiary_gender">
                                <option value="0" disabled selected>აირჩიეთ</option>
                                <option v-for="item in form.data.genders" :key="item.id" :value="item.id">{{ item.gender_name }}</option>
                            </select>
                        </div>
                    </div>
                    <!-- ინდ. მეწარმის ველები -->

                    <!-- იურიდიული პირის ველები -->
                    <div class="row" v-show="form.params.is_legal">
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_juridical_status_id.error" v-show="form.params.is_legal">
                            <label class="mb-2">სამეწარმეო სტატუსი</label>
                            <select class="form-select" v-model="form.inputs.beneficiary_juridical_status_id">
                                <option value="0" disabled selected>აირჩიეთ</option>
                                <option v-for="item in form.data.juridical_status" :key="item.id" :value="item.id">{{ item.juridical_status_name }}</option>
                            </select>
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_company_name.error.length">
                            <label for="beneficiary_company_name" class="mb-2">კომპანიის დასახელება</label>
                            <input type="text" class="form-control" placeholder="კომპანიის დასახელება" id="beneficiary_company_name" v-model="form.inputs.beneficiary_company_name">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.identifier.error.length">
                            <label for="identifier" class="mb-2">კომპანიის საიდენტიფიკაციო ნომერი</label>
                            <input type="text" class="form-control" placeholder="კომპანიის საიდენტიფიკაციო ნომერი" id="identifier" v-model="form.inputs.identifier">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_company_director.error.length">
                            <label for="beneficiary_company_director" class="mb-2">კომპანიის დირექტორის სახელი, გვარი</label>
                            <input type="text" class="form-control" placeholder="სახელი, გვარი" id="beneficiary_company_director" v-model="form.inputs.beneficiary_company_director">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_company_phone.error.length">
                            <label for="beneficiary_company_phone" class="mb-2">მობილური ტელეფონის ნომერი</label>
                            <input type="text" class="form-control" placeholder="ნომერი" id="beneficiary_company_phone" v-model="form.inputs.beneficiary_company_phone">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_company_additional_phone.error.length">
                            <label for="beneficiary_company_additional_phone" class="mb-2">დამატებითი ტელეფონის ნომერი</label>
                            <input type="text" class="form-control" placeholder="დამატებითი ნომერი" id="beneficiary_company_additional_phone" v-model="form.inputs.beneficiary_company_additional_phone">
                        </div>
                    </div>
                    <!-- იურიდიული პირის ველები -->

                    <div class="row">
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_actual_address.error.length">
                            <label for="beneficiary_actual_address" class="mb-2">ფაქტობრივი მისამართი</label>
                            <input type="text" class="form-control" placeholder="მისამართი" id="beneficiary_actual_address" v-model="form.inputs.beneficiary_actual_address">
                        </div>
                        <div class="form-input position-relative mt-3 col-md-6 col-lg-6 col-sm-12 col-xs-12" :data-error="!!form.state.beneficiary_juridical_address.error.length">
                            <label for="beneficiary_juridical_address" class="mb-2">იურიდიული მისამართი</label>
                            <input type="text" class="form-control" placeholder="მისამართი" id="beneficiary_juridical_address" v-model="form.inputs.beneficiary_juridical_address">
                        </div>
                    </div>

                </section>

                <component v-if="DynamicForm" v-bind:is="DynamicForm" :errors="form.errors" :application="application" :inputs="form.inputs" :project_types="form.data.project.project_types" :currency="form.data.currency" :is_legal="form.params.is_legal"></component>

                <section class="mb-4">

                    <h6 class="col-md-3 mt-4">დაფინანსების წყაროები</h6>

                    <div class="row mt-3">

                        <ul class="app-calculator">

                            <li><strong>საკუთარი სახსრები / დაფინანსების სხვა ფულადი წყარო</strong> {{ calculated.own }} <strong>ლარი</strong></li>
                            <li><strong>სააგენტოს დაფინანსება</strong> {{ calculated.agency }} <strong>ლარი</strong></li>
                            <li><strong>სულ</strong> {{ calculated.total }} <strong>ლარი</strong></li>

                        </ul>

                    </div>

                    <button class="app-form-submit-button btn btn-success mt-2" :disabled="form.loading">განაცხადის შენახვა</button>

                </section>

                <Errors :errors="form.errors" v-if="form.errors"/>

                <Success :message="form.success" v-if="form.success"/>
                
                <!--
                <div class="mt-4">
                    <code>
                        <pre>{{ Object.assign({}, form.inputs, dynamic.inputs ) }}</pre>
                    </code>
                </div>
                -->
        
            </form>
        
        </aside>

    </Transition>

</template>

<script>
import { markRaw, defineAsyncComponent } from "vue"
import { mapState, mapActions } from 'vuex'

import axios from "axios"

import Errors from '@/components/Errors.vue'
import Success from '@/components/Success.vue'

export default {

    data() {

        return {

            DynamicForm: false,

            application: {},

            form: {

                loading: false,

                errors: {},

                success: "",

                inputs: {

                    applicant_firstname: "",
                    applicant_lastname: "",
                    applicant_phone: "",
                    applicant_email: "",
                    applicant_additional_info: "",

                    beneficiary_legal_status_id: 2,
                    beneficiary_actual_address: "",
                    beneficiary_juridical_address: "",

                    beneficiary_firstname: "",
                    beneficiary_lastname: "",
                    beneficiary_pid: "",
                    beneficiary_gender: 0,

                    beneficiary_juridical_status_id: 0,
                    beneficiary_company_name: "",
                    identifier: "",
                    beneficiary_company_director: "",
                    beneficiary_company_phone: "",
                    beneficiary_company_additional_phone: ""

                },

                state: {

                    applicant_firstname: { error: [] },
                    applicant_lastname: { error: [] },
                    applicant_phone: { error: [] },
                    applicant_email: { error: [] },
                    applicant_additional_info: { error: [] },

                    beneficiary_legal_status_id: { error: [] },
                    beneficiary_actual_address: { error: [] },
                    beneficiary_juridical_address: { error: [] },

                    beneficiary_firstname: { error: [] },
                    beneficiary_lastname: { error: [] },
                    beneficiary_gender: { error: [] },
                    beneficiary_pid: { error: [] },

                    beneficiary_juridical_status_id: { error: [] },
                    beneficiary_company_name: { error: [] },
                    identifier: { error: [] },
                    beneficiary_company_director: { error: [] },
                    beneficiary_company_phone: { error: [] },
                    beneficiary_company_additional_phone: { error: [] }

                },

                data: {
                    
                    project: {

                        project_types: []

                    },
                    
                    currency: [],
                    genders: [],
                    juridical_status: [],
                    legal_status: []

                },

                params: {

                    is_legal: 0

                }

            }

        }
    },

    components: { Errors, Success },

    watch: {

        'this.form.errors': {

            deep: true,
            handler(errors) {

                this.form.errors = errors

            }

        }

    },

    methods : {

        ...mapActions([ 'load' ]),

        saveApplication() {

            this.form.errors = {}

            for(let name in this.form.state) {

                this.form.state[name].error= []

            }

            axios.put("/application/edit/" + this.$route.query.application, { ...this.form.inputs, ...this.dynamic.inputs }).then(response => {

                this.success = response.data.message

                this.$router.push({ path: '/applications' })

            }).catch(error => {

                this.form.errors = error.response.data.errors

                for(let name in this.form.state) {

                    if(error.response.data.errors[name]) {

                        this.form.state[name].error = error.response.data.errors[name]

                    }

                }

            })

        },

        setJuridicalStatus(e) {

            const is_legal = Number(this.form.data.legal_status.find((item) => item.id == e.target.value).is_legal)

            if(is_legal != this.form.params.is_legal) {

                this.form.inputs.beneficiary_firstname = "";
                this.form.inputs.beneficiary_lastname = "";
                this.form.inputs.beneficiary_pid = "";
                this.form.inputs.beneficiary_gender = 0;

                this.form.inputs.beneficiary_juridical_status_id = 0,
                this.form.inputs.beneficiary_company_name = "";
                this.form.inputs.identifier = "";
                this.form.inputs.beneficiary_company_director = "";
                this.form.inputs.beneficiary_company_phone = "";
                this.form.inputs.beneficiary_company_additional_phone = "";

            }

            this.form.params.is_legal = is_legal

        }

    },

    computed : {

        ...mapState({
            
            calculated: state => state.calculated,

            dynamic: state => state.form
            
        })

    },

    async mounted() {

        this.application = await axios.get("/application/get/"+this.$route.query.application).then(response => {

            return response.data

        }).catch(error => {

            console.log(error)

        })

        axios.post("/settings/project", { name: this.application.project.project_name }).then(response => {

            this.form.data.project = response.data.project;
            this.form.data.currency = response.data.currency;
            this.form.data.genders = response.data.genders;
            this.form.data.juridical_status = response.data.juridical_status;
            this.form.data.legal_status = response.data.legal_status;

            const DynamicForm = markRaw(defineAsyncComponent(() => import('../project/' + this.application.project.project_name + '/Form.vue')))

            this.DynamicForm = DynamicForm

            this.form.inputs = this.application

            this.form.params.is_legal = Number(this.form.data.legal_status.find((item) => item.id == this.form.inputs.beneficiary_legal_status_id).is_legal)

        }).catch(error => {

            console.log(error)

        })

    }

}
</script>