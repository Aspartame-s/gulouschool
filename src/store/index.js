import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        breadCrumb: '',
        currentDepId: '',
        avatarUrl: '',
        deptArr: [],
        formSubmitFlag: 'employee',
        currentUnitId: '',
        employeeHandleFlag: '',
        //应付测试
        currentAuditIndex: null,
        testTableData: [
            {
              id: 1,
              name: "江苏省名师空中课堂",
              level: "省级",
              type: "H5",
              time: "2022-10-26",
              statu: '待审核', //0待审核 1已通过 2未通过
              url: "asdsd.sadsad.edu.cn",
              icon: require("../assets/img/图片@3x 1.png"),
              yumin: "asdsd.sadsad.edu.cn",
              desc: "江苏省名师空中课堂是江苏省教育厅推出的在线教 育平台,设有点播课堂、点播课堂、家长课堂、在线 答疑。",
              isSuccess: 0, //0 审核中 
            },
            {
              id: 2,
              name: "南京市金陵微校",
              level: "市级",
              type: "WEB",
              time: "2022-10-26",
              statu: '已通过',
              url: "asdsd.sadsad.edu.cn",
              icon: require("../assets/img/图片@3x 1.png"),
              yumin: "asdsd.sadsad.edu.cn",
              desc: "江苏省名师空中课堂是江苏省教育厅推出的在线教 育平台,设有点播课堂、点播课堂、家长课堂、在线 答疑。",
              isSuccess: 0
            },
            {
              id: 3,
              name: "作业监管平台",
              level: "区级",
              type: "PC端",
              time: "2022-10-26",
              statu: '未通过',
              url: "asdsd.sadsad.edu.cn",
              icon: require("../assets/img/图片@3x 1.png"),
              yumin: "asdsd.sadsad.edu.cn",
              desc: "江苏省名师空中课堂是江苏省教育厅推出的在线教 育平台,设有点播课堂、点播课堂、家长课堂、在线 答疑。",
              isSuccess: 0
            },
          ]
    },
    mutations: {
        // 增加nutations属性
        setBreadCrumb(state, payload) {
          // 增加一个mutations的方法，方法的作用是让num从0变成5，state是必须默认参数
          state.breadCrumb = payload.breadCrumb;
        },
        setCurrentDepId(state, payload) {
            state.currentDepId = payload.id
        },
        setAvatarUrl(state, payload) {
            state.avatarUrl = payload.avatarUrl
        },
        setDeptArr(state, payload) {
            state.deptArr = payload
        },
        setFormSubmitFlag(state, payload) {
            state.formSubmitFlag = payload.formSubmitFlag
        },
        setCurrentUnitId(state, payload) {
            state.currentUnitId = payload.id
        },
        setEmployeeHandleFlag(state, payload) {
            state.employeeHandleFlag = payload.flag
        },

        //应付测试
        setCurrentAuditIndex(state, payload) { //设置当前点击的tableData index
            state.currentAuditIndex = payload.index
        }
      }
  });
  
  export default store;