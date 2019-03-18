// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vuex'
import Vuex from 'vuex';

import forza4_store from './store.js';
import App from './App'


import 'bootstrap-scss/bootstrap.scss';
import 'bootstrap';

import './app.scss';



// FONT AWESOME
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';


window.$ = window.jQuery = require('jquery');


library.add(faPlus);
library.add(faMinus);
library.add(faCog);

dom.watch();


Vue.use(Vuex);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(forza4_store),
  components: { App },
  template: '<App/>'


})
