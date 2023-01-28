<template>

    <Transition name="fade" appear>

        <aside>

            <div class="d-flex justify-content-center p-4">
                <img src="../../assets/images/RDA-Logo-Geo.png" width="400" />
            </div>

            <div class="app-sign-form">

                <form class="card" @submit.prevent="submit">

                    <div class="app-sign-form-title">ანგარიშის გააქტიურება</div>

                    <div class="app-sign-form-inputs">
                        
                        <div class="form-messages mt-3 mb-4">

                            <div class="alert text-center" :class="[{ 'text-success' : form.status == 1 },{ 'text-danger' : form.status == 2 }]">{{ form.message }}</div>

                        </div>

                        <div class="loading mt-2 mb-5"></div>

                    </div>

                </form>

            </div>

        </aside>

    </Transition>

</template>

<script>
import axios from "axios";

export default {
    
    data() {

        return {

            form: {

                message: 'მიმდინარეობს ანგარიშის გააქტიურება ...',

                status: 0,

                inputs: {

                    token: this.$route.query.token

                }

            }

        }
    },

    mounted() {

        axios.post("/verify", this.form.inputs).then(response => {

            setTimeout(() => {

                this.form.message = response.data.message

                this.form.status = 1

                this.$router.push({ path: '/signin', query: {} })

            }, 2000)

        }).catch(error => {

            this.form.message = error.response.data.message

            this.form.status = 2

        })

    }

}
</script>