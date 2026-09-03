import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:pwa-register'

import Particles from "@tsparticles/vue3";
// SỬA DÒNG NÀY: Thêm @ ở đầu
import { loadSlim } from "@tsparticles/slim"; 

const app = createApp(App);

app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine);
  },
});

app.mount('#app');