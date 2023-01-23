import { createRouter, createWebHistory } from "vue-router";

// START კომპონენტები
import LoginView from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Settings from "../views/Settings.vue";
import UserInfo from "../views/UserInfo.vue";
import ApplicationAdd from "../views/ApplicationAdd.vue";
import Register from "../views/Register.vue";
import Recovery from "../views/Recovery.vue";
import Details from "../views/Details.vue";
import NotFound from "../components/NotFound.vue";
// END კომპონენტები

import Template from '../views/Template.vue'

const routes = [

    {
        path: '/:name',
        query: {
            name: String
        },
        component: Template
    },

    {
        path: "/",
        component: LoginView
    },
    {
        path: "/user/profile",
        component: Profile
    },
    {
        path: "/user/settings",
        component: Settings
    },
    {
        path: "/user/info",
        component: UserInfo
    },
    {
        path: "/statement/add",
        component: ApplicationAdd
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/recovery",
        component: Recovery
    },
    {
        path: "/details/:id",
        component: Details
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound
    }
];

var router = createRouter({
    routes: routes,
    history: createWebHistory()
});

export default router;