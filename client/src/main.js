//import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 1. 先创建应用实例
const app = createApp(App)

// 2. 然后注册插件 (Element Plus)
app.use(ElementPlus)

// 3. 最后再挂载 (这一步必须在最后)
app.mount('#app')