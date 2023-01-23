<template>
    <div class="form-messages mt-4">
        <div class="alert alert-success">{{ message }}</div>
    </div>
</template>

<script>
export default {

    props: ['message']

}
</script>