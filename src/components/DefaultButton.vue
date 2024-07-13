<template>
<button>{{ msg }}</button>
</template>

<script>

export default {
    name: 'DefaultButton',
    props: {
        msg: String
    }
}
</script>

<style scoped>
    @media (max-width: 800px) {
        button {
            width: 100px !important;
            font-size: 13px;
        }
    }

    button {
        border: 2px solid black;
        padding: 10px;
        background-color: black;
        color: white;
        margin: 0 auto;
        width: 300px;
        transition: 0.5s;
        margin-bottom: 10px;
    }
    button:hover {
        width: 350px;
        transition: 0.2s;
        color: white;
    }
</style>

