<template>
    <HelpPage></HelpPage>
    <main @click="showPopUp = false">
        <PopUpModal v-if="showPopUp" :msg="msg" :failed="status" :showPopUpProp="showPopUp"></PopUpModal>
        <form class="paste" action="">
            <input v-model="title" type="text" placeholder="Title" class="paste__title">
            <textarea v-model="text" id="mytextarea"></textarea>
        </form>
    </main>
    <footer>
        <h2>Category</h2>
        <select v-model="category" name="category" id="category-select">
            <option disabled value=''>---</option>
            <option value="1">Note</option>
            <option value="2">Code</option>
            <option value="3">Article</option>
        </select>
        <h2>Expiration</h2>
        <select v-model="expiration" name="expiration" id="expiration-select">
            <option disabled value=''>---</option>
            <option value="60">an hour</option>
            <option value="1440">a day</option>
            <option value="10080">a week</option>
            <option value="43800">a month</option>
            <option value="525599,42184">a year</option>
        </select>
        <!-- <button class="base-btn edit-together-btn"><img src="assets/img/edit_together.png" alt="edit_together"></button> -->
        <button @click="sendData" class="base-btn publish-editor-button">PUBLISH</button>
    </footer>
</template>

<script>
import HelpPage from './HelpPage.vue';
import PopUpModal from './PopUpModal.vue';
export default {
    name: "CreatePastes-Page",
    components: {HelpPage, PopUpModal},
    data() {
        return {
            category: "1",
            expiration: '60',
            title: '',
            text: 'Hello World!',
            resStatus: "",
            msg: {},
            showPopUp: false,
            status: false
        }
    },
    methods: {
        sendData() {
            let paste = {
                category: Number(this.category),
                minutes: Number(this.expiration),
                title: this.title,
                text: this.text
            }
            if (localStorage.getItem('token')) {
                fetch("http://localhost:8080/api/v1/pastes/", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paste)
            })
            .then(res => {
                this.resStatus = res.status
                return res.json()
            })
            .then(body => {
                if (this.resStatus == "201") {
                    this.status = true
                    this.msg = {message: 'You have successfully created a paste'}
                }  
                else {
                    this.status = false
                    this.msg = body.error
                }
                this.showPopUp = true
                console.log(this.status, this.showPopUp)
                console.log(body)
            })
            }
            else {
                fetch("http://localhost:8080/api/v1/pastes/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paste)
            })
            .then(res => {
                this.resStatus = res.status
                return res.json()
            })
            .then(body => {
                if (this.resStatus == "201") {
                    this.status = true
                    this.msg = {message: 'You have successfully created a paste'}
                }  
                else {
                    this.status = false
                    this.msg = body.error
                }
                this.showPopUp = true
                console.log(this.status, this.showPopUp)
                console.log(body)
            })
            }
        }
    }
}
</script>

<style scoped>
@import '../assets/css/main.css'
</style>