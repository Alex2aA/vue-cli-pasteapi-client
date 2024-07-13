import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CreatePastesPage from './components/CreatePastesPage.vue'
import EmailPage from './components/EmailPage.vue'
import HelpPage from './components/HelpPage.vue'
import LogPage from './components/LogPage.vue'
import PastesPage from './components/PastesPage.vue'
import RegPage from './components/RegPage.vue'
import ResetPasswordPage from './components/ResetPasswordPage.vue'
import ActivateTokenEmailPage from './components/ActivateTokenEmailPage.vue'
import ViewPaste from './components/ViewPaste.vue'
import ProfilePage from './components/ProfilePage.vue'
import MyPastesPage from './components/MyPastesPage.vue'
import GiveAccessToAnotherUser from './components/GiveAccessToAnotherUser.vue'

const router = createRouter({
    routes: 
    [
        {
            path: '/give_access',
            name: 'GiveAccessToAnotherUserPage',
            component: GiveAccessToAnotherUser,
            meta: {requiresAuth: true}
        },
        {
            path: '/my_pastes',
            name: 'MyPastesPage',
            component: MyPastesPage,
            meta: {requiresAuth: true}
        },
        {
            path: '/profile',
            name: 'ProfilePage',
            component: ProfilePage,
            meta: {requiresAuth: true}
        },
        {
            path: '/viewpaste',
            name: 'ViewPastePage',
            component: ViewPaste
        },
        {
            path:'/create',
            name:'CreatePastesPage',
            component: CreatePastesPage
        },
        {
            path: '/activation',
            name:'ActivationEmailPage',
            component: EmailPage,
            meta: {requiresAuth: false}
        },
        {
            path: '/help',
            name: 'HelpPage',
            component: HelpPage
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LogPage,
            meta: {requiresAuth: false}
        },
        {
            path: '/',
            name: 'PastesPage',
            component: PastesPage
        },
        {
            path: '/registration',
            name: 'RegistrationPage',
            component: RegPage,
            meta: {requiresAuth: false}
        },
        {
            path: '/password_reset',
            name: 'ResetPasswordPage',
            component: ResetPasswordPage
        },
        {
            path: '/activate',
            name: 'ActivateTokenEmailPage',
            component: ActivateTokenEmailPage
        }

    ],
    history: createWebHistory()
})
  router.beforeEach((to,from, next) => {
    let isAuth = localStorage.getItem('token') ? true : false
    if(to.meta.requiresAuth && !isAuth) {
        next({name: 'LoginPage'})
    }
    if(!to.meta.requiresAuth && isAuth && to.meta.requiresAuth != null || undefined) {
        next({path: from.path})
    }
    else {
        next()
    }
  })
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
