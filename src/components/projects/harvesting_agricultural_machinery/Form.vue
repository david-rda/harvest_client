<template>

    <div>
        
        <!-- მეწილეების გრაფა იურიდიული პირისთვის -->
        <div v-if="is_legal">

            <div class="mb-4 form-inputs-inline">

                <h6 class="col-md-4 mt-4">დამფუძნებლების / მეპაიეების სტრუქტურა</h6>

                <div class="row mb-4">

                    <div class="form-input position-relative col-md-5 col-lg-5 col-sm-12 col-xs-12">
                        <label>დამფუძნებლის / მეპაიის სახელი, გვარი ( იურიდიული პირის შემთხვევაში დასახელება )</label>
                    </div>
                    <div class="form-input position-relative col-md-3 col-lg-3 col-sm-12 col-xs-12">
                        <label>პირადი ნომერი / საიდენტიფიკაციო ნომერი</label>
                    </div>
                    <div class="form-input position-relative col-md-3 col-lg-3 col-sm-12 col-xs-12">
                        <label>კომპანიის წილის / პაის / აქციების მფლობელობა პროცენტებში / ერთეულებში</label>
                    </div>
                    <div class="form-input text-center position-relative col-md-1 col-lg-1 col-sm-12 col-xs-12">
                        <label>წაშლა</label>
                    </div>
                    
                </div>

                <div class="row mb-2" v-for="item in form.inputs.founders" :key="item.index">

                    <div class="form-input position-relative col-md-5 col-lg-5 col-sm-12 col-xs-12" :data-error="!!form.state.founders[item.index].name.error.length">
                        <input type="text" class="form-control" placeholder="დამფუძნებელი / მეპაიე ..." v-model="form.inputs.founders[item.index].name">
                    </div>

                    <div class="form-input position-relative col-md-3 col-lg-3 col-sm-12 col-xs-12" :data-error="!!form.state.founders[item.index].identifier.error.length">
                        <input type="text" class="form-control" placeholder="პ/ნ. / ს/კ. ..." v-model="form.inputs.founders[item.index].identifier">
                    </div>

                    <div class="form-input position-relative col-md-3 col-lg-3 col-sm-12 col-xs-12" :data-error="!!form.state.founders[item.index].percent.error.length">
                        <input type="text" ref="part" class="form-control" placeholder="წილი" v-model="form.inputs.founders[item.index].percent" @input="founder">
                    </div>

                    <div class="form-input position-relative col-md-1 col-lg-1 col-sm-12 col-xs-12" :data-error="!!form.state.founders[item.index].percent.error.length">
                        <div class="btn btn-danger" @click="removeItem('founders', item.index)">წაშლა</div>
                    </div>
                    
                </div>

            </div>

            <div class="btn btn-primary" @click="addItem('founders')">დამფუძნებლის დამატება&nbsp;<BIconPlusLg /></div>

        </div>

        <div class="row mt-4" v-if="is_legal">
            <p>საერთო წილი: <b ref="percent_of_part" :class="founders > 100 ? 'text-danger' : ''">{{ founders }}</b><b>%</b></p>
        </div>

        <h6 class="col-md-5">თანადაფინანსების განაცხადის მიზნობრიობა</h6>

        <div class="row">
            <div class="form-input position-relative mt-4 mb-2 col-md-12 col-lg-12 col-sm-12 col-xs-12" :data-error="!!form.state.project_type.error.length">
                <label class="mb-2">სტანდარტული ან სპეციალური თანადაფინანსების პირობა</label>
                <select class="form-select" v-model="form.inputs.project_type" @change="calculate">
                    <option value="0" disabled selected>აირჩიეთ</option>
                    <option v-for="item in project_types" :key="item.id" :value="item.id">{{ item.project_type_name }}</option>
                </select>
            </div>
        </div>
        
        <div class="form-item mt-3 p-3" v-for="item in form.inputs.data" :key="item.index" :data-index="item.index+1">

            <div class="row">
                <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].name.error.length">
                    <label class="mb-2">ტექნიკის დასახელება</label>
                    <input type="text" class="form-control" placeholder="დასახელება" v-model="form.inputs.data[item.index].name">
                </div>
                <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].model.error.length">
                    <label class="mb-2">მოდელი</label>
                    <input type="text" class="form-control" placeholder="მოდელი" v-model="form.inputs.data[item.index].model">
                </div>
            </div>

            <div class="row" v-if="engine">
                <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].hp.error.length">
                    <label class="mb-2">ძრავის სიმძლავრე (ცხ/ძ - მხოლოდ ძრავიანი ტექნიკის შემთხვევაში)</label>
                    <input type="text" class="form-control" placeholder="ძრავის სიმძლავრე (ცხ/ძ)" v-model="form.inputs.data[item.index].hp">
                </div>
                <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].purpose.error.length">
                    <label class="mb-2">ტექნიკის დანიშნულება (რისთვის გამოიყენება)</label>
                    <input type="text" class="form-control" placeholder="დანიშნულება" v-model="form.inputs.data[item.index].purpose">
                </div>
            </div>

            <div class="row">
                <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].manufactured_in.error.length">
                    <label class="mb-2">ტექნიკის მწარმოებელი ქვეყანა</label>
                    <input type="text" class="form-control" placeholder="ქვეყანა" v-model="form.inputs.data[item.index].manufactured_in">
                </div>
                <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].manufactured_on.error.length">
                    <label class="mb-2">ტექნიკის გამოშვების თარიღი <span class="text-danger">(არაუმეტეს 2 წლის)</span></label>
                    <input type="date" class="form-control" placeholder="თარიღი" v-model="form.inputs.data[item.index].manufactured_on">
                </div>
            </div>

            <div class="row">
                <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].company_name.error.length">
                    <label class="mb-2">ტექნიკის მომწოდებელი კომპანიის დასახელება</label>
                    <input type="text" class="form-control" placeholder="კომპანია" v-model="form.inputs.data[item.index].company_name">
                </div>
                <div class="form-input position-relative mt-3 col-lg-6 col-md-6 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].company_id.error.length">
                    <label class="mb-2">ტექნიკის მომწოდებელი კომპანიის საიდენტიფიკაციო ნომერი</label>
                    <input type="text" class="form-control" placeholder="ს/კ" v-model="form.inputs.data[item.index].company_id">
                </div>
            </div>

            <div class="row position-relative mt-3 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div class="form-input position-relative mt-3 col-lg-4 col-md-4 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].currency.error.length">
                    <label class="mb-2">ვალუტის კურსი</label>
                    <select class="form-select" v-model="form.inputs.data[item.index].currency" @change="calculate">
                        <option v-for="currency in currencies" :key="currency.id" :value="currency.id">{{ currency.currency_name }} ({{ currency.currency_value }})</option>
                    </select>
                </div>
                <div class="form-input position-relative mt-3 col-lg-4 col-md-4 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].price.error.length">
                    <label class="mb-2">1 ერთეული ტექნიკის ღირებულება</label>
                    <input ref="price" type="text" class="form-control" placeholder="1 ერთეული ტექნიკის ღირებულება" @input="calculate" v-model="form.inputs.data[item.index].price">
                </div>
                <div class="form-input position-relative mt-3 col-lg-4 col-md-4 col-xs-12 col-sm-12" :data-error="!!form.state.data[item.index].quantity.error.length">
                    <label class="mb-2">რაოდენობა</label>
                    <input ref="quantity" type="number" class="form-control" min="1" @input="calculate" v-model="form.inputs.data[item.index].quantity">
                </div>
            </div>

            <div class="btn btn-danger mt-4" @click="removeItem('data',item.index)" v-if="form.inputs.data.length>1">#{{ item.index+1 }} ტექნიკის წაშლა</div>
        </div>
            
        <div class="row mt-4">
            <div class="mb-3 col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="btn btn-primary" v-on:click="addItem('data')">ტექნიკის დამატება <BIconPlusLg /></div>
            </div>
        </div>

        <div class="alert alert-warning mb-4">ტექნიკა არ უნდა იყოს ექსპლუატაციაში ნამყოფი.</div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {

    props: [ 'errors', 'project_types', 'currency', 'is_legal' ],

    data() {

        return {

            form: {

                pattern: {

                    inputs: {

                        data: {

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

                        data: {

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
                    
                    data: [{

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

                    data: [{
                        
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
            
            return Number(this.form.inputs.data.reduce((accumulator, item) => accumulator + (Number(item.price) * item.quantity * Number(this.currencies.find(currency => currency.id == item.currency).currency_value)), 0))
        
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

        errors: {

            immediate: true,
            deep: true,
            handler(errors) {

                Object.values(this.form.state.data).forEach((values,index) => {

                    for(let name in values) {

                        if(errors['data.'+index+'.'+name]) {

                            this.form.state.data[index][name].error = errors['data.'+index+'.'+name]

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

            const data_pattern = JSON.parse(JSON.stringify(this.form.pattern.inputs[name]))

            data_pattern.index = this.form.inputs[name].length

            this.form.inputs[name].push(data_pattern)
            
        },

        removeItem(name,index) {

            if(this.form.inputs[name].length>1) {

                this.form.inputs[name].splice(index, 1)

                for(let i in this.form.inputs[name]) {

                    this.form.inputs[name][i].index = Number(i)

                }

            }

        },

        ...mapActions([ 'calculator', 'inputs' ]),

    }
    
}
</script>