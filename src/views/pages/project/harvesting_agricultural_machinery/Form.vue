<template>

    <div>
        
        <!-- მეწილეების გრაფა იურიდიული პირისთვის -->
        <section class="mb-5" v-if="is_legal">

            <div class="mb-4 form-inputs-inline">

                <h6>დამფუძნებლების / მეპაიეების სტრუქტურა</h6>

                <div class="row mb-2 mt-4 d-flex align-items-end">

                    <div class="form-input position-relative col-md-5 col-lg-5 col-sm-12 col-xs-12">
                        <label>დამფუძნებლის / მეპაიის სახელი, გვარი ( იურიდიული პირის შემთხვევაში დასახელება )</label>
                    </div>
                    <div class="form-input position-relative col-md-3 col-lg-3 col-sm-12 col-xs-12">
                        <label>პირადი ნომერი / საიდენტიფიკაციო ნომერი</label>
                    </div>
                    <div class="form-input position-relative col-md-3 col-lg-3 col-sm-12 col-xs-12">
                        <label>კომპანიის წილის / პაის / აქციების მფლობელობა პროცენტებში / ერთეულებში</label>
                    </div>
                    <div class="form-input text-center position-relative col-md-1 col-lg-1 col-sm-12 col-xs-12" v-if="!read">
                        <label>წაშლა</label>
                    </div>
                    
                </div>

                <TransitionGroup name="fade" appear>
                
                    <div class="row mb-2" v-for="item in form.inputs.founders" :key="item.index">

                        <div class="form-input position-relative col-md-5 col-lg-5 col-sm-12 col-xs-12" :data-error="!!form.state.founders[item.index].name.error.length">
                            <input type="text" class="form-control" placeholder="დამფუძნებელი / მეპაიე ..." v-model="form.inputs.founders[item.index].name" :readonly="read" :disabled="read">
                        </div>

                        <div class="form-input position-relative col-md-3 col-lg-3 col-sm-12 col-xs-12" :data-error="!!form.state.founders[item.index].identifier.error.length">
                            <input type="text" class="form-control" placeholder="პ/ნ. / ს/კ. ..." v-model="form.inputs.founders[item.index].identifier" :readonly="read" :disabled="read">
                        </div>

                        <div class="form-input position-relative col-md-3 col-lg-3 col-sm-12 col-xs-12" :data-error="!!form.state.founders[item.index].percent.error.length">
                            <input type="text" ref="part" class="form-control" placeholder="წილი" v-model="form.inputs.founders[item.index].percent" @input="founder" :readonly="read" :disabled="read">
                        </div>

                        <div class="form-input position-relative d-grid col-md-1 col-lg-1 col-sm-12 col-xs-12" :data-error="!!form.state.founders[item.index].percent.error.length" v-if="!read">
                            <div class="btn btn-danger" @click="removeItem('founders', item.index)" :class="{ 'disabled' : form.inputs.founders.length == 1 }">წაშლა</div>
                        </div>
                        
                    </div>

                </TransitionGroup>

            </div>

            <div class="app-single-button btn btn-primary" @click="addItem('founders')" v-if="!read">დამფუძნებლის დამატება&nbsp;<BIconPlusLg /></div>

            <div class="row mt-4" v-if="is_legal">
                <p>საერთო წილი: <b ref="percent_of_part" :class="founders > 100 ? 'text-danger' : ''">{{ founders }}</b><b>%</b></p>
            </div>

        </section>

        <section class="mb-5">

            <h6>თანადაფინანსების განაცხადის მიზნობრიობა</h6>

            <div class="row">
                <div class="form-input position-relative mt-3 mb-2 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.project_type.error.length">
                    <select class="form-select" v-model="form.inputs.project_type" @change="calculate" :readonly="read" :disabled="read">
                        <option value="0" disabled selected>აირჩიეთ მიზნობრიობა</option>
                        <option v-for="item in project_types" :key="item.id" :value="item.id">{{ item.project_type_name }}</option>
                    </select>
                    <div class="alert alert-warning mt-3" v-if="engine">ტექნიკა არ უნდა იყოს ექსპლუატაციაში ნამყოფი.</div>
                </div>
            </div>

            <div class="app-form-items" v-if="form.inputs.project_type">

                <TransitionGroup name="slide-fade" appear>
            
                    <div class="form-item" v-for="item in form.inputs.items" :key="item.index" :data-index="Number(item.index)+1">

                        <div class="row">
                            <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].name.error.length">
                                <label class="mb-2">ტექნიკის დასახელება</label>
                                <input type="text" class="form-control" placeholder="დასახელება" v-model="form.inputs.items[item.index].name" :readonly="read" :disabled="read">
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].model.error.length">
                                <label class="mb-2">მოდელი</label>
                                <input type="text" class="form-control" placeholder="მოდელი" v-model="form.inputs.items[item.index].model" :readonly="read" :disabled="read">
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].hp.error.length" v-if="engine">
                                <label class="mb-2">ძრავის სიმძლავრე (ცხ/ძ მხოლოდ ძრავიანი ტექნიკის შემთხვევაში)</label>
                                <input type="text" class="form-control" placeholder="ძრავის სიმძლავრე (ცხ/ძ მხოლოდ ძრავიანი ტექნიკის შემთხვევაში)" v-model="form.inputs.items[item.index].hp" :readonly="read" :disabled="read">
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].purpose.error.length">
                                <label class="mb-2">ტექნიკის დანიშნულება (რისთვის გამოიყენება)</label>
                                <input type="text" class="form-control" placeholder="დანიშნულება" v-model="form.inputs.items[item.index].purpose" :readonly="read" :disabled="read">
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].manufactured_in.error.length">
                                <label class="mb-2">ტექნიკის მწარმოებელი ქვეყანა</label>
                                <input type="text" class="form-control" placeholder="ქვეყანა" v-model="form.inputs.items[item.index].manufactured_in" :readonly="read" :disabled="read">
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].manufactured_on.error.length">
                                <label class="mb-2">ტექნიკის გამოშვების თარიღი <span class="text-danger">(არაუმეტეს 2 წლის)</span></label>
                                <input type="date" class="form-control" placeholder="თარიღი" v-model="form.inputs.items[item.index].manufactured_on" :readonly="read" :disabled="read">
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].company_name.error.length">
                                <label class="mb-2">ტექნიკის მომწოდებელი კომპანიის დასახელება</label>
                                <input type="text" class="form-control" placeholder="კომპანია" v-model="form.inputs.items[item.index].company_name" :readonly="read" :disabled="read">
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].company_id.error.length">
                                <label class="mb-2">ტექნიკის მომწოდებელი კომპანიის საიდენტიფიკაციო ნომერი</label>
                                <input type="text" class="form-control" placeholder="ს/კ" v-model="form.inputs.items[item.index].company_id" :readonly="read" :disabled="read">
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-input position-relative mt-3 col-lg-4 col-md-4 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].currency.error.length">
                                <label class="mb-2">ვალუტა</label>
                                <select class="form-select" v-model="form.inputs.items[item.index].currency" @change="calculate" :readonly="read" :disabled="read">
                                    <option v-for="currency in currencies" :key="currency.id" :value="currency.id">{{ currency.currency_name }} ({{ currency.currency_value }})</option>
                                </select>
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-4 col-md-4 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].price.error.length">
                                <label class="mb-2">1 ერთეული ტექნიკის ღირებულება</label>
                                <input ref="price" type="text" class="form-control" placeholder="1 ერთეული ტექნიკის ღირებულება" @input="calculate" v-model="form.inputs.items[item.index].price" :readonly="read" :disabled="read">
                            </div>
                            <div class="form-input position-relative mt-3 col-lg-4 col-md-4 col-xs-12 col-sm-12" :data-error="!!form.state.items[item.index].quantity.error.length">
                                <label class="mb-2">რაოდენობა</label>
                                <input ref="quantity" type="number" class="form-control" min="1" @input="calculate" v-model="form.inputs.items[item.index].quantity" :readonly="read" :disabled="read">
                            </div>
                        </div>

                        <div class="btn btn-danger mt-4" @click="removeItem('items',item.index)" :disabled="form.inputs.items.length==1" v-if="!read">#{{ Number(item.index)+1 }} ტექნიკის წაშლა</div>
                    
                    </div>

                </TransitionGroup>
                    
                <div class="row mt-4" v-if="!read">
                    <div class="mb-3 col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div class="app-single-button btn btn-primary" v-on:click="addItem('items')">#{{ form.inputs.items.length+1 }} ტექნიკის დამატება</div>
                    </div>
                </div>

            </div>

        </section>

    </div>

