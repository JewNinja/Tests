import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { components, plugins } from './element-plus'
import vueDebounce from 'vue-debounce'
import { setApolloProvider } from './api/config/apollo'

export const app = createApp(App)

setApolloProvider()

components.forEach(component => app.component(component.name, component))
plugins.forEach(plugin => app.use(plugin))

app.use(vueDebounce)

app.use(store).use(router).mount('#app')