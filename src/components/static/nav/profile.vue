<template>

    <nav class="navbar navbar-expand-lg navbar-light">

        <div class="container-fluid">

            <div class="collapse navbar-collapse" id="navbarNavDropdown">

                <ul class="navbar-nav">

                    <li class="nav-item dropdown">

                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">სახელი გვარი</a>
                        
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">

                            <li>
                                <router-link class="dropdown-item text-right" :to="{ path: '/profile' }">ანგარიშის მართვა <BIconPersonCircle /></router-link>
                            </li>

                            <li>
                                <router-link class="dropdown-item text-right" :to="{ path: '/security' }">პაროლის შეცვლა <BIconShieldCheck /></router-link>
                            </li>

                            <li>
                                <a href class="dropdown-item text-right" @click="signout">ანგარიშიდან გასვლა <BIconBoxArrowRight /></a>
                            </li>

                        </ul>

                    </li>

                </ul>

            </div>

        </div>

    </nav>

</template>

<script>
export default {

    methods: {

        signout() {

            localStorage.removeItem("user")

            this.$router.go({ path: '/signin' })

        }

    },

}

</script>