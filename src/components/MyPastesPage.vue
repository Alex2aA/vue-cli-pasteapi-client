<template>
    <HelpPage></HelpPage>
    <main class="pastes-catalog">
        <input v-if="pastes.length != 0" @keyup.enter="getData()" class="reglog-form__input" v-model="titleSearch" placeholder="Enter the name paste">
        <section @click="$router.push('/viewpaste?_id=' + paste.id)" v-for="paste in pastes" :key="paste.id" class="paste-item">
            <div class="paste-item__date">{{ paste.created_at }}</div>
            <div class="paste-item__vertical-line">|</div>
            <div class="paste-item__title">{{ isMobile ? (paste.title.length > 5 ? paste.title.slice(0,5) + "..." : paste.title) : ( paste.title.length > 50 ? paste.title.slice(0,50) + '...' : paste.title) }}</div>
        </section>
        <div v-if="pastes.length == 0 && titleSearch == ''" class="paste-info">
            <h1>You haven't created any paste yet.</h1>
            <DefaultButton @click="$router.push('/create')" class="button-create" msg="Create new paste"></DefaultButton>
        </div>
        <div class="pages">
            <img v-if="lastPage" class="previous" src="../assets/img/Next.png" :class="{'not_clickable':numberPage == 1}" @click=" numberPage == 1 ? '' : getPrevious()">
            <h1 v-if="lastPage">{{ numberPage }} / {{ lastPage }}</h1>
            <img v-if="lastPage" src="../assets/img/Next.png" :class="{'not_clickable':numberPage == lastPage}" @click=" numberPage == lastPage ? '' : getNext()">
        </div>
        <div class="paste-info" v-if="pastes.length == 0 && titleSearch != ''">
            <h1>Nothing was found :(</h1>
            <DefaultButton @click="titleSearch = '', getData()" class="button-create" msg="Go back"></DefaultButton>
        </div>
    </main>
</template>

<script>
import HelpPage from './HelpPage.vue'
import DefaultButton from './DefaultButton.vue';
import dateFormat from "dateformat";

export default {
    name: 'MyPastes-Page',
    components: {HelpPage, DefaultButton},
    data() {
        return {
            pastes: {},
            numberPage: 1,
            titleSearch: '',
            lastPage: 0,
            isMobile: window.innerWidth < 800
        }
    },
    methods: {
        getNext() {
            this.numberPage++
            this.getData()
        },
        getPrevious() {
            this.numberPage--
            this.getData()
        },
        getData() {
            fetch(`http://localhost:8080/api/v1/pastes/?onlyUsers=true&pageSize=10&page=${this.numberPage}&title=${this.titleSearch}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(body => {
                this.pastes = body.pastes
                for ( let i = 0; i < this.pastes.length; i++) {
                    this.pastes[i].created_at = dateFormat(this.pastes[i].created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT")
                }
                this.lastPage = body.metadata.last_page
            })
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style>
@import '../assets/css/main.css';

.reglog-form__input {
    margin-bottom: 50px;
}

.paste-info {
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
}

.button-create {
    margin-top: 35px !important;
}

@media (max-width: 800px) {
    img {
        height: 50px !important;
        width: 50px !important;
    }

    .pages h1 {
        font-size: 20px;
    }
}

.pages {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    font-size: 35px;
    margin-top: 100px;
}

img {
    height: 100px;
    width: 100px;
    opacity: 100%;
    transition: 0.2s;
}

.previous {
    transform: rotate(180deg);
}

.not_clickable {
    opacity: 30%;
    transition: 0.2s;
}
</style>