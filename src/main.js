import './assets/css/var.css'
import './assets/css/base.scss'

import {MotionPlugin} from '@vueuse/motion'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import mitt from "mitt";

const app = createApp(App)
const emitter = mitt();

app.config.globalProperties.emitter = emitter

router.beforeEach((to, from) => {
    if (to.path !== from.path) {
        emitter.emit('pageLoading', {name: to.name})
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
})

app.use(MotionPlugin)
app.use(router)

app.mount('#app')
