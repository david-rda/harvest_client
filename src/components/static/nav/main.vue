<template>

    <nav class="app-header-nav">

        <ul class="nav nav-pills">

            <li class="nav-item">
                <router-link class="nav-link nav-link-lined" :to="{ path: '/' }">მთავარი</router-link>
            </li>

            <li class="nav-item" v-if="roles.application.add">
                <router-link class="nav-link nav-link-lined" :to="{ path: '/projects' }">განცხადების დამატება</router-link>
            </li>

            <li class="nav-item">
                <router-link class="nav-link nav-link-lined" :to="{ path: '/applications' }">განაცხადები</router-link>
            </li>

            <li class="nav-item" v-if="roles.manage.projects">
                <router-link class="nav-link nav-link-lined" :to="{ path: '/manage.projects' }">პროექტების მართვა</router-link>
            </li>

            <li class="nav-item" v-if="roles.manage.users">
                <router-link class="nav-link nav-link-lined" :to="{ path: '/manage.users' }">მომხმარებლების მართვა</router-link>
            </li>

        </ul>

    </nav>

</template>

<script>
import { mapGetters } from 'vuex'

export default {

    computed: {

        ...mapGetters([ 'roles' ])

    }

}
</script>