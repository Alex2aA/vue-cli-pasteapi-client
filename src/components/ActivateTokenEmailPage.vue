<template>
    <HelpPage></HelpPage>
    <div class="info-status">
        <div>{{ msg }}</div>
        <DefaultButton msg="login" v-if="resStatus == '200'" @click="$router.push('/login')"></DefaultButton>
    </div>
</template>

<script>
import HelpPage from './HelpPage.vue';
import DefaultButton from './DefaultButton.vue';
export default{
    name: 'Activate-Token-Email-Page',
    components: {HelpPage, DefaultButton},
    data() {
        return {
            token: this.$route.query.token,
            msg: '',
            resStatus: ''
        }
    },
    created() {
        fetch('http://localhost:8080/api/v1/users/activated', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: this.token})
        })
        .then(res => {
            this.resStatus = res.status
            return res.json()
        })
        .then(body => {
            if (this.resStatus == '200')
                if (body.user.activated == true) {
                    localStorage.setItem('msg', 'You have successfully verified your email')
                    this.$router.push('/login')
                    this.msg = 'You have successfully verified your email'
                }
                else
                    this.msg = 'Something went wrong'
            else
                this.msg = body.error
        })
        }
    }
</script>

<style scoped>
    .info-status {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 400px auto;
        width: 500px;
    }
    .info-status div {
        font-size: 30px;
    }
</style>