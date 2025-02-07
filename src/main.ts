import './assets/main.css'
import './assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes'
import 'primeicons/primeicons.css';
import { ToastService } from 'primevue'


const app = createApp(App)

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{orange.50}',
            100: '{orange.100}',
            200: '{orange.200}',
            300: '{orange.300}',
            400: '{orange.400}',
            500: '{orange.500}',
            600: '{orange.600}',
            700: '{orange.700}',
            800: '{orange.800}',
            900: '{orange.900}',
            950: '{orange.950}'
        }
    }
});

app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: false
        }
    }
});


app.mount('#app')