</template>

<script>
import { mapActions } from 'vuex'

export default {

    props: {
        
        read: Boolean,
        errors: Object,
        application: Object,
        project_types: Array,
        currency: Array,
        is_legal: Number

    },

    data() {

        return {

            form: {

                pattern: {

                    inputs: {

                        items: {

                            index: 0,
                            name: "",
                            model: "",
                            hp: "",
                            manufactured_on: "",
                            manufactured_in: "",
                            purpose: "",
                            company_name: "",
                            company_id: "",
                            currency: 1,
                            price: 0,
                            quantity: 1

                        },

                        founders: {
                            
                            index: 0,
                            name: "",
                            identifier: "",
                            percent: 0

                        }

                    },

                    state: {

                        items: {

                            name: { error: [] },
                            model: { error: [] },
                            hp: { error: [] },
                            manufactured_on: { error: [] },
                            manufactured_in: { error: [] },
                            purpose: { error: [] },
                            company_name: { error: [] },
                            company_id: { error: [] },
                            currency: { error: [] },
                            price: { error: [] },
                            quantity: { error: [] }

                        },

                        founders: {

                            index: { error: [] },
                            name: { error: [] },
                            identifier: { error: [] },
                            percent: { error: [] }

                        }

                    }

                },

                state: {

                    project_type: { error: [] },
                    
                    items: [{

                        name: { error: [] },
                        model: { error: [] },
                        hp: { error: [] },
                        manufactured_on: { error: [] },
                        manufactured_in: { error: [] },
                        purpose: { error: [] },
                        company_name: { error: [] },
                        company_id: { error: [] },
                        currency: { error: [] },
                        price: { error: [] },
                        quantity: { error: [] }

                    }],

                    founders: [{

                        index: { error: [] },
                        name: { error: [] },
                        identifier: { error: [] },
                        percent: { error: [] }

                    }]

                },

                inputs: {

                    project_type: 0,

                    items: [{
                        
                        index: 0,
                        name: "",
                        model: "",
                        hp: "",
                        manufactured_on: "",
                        manufactured_in: "",
                        purpose: "",
                        company_name: "",
                        company_id: "",
                        currency: 1,
                        price: 0,
                        quantity: 1
                        
                    }],

                    founders: [{

                        index: 0,
                        name: "",
                        identifier: "",
                        percent: 0

                    }]

                }

            }

        }

    },

    computed: {

        currencies() {

            return this.currency.map(item => {

                item.currency_value = Number(item.currency_value).toFixed(4)
                
                return item
                
            })

        },

        engine() {

            return Number(this.form.inputs.project_type ? this.project_types.find(item => item.id == this.form.inputs.project_type).project_type_engine : 1)

        },

        founders() {

            return Number(this.form.inputs.founders.reduce((accumulator, item) => accumulator + Number(item.percent),0))

        },

        total() {
            
            return Number(this.form.inputs.items.reduce((accumulator, item) => accumulator + (Number(item.price) * item.quantity * Number(this.currencies.find(currency => currency.id == item.currency).currency_value)), 0))
        
        }

    },

    watch: {

        form: {

            immediate: true,
            deep: true,

            handler(form) {

                this.inputs(form)

            }

        },

        application: {

            immediate: true,
            deep: true,

            handler(application) {

                if(application) {

                    application.items.forEach(() => this.form.state.items.push(this.form.pattern.state.items))

                    application.founders.forEach(() => this.form.state.founders.push(this.form.pattern.state.founders) )

                }

            }

        },

        errors: {

            immediate: true,
            deep: true,
            handler(errors) {

                Object.values(this.form.state.items).forEach((values,index) => {

                    for(let name in values) {

                        if(errors['items.'+index+'.'+name]) {

                            this.form.state.items[index][name].error = errors['items.'+index+'.'+name]

                        }

                    }

                })

                Object.values(this.form.state.founders).forEach((values,index) => {

                    for(let name in values) {

                        if(errors['founders.'+index+'.'+name]) {

                            this.form.state.founders[index][name].error = errors['founders.'+index+'.'+name]

                        }

                    }

                })

            }

        }

    },

    methods : {

        calculate() {

            let agency = 0;

            if(this.form.inputs.project_type && this.total) {

                const project = this.project_types.find(item => item.id == this.form.inputs.project_type)

                agency = this.total <= Number(project.range) ? Number(this.total) * Number(project.percent) / 100 : (this.total > Number(project.range) ? Number(project.co) : Number(project.co))

            }

            this.calculator({ total: this.total, agency: agency })

        },
        
        addItem(name) {

            const state_pattern = JSON.parse(JSON.stringify(this.form.pattern.state[name]))

            state_pattern.index = this.form.inputs[name].length

            this.form.state[name].push(state_pattern)

            const items_pattern = JSON.parse(JSON.stringify(this.form.pattern.inputs[name]))

            items_pattern.index = this.form.inputs[name].length

            this.form.inputs[name].push(items_pattern)
            
        },

        removeItem(name,index) {

            if(this.form.inputs[name].length>1) {

                this.form.inputs[name].splice(index, 1)

                for(let i in this.form.inputs[name]) {

                    this.form.inputs[name][i].index = Number(i)

                }

            }

        },

        ...mapActions([ 'calculator', 'inputs', 'load' ]),

    },

    mounted() {

        this.load('finish')

        if(this.application) {

            this.form.inputs = this.application

            this.calculator({ total: this.application.total, agency: this.application.agency })

        }

    }

}
</script>