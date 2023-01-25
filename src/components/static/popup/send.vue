<template>

    <div class="app-status-content">

        <div class="app-popup-title">განაცხადის გადაგზავნა</div>

        <div class="app-popup-content">

            <div class="app-agreement">

                <span>წინამდებარე განაცხადით განმცხადებელი ადასტურებს, რომ,</span>

                <ul>
                    <li>განაცხადში მითითებული ინფორმაცია სწორი და უტყუარია.</li>
                    <li>გაცნობილია ვებ გვერდზე www.rda.gov.ge გამოქვეყნებულ: სასოფლო-სამეურნეო ტექნიკის თანადაფინანსების პროგრამის პირობებს. შესაბამისობის კრიტერიუმებს და თანადაფინანსების მიღების ეტაპებს.</li>
                    <li>სააგენტო უფლებამოსილია ნებისმიერ დროს წინასწარი გაფრთხილების გარეშე გადაამოწმოს განაცხადში მითითებული ნებისმიერი ინფორმაცია, მესამე პირებთან და / ან სხვა არსებული წყაროების გამოყენებით.</li>
                    <li>იმ შემთხვევაში, თუ დადგინდა განაცხადში მითითებული ინფორმაციის ან მისი ნაწილის უზუსტობა, იქნება ეს განმცხადებლის მიერ განზრახ/გაუფრთხილებლობით და / ან მესამე პირ(ებ)ის მიზეზით მცდარი ინფორმაციის მითითება, სააგენტო იტოვებს უფლებას უპირობოდ, განუხილველად დატოვოს შესაბამისი განაცხადი.</li>
                    <li>იმ შემთხვევაში, თუ განმცხადებლის მიერ განაცხადში მითითებული მცდარი ინფორმაციის მიზეზით სააგენტოს მიადგება მატერიალური და / ან არამატერიალური, პირდაპირი და/ან არაპირდაპირი ზიანი, განმცხადებელი იღებს სრულ პასუხისმგებლობას აღნიშნულ ზიანთან დაკავშირებით.</li>
                    <li>სააგენტო არ არის პასუხისმგებელი განაცხადის შევსებასთან და / ან სააგენტოში განაცხადის წარდგენასთან დაკავშირებულ ნებისმიერ პირდაპირ / არაპირდაპირ ხარჯზე.</li>
                    <li>განაცხადი არ შეიძლება განმცხადებლის და / ან ნებისმიერი სხვა დაინტერესებული პირის მიერ განხილულ იქნას, როგორც სააგენტოს რაიმე სახის პირდაპირი / არაპირდაპირი დაპირება.</li>
                    <li>სააგენტო არ არის პასუხისმგებელი განაცხადთან დაკავშირებით მიღებული გადაწყვეტილების პირდაპირ / არაპირდაპირ შედეგებზე.</li>
                </ul>

                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="agree-document" v-model="agree.document" :disabled="loading">
                    <label class="form-check-label" for="agree-document">ვადასტურებ დოკუმენტში მითითებულ ინფორმაციის და გარემოებების უტყუარობას და საქართველოს კანონმდებლობით დადგენილი წესით ვაგებ პასუხს აღნიშნული ინფორმაციისა და გარემოებების უტყუარობისთვის.</label>
                </div>

                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="agree-terms" v-model="agree.terms" :disabled="loading">
                    <label class="form-check-label" for="agree-terms">წავიკითხე და ვეთანხმები მოცემულ პირობებს</label>
                </div>

            </div>

            <div class="app-popup-messages" v-if="message.success || message.error">

                <div class="alert alert-success" v-if="message.success">{{ message.success }}</div>

                <div class="alert alert-danger" v-if="message.error">{{ message.error }}</div>

            </div>

            <div class="app-popup-buttons">

                <button class="btn btn-success" @click="submit" :disabled="!agree.terms || !agree.document || loading">განაცხადის გაგზავნა</button>

                <router-link class="btn btn-secondary" :to="{ query: {} }">დახურვა</router-link>

            </div>

        </div>

    </div>
    
</template>

<script>
import axios from 'axios'

export default {

    data() {

        return {

            loading: false,

            agree: {

                terms: false,
                document: false

            },

            message: {

                success: false,

                error: false

            }

        }

    },

    methods: {

        confirm() {

            this.agree = !this.agree

        },

        submit() {

            this.loading = true

            axios.put("/application/send/" + this.$route.query.id).then(response => {

                this.message.error = false
                
                this.message.success = response.data.message

                this.$route.params.reload = true

                this.$router.go(-1)

            }).catch(error => {

                this.loading = false

                this.message.success = false
                
                this.message.error = error.response.data.message

            })
            
        }

    }

}
</script>