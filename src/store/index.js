import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        breadCrumb: '管理',
        currentDepId: ''
    },
    mutations: {
        // 增加nutations属性
        setBreadCrumb(state, payload) {
          // 增加一个mutations的方法，方法的作用是让num从0变成5，state是必须默认参数
          state.breadCrumb = payload.breadCrumb;
        },
        setCurrentDepId(state, payload) {
            state.currentDepId = payload.id
        }
      }
  });
  
  export default store;