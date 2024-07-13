<template>
    <div class="container">
        <header>
            <div class="right-buttons">
                <a @click="$router.push('/create')" class="base-btn login-btn">Create</a>
                <a @click="$router.push('/')" class="base-btn login-btn">View pastes</a>
                <a v-if="token" @click="$router.push('/my_pastes')" class="base-btn login-btn">My pastes</a>
                <a v-if="token" @click="$router.push('/profile')" class="base-btn login-btn">Your profile</a>
                <a v-if="!token" @click="$router.push('/registration')" class="base-btn login-btn">Register</a>
            </div>
        </header>
        <main>
            
        </main>
    </div>
</template>
<script>
export default {
    name: "help-page",
    data() {
        return{
            Active: false,
            token: false
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.token = true
        }
        else {
            this.token = false
        }
    }
}
</script>

<style scoped>
    @import '../assets/css/main.css';
    @media (max-width: 700px) {
        .right-buttons {
            width: 400px;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
        }

        .right-buttons a {
            font-size: 12px;
        }
        header {
            width: 400px;
        }
    }
</style>