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
      isCollapse: false,
      dialogVisible: false
  },
  mutations: {
      changeTitle(state, title) {
          let titleArr = [];
          titleArr.push(title);
          let obj = {};
          obj["title"] = titleArr;
          state.title = JSON.stringify(obj);
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
      },
      changeDialogVisible(state, dialogVisible) {
          state.dialogVisible = dialogVisible;
      }
  },
  actions: {

  }
})
