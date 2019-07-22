import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({storage: sessionStorage})],
  state: {
      title: '',
      path: '',
      item: {},
      isCollapse: false
  },
  mutations: {
      changeTitle(state, title) {
          let titleArr = [];
          titleArr.push(title);
          state.title = JSON.stringify(titleArr);
          console.log(state.title);
      },
      changePath(state, path) {
       
          state.path = path;
      },
      changeItem(state, item) {
          state.item = item;
      },
      changeIsCollapse(state, isCollapse) {
          state.isCollapse = isCollapse;
      }
  },
  actions: {

  }
})
