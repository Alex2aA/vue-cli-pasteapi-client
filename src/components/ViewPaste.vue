<template>
    <HelpPage></HelpPage>
    <div @click="showPopUp = false" class="paste">
        <PopUpModal v-if="showPopUp" :msg="msg" :failed="status" :showPopUpProp=showPopUp></PopUpModal>
        <input v-model="title" :readonly="changeStatus" class="reglog-form__input" :placeholder="paste.title">
    </div>
    <div class="paste-text-item">
        <textarea :readonly="changeStatus" v-model="text" class="text"></textarea>
    </div>
    <div class="select-paste" v-if="!changeStatus">
        <h2>Category</h2>
        <select v-model="category" name="category" id="category-select">
            <option value="1">Note</option>
            <option value="2">Code</option>
            <option value="3">Article</option>
        </select>
        <h2>Expiration</h2>
        <select v-model="expiration" name="expiration" id="expiration-select">
            <option value="60">an hour</option>
            <option value="1440">a day</option>
            <option value="10080">a week</option>
            <option value="43800">a month</option>
            <option value="525599,42184">a year</option>
        </select>
    </div>
    <div class="buttons-paste-edit" v-if="paste.can_edit">
        <DefaultButton v-if="changeStatus" @click="$router.push(`/give_access?id=${id}`)" msg="Give access to another user"></DefaultButton>
        <DefaultButton @click="changeStatus = !changeStatus, title = paste.title, text = paste.text" msg="Change paste"></DefaultButton>
        <DefaultButton v-if="!changeStatus" @click="sendChangedPaste" msg="Save"></DefaultButton>
        <DefaultButton v-if="changeStatus" @click="deletePaste" msg="Delete paste"></DefaultButton>
    </div>
</template>

<script>
import HelpPage from "./HelpPage.vue";
import dateFormat from "dateformat";
import DefaultButton from "./DefaultButton.vue";
import PopUpModal from "./PopUpModal.vue";
export default {
    name: 'ViewPaste-Page',
    components: { HelpPage, DefaultButton, PopUpModal},
    data() {
        return {
            paste: {},
            text: '',
            changeStatus: true,
            category: '',
            expiration: '',
            title: '',
            msg: '',
            id: '',
            status: false,
            showPopUp: false
        }
    },
    methods: {
        getData() {
            const urlParams = new URLSearchParams(window.location.search);
            this.id = urlParams.get('_id')
            if (localStorage.getItem('token')) {
                fetch("http://localhost:8080/api/v1/pastes/" + this.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => res.json())
                .then(body => {
                    this.paste = body.paste
                    console.log(this.paste)
                    this.paste.created_at = dateFormat(this.paste.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT")
                    this.text = this.paste.text
                })
            } else {
                fetch("http://localhost:8080/api/v1/pastes/" + this.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                }
            })
            .then(res => res.json())
            .then(body => {
                this.paste = body.paste
                console.log(this.paste)
                this.paste.created_at = dateFormat(this.paste.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT")
                this.text = this.paste.text
            })
            }
        },
        sendChangedPaste() {
            this.changeStatus = !this.changeStatus
            let paste = {
                category: Number(this.category),
                minutes: Number(this.expiration),
                title: this.title,
                text: this.text
            }
            fetch(`http://localhost:8080/api/v1/pastes/${this.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(paste)
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
                    this.msg = {message:'You have successfully updated paste'}
                    this.getData()
                }
                else {
                    this.msg = body.error
                }
                this.showPopUp = true
                console.log(body)
            })
        },
        deletePaste() {
            fetch(`http://localhost:8080/api/v1/pastes/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(res => {
                if (res.status == "204") {
                    this.status = true
                    this.$router.push("/my_pastes")
                }
                else {
                    this.status = false
                }
            })
        }
    },
    created () {
        this.getData()
    }
}
</script>

<style scoped>
    @import '../assets/css/main.css';

    @media (max-width: 800px) {
        .buttons-paste-edit {
            width: 300px !important;
        }

        .paste {
            width: 400px !important;
        }

        .paste-text-item {
            width: 400px !important;
        }

        .text {
            width: 400px !important;
            min-width: 400px !important;
            max-width: 400px !important;
        }
    }

    .select-paste {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 500px;
        margin: 0 auto 20px;
        font-size: 25px;
    }
    
    .buttons-paste-edit {
        margin: 0 auto;
        width: 1000px;
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .paste {
        margin: 50px auto 0px;
        width: 900px;
    }
    .paste input {
        font-size: 50px;
    }
    .paste-text-item {
        font-size: 20px;
        margin: 20px auto;
        width: 900px;
    }
    .text {
        min-height: 100px;
        min-width: 900px;
        max-width: 900px;
        max-height: 500px;
    }
</style>