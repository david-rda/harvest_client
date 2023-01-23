<template>

    <Transition name="fade" appear>

        <nav class="side-nav">

            <router-link to="/dashboard" class="side-logo">

                <img src="../../assets/images/logo.png">

            </router-link>

            <ul class="p-4">

                <li>
                    <router-link :to="'/dashboard'">ინფორმაცია</router-link>
                </li>
                <li>
                    <router-link :to="'/projects'">განცხადების დამატება</router-link>
                </li>
                <li>
                    <router-link :to="'/applications'">ჩემი განაცხადები</router-link>
                </li>
                <li>
                    <router-link :to="'/profile'">ჩემი პროფილი</router-link>
                </li>
                <li>
                    <router-link :to="'/security'">პაროლის შეცვლა</router-link>
                </li>
                <li>
                    <router-link :to="'/logout'" class="text-danger">ანგარიშიდან გასვლა</router-link>
                </li>

            </ul>

        </nav>

    </Transition>

</template>

<script>
export default {
    
}
</script>