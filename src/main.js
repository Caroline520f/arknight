import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import theDialog from './components/theDialog.vue'
import showMsg from './components/showMsg.vue'
// ele
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus).component('showMsg', showMsg).component('theDialog', theDialog).use(store).use(router).mount('#app')
