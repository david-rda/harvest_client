<template>
    <div class="form-messages">
        <div class="alert alert-success">{{ message }}</div>
    </div>
</template>

<script>
export default {

    props: ['message']

}
</script>