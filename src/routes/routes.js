import { createRouter, createWebHistory } from "vue-router"

const routes = [

    {
        path: '/:name',
        query: { name: String },
        component: () => import('../views/template.vue'),

        children: [
            {
                path: '/:name',
                query: { popup: Boolean, id: Number, tab: Number },
                component: () => import('../components/static/popup.vue')
            }
        ]

    },

    {
        path: "/:pathMatch(.*)*",
        component: () => import('../views/pages/404.vue')
    }

]

var router = createRouter({
    routes: routes,
    history: createWebHistory()
});

router.beforeEach((to, from, next) => {

    const user = JSON.parse(localStorage.getItem("user")) || null

    if(user && to.path == '/') {

        return next({ path: '/dashboard' })

    }
    
    if(user) {

        if(['/signin', '/recovery', '/signup'].includes(to.path)) {

            return next({ path: '/dashboard' })

        } else {

            return next()

        }

    } else {

        if(to.path == '/') {

            return next({ path: '/signin' })

        } else {

            if(['/signin', '/recovery', '/signup'].includes(to.path)) {

                return next()

            } else {

                return next({ path: '/signin' })

            }

        }

    }

  })
  
  export default router;
  