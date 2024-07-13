<template>
    <HelpPage></HelpPage>
    <main class="pastes-catalog">
        <section @click="$router.push('/viewpaste?_id=' + paste.id)" v-for="paste in pastes" :key="paste.id" class="paste-item">
            <div class="paste-item__date">{{ paste.created_at }}</div>
            <div class="paste-item__vertical-line">|</div>
            <div class="paste-item__title">{{ paste.title }}</div>
            <button class="paste-item__delite-btn"><img src="assets/img/delete.svg" alt=""></button>
        </section>
        <div v-if="pastes.length == 0" class="paste-info">
            <h1>You haven't created any paste yet.</h1>
            <DefaultButton @click="$router.push('/create')" class="button-create" msg="Create new paste"></DefaultButton>
        </div>
    </main>
</template>

<script>
import HelpPage from './HelpPage.vue'
import DefaultButton from './DefaultButton.vue';

export default {
    name: 'MyPastes-Page',
    components: {HelpPage, DefaultButton},
    data() {
        return {
            pastes: {}
        }
    },
    methods: {
        getData() {
            fetch('http://localhost:8080/api/v1/pastes/?onlyUsers=true', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(body => {
                this.pastes = body.pastes
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
</style>