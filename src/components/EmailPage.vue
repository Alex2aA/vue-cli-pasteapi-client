<template>
    <body class="">
        <div class="email-cover">
            <h1>Paste team</h1>
            <h2>Hello {{login}}, please confirm your email! You can find the letter in your mailbox: {{ email }}</h2>
        </div>
    </body>
</template>
<script>
export default {
    name: "email-page",
    data() {
        return {
            login: (localStorage.getItem('login')) ? localStorage.getItem('login') : 'user',
            email: (localStorage.getItem('email')) ? localStorage.getItem('email') : 'mail'
        }
    }
}
</script>

<style scoped>

    @import '../assets/css/main.css'
    
</style>

