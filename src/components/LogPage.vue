<template>
    <HelpPage></HelpPage>
    <main @click="showPopUp = false">
        <PopUpModal v-if="showPopUp" :msg="errors" :failed="status" :showPopUpProp="showPopUp"></PopUpModal>
        <div class="reglog-form">
            <h1>Login to see your pastes</h1>
            <input v-model="email" class="reglog-form__input" type="email" placeholder="Email">
            <input v-model="password" class="reglog-form__input" type="password" placeholder="Password">
            <DefaultButton msg="Login" @click="sendData()"></DefaultButton>
            <div class="buttons">
                <a @click="$router.push('/password_reset')">forgot password?</a>
                <a @click="$router.push('/registration')">no account?</a>
            </div>
        </div>
    </main>
</template>

<script>
import HelpPage from './HelpPage.vue';
import DefaultButton from './DefaultButton.vue';
import PopUpModal from './PopUpModal.vue';
export default {
    name: "Log-Page",
    components: {HelpPage, DefaultButton, PopUpModal},
    data() {
        return {
            email: '',
            password: '',
            resStatus: '',
            status: false,
            errors: {},
            showPopUp: false
        }
    },
    methods: {
        sendData() {
            let user = {
                email: this.email,
                password: this.password
            }
            fetch('http://localhost:8080/api/v1/tokens/authentication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                this.resStatus = res.status
                return res.json()})
            .then(body => {
                if (this.resStatus == '201') {
                    localStorage.setItem('email', this.email)
                    localStorage.setItem("token", body.authentication_token.token)
                    localStorage.removeItem('msg')
                    this.$router.push('/')
                }
                else {
                    this.showPopUp = true
                    if (this.resStatus == '401') {
                        this.errors = body
                    } else {
                        this.errors = body.error
                    }
                    this.status = false
                    
                }
            })
        }
    },
    mounted() {
        if (localStorage.getItem('msg')) {
            this.showPopUp = true
            this.status = true
            this.errors = {msg: localStorage.getItem('msg')}
        }
    }
}
</script>
<style scoped>
@import '../assets/css/main.css'
</style>