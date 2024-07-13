<template>
    <HelpPage></HelpPage>
<div @click="showPopUp = false" class="profile-info-container">
    <PopUpModal v-if="showPopUp" @click="showPopUp = false" :msg="message" :failed="status" :showPopUpProp="showPopUp"></PopUpModal>
    <div class="user-info">
        <div>
            <img src="../assets/img/user.png">
            <h1>{{ user }}</h1>
        </div>
        <div>
            <img src="../assets/img/email.png">
            <h1>{{ email }}</h1>
        </div>
    </div>
    <DefaultButton msg="Reset password" @click="$router.push('/password_reset')"></DefaultButton>
    <DefaultButton v-if="activated == false" msg="Activate email" @click="activateEmail()"></DefaultButton>
    <DefaultButton msg="LogOut" @click="logOut"></DefaultButton>
</div>
</template>

<script>
import HelpPage from './HelpPage.vue';
import DefaultButton from './DefaultButton.vue';
import PopUpModal from './PopUpModal.vue';
export default {
    name: 'Profile-Page',
    components: { HelpPage, DefaultButton, PopUpModal},
    data() {
        return {
            email: '',
            user: '',
            message: '',
            status: false,
            showPopUp: false,
            activated: false
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('user')
            localStorage.removeItem('activated')
            localStorage.removeItem('msg')
            this.$router.push('/')
        },
        activateEmail() {
            fetch('http://localhost:8080/api/v1/users/activation-email', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                if (res.status == "200")
                    this.status = true
                else
                    this.status = false
                return res.json()
            })
            .then(body => {
                this.message = body
                this.showPopUp = true
            })
        },
        getUserData() {
            fetch("http://localhost:8080/api/v1/users/", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                if (res.status == "200") {
                    this.status = true
                }
                else {
                    this.status = false
                }
                return res.json()
            })
            .then(body => {
                if (this.status == true) {
                    localStorage.setItem('user',body.user.login)
                    localStorage.setItem('email',body.user.email)
                    localStorage.setItem('activated',body.user.activated)
                    if (body.user.activated == true) {
                        this.activated = true
                    }
                    this.email = localStorage.getItem('email')
                    this.user = localStorage.getItem('user')
                }
                else {
                    this.showPopUp = true
                    this.message = body
                }
            })
        }
    },
    mounted() {
        this.getUserData()
    }
}
</script>

<style scoped>
    @media (max-width: 800px) {
        img {
            height: 40px !important;
            width: 40px !important;
        }

        .user-info {
            width: 350px;
        }

        .profile-info-container {
            width: 350px !important;
        }

        .user-info div h1 {
            font-size: 20px;
        }
    }

    .profile-info-container {
        margin: 300px auto;
        width: 750px;
        display: flex;
        justify-content: center;
        flex-direction: column
    }

    .profile-info-container h2 {
        font-size: 25px;
        margin-top: 30px
    }

    .profile-info-container button {
        margin-top: 20px
    }

    h1 {
        font-size: 30px;
    }

    img {
        height: 50px;
        width: 50px;
        margin-right: 20px;
    }
    .user-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column
    }

    .user-info div {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
</style>