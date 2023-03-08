import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:svg-icons-register'
import { FcUnderlineBtn, Fc3DBtn } from 'fancy-components'
new FcUnderlineBtn()
new Fc3DBtn()
createApp(App).mount('#app')
