<template>
    <div>
        <Header />
        
        <div class="container">
            <div v-for="item in projects" :key="item.id">
                <router-link :to="'/statement/add/' + item.project_name">{{ item.project_title }}</router-link>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
    import axios, { AxiosError } from "axios";
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';

    export default {
        data() {
            return {
                projects : []
            }
        },

        components: {
            Header,
            Footer
        },

        async mounted() {
            try {
                const projects = await axios.get("/settings/projects", {
                    headers : {
                        "Authorization" : `Bearer ${this.$store.state.token}`
                    }
                });

                this.projects = projects?.data;
            }catch(err) {
                if(err instanceof AxiosError) {
                    console.log(err?.data);
                }
            }
        },

        methods : {

        }
    }
</script>

<style scoped lang="scss">

</style>