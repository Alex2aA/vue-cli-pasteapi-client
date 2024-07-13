<template>
    <HelpPage></HelpPage>
    <main @click="showPopUp = false">
        <PopUpModal v-if="showPopUp" :msg="errors" :failed="status" :showPopUpProp="showPopUp"></PopUpModal>
        <div class="reglog-form">
            <h1>Please create an account</h1>
            <input v-model="login" class="reglog-form__input" type="text" placeholder="Login">
            <input v-model="email" class="reglog-form__input" type="email" placeholder="Email">
            <input v-model="password" class="reglog-form__input" type="password" placeholder="Password">
            <DefaultButton msg="Register" @click="sendData"></DefaultButton>
            <a class="reglog-form__link" @click="$router.push('/login')">already have an account?</a>
        </div>
    </main>
</template>

<script>
import HelpPage from './HelpPage.vue';
import DefaultButton from './DefaultButton.vue'
import PopUpModal from './PopUpModal.vue'

export default {
    name: "reg-page",
    components: {HelpPage, DefaultButton, PopUpModal},
    data() {
        return {
            email: '',
            login: '',
            password: '',
            errors: {},
            resStatus: '',
            showPopUp: false,
            status: false,
        }
    },
    methods: {
        sendData() {
            let user = {
                email: this.email,
                login: this.login,
                password: this.password
            }
            fetch('http://localhost:8080/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                this.resStatus = res.status
                return res.json()
            })
            .then(body => {
                this.errors = body.error
                localStorage.setItem('email',this.email)
                if (this.resStatus == '202')
                    this.$router.push('/activation')
                else {
                    this.status = false
                    this.showPopUp = true
                }
            })
        },
    }
}
</script>

<style scoped>
    @import '../assets/css/main.css';
</style>
