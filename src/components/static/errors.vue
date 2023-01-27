<template>
    <div class="form-messages">
        <div class="alert alert-danger" v-for="messages in errors" :key="messages">
            <ul>
                <li v-for="message in messages" :key="message">{{ message }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

    props: ['errors']

}
</script>