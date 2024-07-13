<template>
    <HelpPage></HelpPage>
    <div class="give-access-container">
        <PopUpModal @click="popUpShow = false" v-if="popUpShow" :msg="msg" :failed="status" :showPopUpProp="popUpShow"></PopUpModal>
        <h1>Give access to your paste to another user</h1>
        <input v-model="userName" placeholder="Username another user" class="reglog-form__input">
        <DefaultButton @click="giveAccess()" msg="Give access"></DefaultButton>
    </div>
</template>

<script>
import HelpPage from './HelpPage.vue';
import PopUpModal from './PopUpModal.vue';
import DefaultButton from './DefaultButton.vue';

export default {
    name: 'GiveAccessToAnotherUser-Page',
    components: {HelpPage, PopUpModal, DefaultButton},
    data() {
        return {
            userName: '',
            status: false,
            msg: {},
            popUpShow: false,
            id: ''
        }
    },
    methods: {
        giveAccess() {
            const urlParams = new URLSearchParams(window.location.search);
            this.id = urlParams.get('id')
            fetch(`http://localhost:8080/api/v1/pastes/${this.id}/permission/${this.userName}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json;charset=utf-8'
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
                    this.msg = {message:`You have successfully granted editing rights to the user: ${this.userName}`}
                }
                else {
                    this.msg = body
                }
                console.log(body)
                this.popUpShow = true
            })
        }
    }
}
</script>

<style>
@import '../assets/css/main.css';

.give-access-container {
    width: 500px;
    margin: 200px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.give-access-container input {
    margin-bottom: 40px;
}

.give-access-container h1 {
    font-size: 25px;
    margin-bottom: 30px;
}
</style>