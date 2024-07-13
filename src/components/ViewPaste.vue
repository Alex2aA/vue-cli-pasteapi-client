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
            <option disabled value="">---</option>
            <option value="1">Note</option>
            <option value="2">Code</option>
            <option value="3">Article</option>
        </select>
    </div>
    <div class="buttons-paste-edit" v-if="paste.can_edit">
        <DefaultButton v-if="changeStatus" @click="$router.push(`/give_access?id=${id}`)" msg="Give access to another user"></DefaultButton>
        <DefaultButton @click="changeStatus = !changeStatus, title = paste.title, text = paste.text" :msg="!changeStatus ? 'Cancel' : 'Change paste'"></DefaultButton>
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
            category: '1',
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
                    this.paste.created_at = dateFormat(this.paste.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT")
                    this.text = this.paste.text
                    this.category = this.paste.category
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
                    this.paste.created_at = dateFormat(this.paste.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT")
                    this.text = this.paste.text
                    this.category = this.paste.category
                })
                }
        },
        sendChangedPaste() {
            this.changeStatus = !this.changeStatus
            let paste = {
                category: Number(this.category),
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
    mounted () {
        this.getData()
    }
}
</script>

<style scoped>
    @import '../assets/css/main.css';

    @media (max-width: 800px) {
        .paste input {
            font-size: 15px !important;
        }

        .buttons-paste-edit  {
            width: 400px !important;
        }

        .buttons-paste-edit button {
            height: 100px !important;
            width: 100px !important;
        }

        .paste {
            width: 400px !important;
        }

        .paste-text-item {
            width: 400px !important;
        }

        .text {
            width: 400px !important;
            min-height: 500px !important;
            min-width: 400px !important;
            max-width: 400px !important;
            font-size: 15px;
        }
    }

    .select-paste {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 230px;
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
        width: 1200px;
    }
    .paste input {
        font-size: 50px;
    }
    .paste-text-item {
        font-size: 20px;
        margin: 20px auto;
        width: 1200px;
    }
    .text {
        min-height: 650px;
        min-width: 1200px;
        max-width: 1200px;
        max-height: 950px;
    }
</style>