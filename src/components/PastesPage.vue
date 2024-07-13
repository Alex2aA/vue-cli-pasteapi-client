<template>
    <HelpPage></HelpPage>
    <main v-if="pastes.length != 0" class="pastes-catalog">
        <section @click="$router.push('/viewpaste?_id=' + paste.id)" v-for="paste in pastes" :key="paste.id" class="paste-item">
            <div class="paste-item__date">{{ paste.created_at }}</div>
            <div class="paste-item__vertical-line">|</div>
            <div class="paste-item__title">{{ isMobile ? (paste.title.length > 5 ? paste.title.slice(0,5) + "..." : paste.title) : ( paste.title.length > 35 ? paste.title.slice(0,35) + '...' : paste.title) }}</div>
        </section>
        <div class="pages">
            <img v-if="lastPage" class="previous" src="../assets/img/Next.png" :class="{'not_clickable':numberPage == 1}" @click=" numberPage == 1 ? '' : getPrevious()">
            <h1 v-if="lastPage">{{ numberPage }} / {{ lastPage }}</h1>
            <img v-if="lastPage" src="../assets/img/Next.png" :class="{'not_clickable':numberPage == lastPage}" @click=" numberPage == lastPage ? '' : getNext()">
        </div>
    </main>
    <div v-else class="paste-info">
        <h1>There are no pastes yet. Be first!</h1>
        <DefaultButton @click="$router.push('/create')" class="button-create" msg="Create new paste"></DefaultButton>
    </div>
</template>

<script>
import HelpPage from './HelpPage.vue';
import dateFormat from "dateformat";
import DefaultButton from './DefaultButton.vue';

export default {
    name: 'MyPastes-Page',
    components: {HelpPage, DefaultButton},
    data() {
        return {
            pastes: [],
            numberPage: 1,
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
            fetch(`http://localhost:8080/api/v1/pastes/?pageSize=10&page=${this.numberPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
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

<style scoped>
@import '../assets/css/main.css';

@media (max-width: 800px) {
    img {
        height: 50px !important;
        width: 50px !important;
    }

    .pages h1 {
        font-size: 20px;
    }
}

.paste-info {
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
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