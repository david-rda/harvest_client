import { createRouter, createWebHistory } from "vue-router";

import ApplicationAdd from "../views/ApplicationAdd.vue";
import Details from "../views/Details.vue";
import NotFound from "../components/NotFound.vue";

import Template from '../views/Template.vue'

const routes = [

    {
        path: "/",
        redirect: '/signin'
    },
    {
        path: '/:name',
        query: {
            name: String
        },
        component: Template,
        children: [
            {
                path: '/:name',
                query: {
                    popup: Boolean
                },
                component: () => import('../components/static/Popup.vue')
            }
        ]
    },
    {
        path: "/statement/add",
        component: ApplicationAdd
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

/*
router.beforeEach((to, from, next) => {

    const user = JSON.parse(localStorage.getItem("user")) || null
  
    if(to.matched.some(route => route.meta.auth)) {
  
      if(user) {
  
        next()
  
      } else {
  
        next({ path: '/signin' })
  
      }
  
    } else {
  
      next()
  
    }
  
  })*/
  
  export default router;
  