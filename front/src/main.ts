import './assets/main.css'
import 'vant/lib/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Tabbar, TabbarItem, Field, CellGroup,
    Button,NavBar,Notify,Cell,Dialog,
    ActionSheet,Image as VanImage,Uploader,Search,Tag      } from 'vant';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Field);
app.use(CellGroup);
app.use(Button);
app.use(NavBar);
app.use(Notify);
app.use(Cell);
app.use(CellGroup);
app.use(Dialog);
app.use(ActionSheet);
app.use(VanImage)
app.use(Uploader)
app.use(Search)
app.use(Tag)

app.mount('#app')
