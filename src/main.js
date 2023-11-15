import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import PokemonPicker from './components/PokemonPicker.vue';
import PokemonBattleGround from './components/PokemonBattleGround.vue';
import { store } from './store';
import './index.css';
import App from './App.vue';

const routes = [
  { name: 'home', path: '/', component: PokemonPicker },
  {
    name: 'battle-ground',
    path: '/battle-ground',
    component: PokemonBattleGround,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to) => {
  if (to.name === 'battle-ground') {
    return store.state.battleLog.started ? true : { name: 'home' };
  }

  return true;
});

createApp(App).use(store).use(router).mount('#app');
