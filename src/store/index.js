import { createStore } from 'vuex'

export default createStore({
  state: {
    isTabbar: true,
    user: {
      userid: '',

    },
    Doctor: {
      docid: '',
      doccode: '',
      realname: '',
      sex: '',
      deptno: ''
    },
    Cookie: '',
    
  },
  getters: {
  },
  mutations: {
    setTabbar(state, data) {
      state.isTabbar = data
    },
    setUserId(state, data) {
      state.user.userid = data
    },
    setCookie(state, data) {
      state.Cookie = data
    },
    setDoctor(state, data) {
      state.Doctor.docid = data.docid
      state.Doctor.doccode = data.doccode
      state.Doctor.realname = data.realname
      state.Doctor.sex = data.sex
      state.Doctor.deptno = data.deptno
      
    }
  },
  actions: {
  },
  modules: {
  }
})
