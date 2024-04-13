import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import pinia from './stores'
import 'element-plus/dist/index.css'
import Lazyload from "vue3-lazyload";
import elTableInfiniteScroll from 'el-table-infinite-scroll';

//import echarts from 'echarts'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.use(Lazyload)
app.use(elTableInfiniteScroll)
//app.use(echarts)
app.mount('#app')
//createApp(App).mount('#app')
