<template>
    <HelpPage></HelpPage>
    <main>
        <div v-if="tokenInQuerry" class="reglog-form">
            <h1>Reset your password</h1>
            <input v-model="password" class="reglog-form__input" type="password" placeholder="Password">
            <DefaultButton msg="Reset password"  @click="resetPassword()"></DefaultButton>
            <a @click="$router.push('/login')" class="reglog-form__link">back to login</a>
        </div>
        <div v-if="!tokenInQuerry" class="reglog-form">
            <h1>Please write your email address to which we will send a link to change your password</h1>
            <input class="reglog-form__input" placeholder="email" type="email" v-model="email">
            <DefaultButton msg="Send" @click="sendData"></DefaultButton>
        </div>
    </main>
</template>

<script>
import HelpPage from './HelpPage.vue';
import DefaultButton from './DefaultButton.vue';

export default {
    name: "resetPassword-Page",
    components: {HelpPage, DefaultButton},
    data() {
        return {
            tokenInQuerry: false,
            resStatus: '',
            email: '',
            msg: {},
            password: ''
        }
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('token')
        if (token) {
            this.tokenInQuerry = true
        }
    },
    methods: {
        sendData() {
            fetch('http://localhost:8080/api/v1/tokens/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({email: this.email})
            })
            .then(res => {
                this.resStatus = res.status
                res.json()
            })
            .then(body => {
                this.msg = body
            })
        },
        resetPassword() {
            const urlParams = new URLSearchParams(window.location.search);
            let token = urlParams.get('token')
            fetch('http://localhost:8080/api/v1/users/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({password: this.password, token: token})
            })
            .then(res => {
                this.resStatus = res.status
                res.json()
            })
            .then(body => {
                if (this.resStatus == '200') {
                    this.$router.push('/')
                }
                console.log(body)
            })
        }
    }   
}
</script>

<style scoped>
@import '../assets/css/main.css'
</style>