import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './assets/styles/main.scss';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Vuelidate);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
