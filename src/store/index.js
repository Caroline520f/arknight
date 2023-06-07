import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { isStore } from "@/hooks/store";
import saved from './modules/saved'
import database from './modules/database'
export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        return {
          msg: state.msg,
        };
      },
      key: "msg",
    }),
    createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let regObj = {
          userId: state.saved.userId,
          UID: state.saved.UID,
          email: state.saved.email,
          ID: state.saved.ID,
          fullName: state.saved.fullName,
          telephone: state.saved.telephone,
        }
        return isStore(state, 'users', 'isregister', regObj, localStorage)
      },
      key: "users",
    }),
    createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let logObj = {
          token: state.saved.token,
          telephone: state.saved.telephone,
        }
        return isStore(state, 'token', 'islogin', logObj, localStorage)
      },
      key: 'token'
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let routes = {
          routes: state.saved.menus,
          menusMsg: state.saved.menusMsg
        }
        return isStore(state, 'menus', 'ismenus', routes, sessionStorage)
      },
      key: 'menus'
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let baseMsg = {
          baseMsg: state.saved.baseMsg
        }
        return isStore(state, 'baseMsg', 'isbaseMsg', baseMsg, sessionStorage)
      },
      key: 'baseMsg'
    }),
    createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let contxObj = {
          contexts: state.saved.contexts
        }
        return isStore(state, 'contexts', 'iscontexts', contxObj, localStorage)
      },
      key: 'contexts'
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let dataObj = {
          databaseMenu: state.database.menuList,
          databaseRoutes: state.database.menuRoutes
        }
        return isStore(state, 'database', 'isdatabase', dataObj, sessionStorage)
      },
      key: 'database'
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let baseMedical = {
          baseMedical: state.database.baseMedical
        }
        return isStore(state, 'baseMedical', 'isbaseMedical', baseMedical, sessionStorage)
      },
      key: 'baseMedical'
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let expMedical = {
          expMedical: state.database.expMedical
        }
        return isStore(state, 'expMedical', 'isexpMedical', expMedical, sessionStorage)
      },
      key: 'expMedical'
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let expMedicals = {
          expMedicals: state.database.expMedicals
        }
        return isStore(state, 'expMedicals', 'isexpMedicals', expMedicals, sessionStorage)
      },
      key: 'expMedicals'
    }),
  ],
  state: {
    msg: null,
    telephone: null,
    countDown: 120,
    control: {
      isregister: false,
      islogin: false,
      ismenus: false,
      isbaseMsg: false,
      iscontexts: false,
      isdatabase: false,
      isbaseMedical: false,
      isexpMedical: false,
      isexpMedicals: false
    }
  },
  getters: {
  },
  mutations: {
    CHANGE_MSG(state, message) {
      state.msg = message
    },

    CHANGE_STORE(state, name) {
      Reflect.set(state.control, name, true) //
      setTimeout(() => {
        Reflect.set(state.control, name, false)
      }, 1000) //
    },
    CHANGE_TEL(state, data) {
      state.telephone = data
    }
  },
  actions: {
  },
  namespaced: true,
  modules: {
    saved,
    database
  }
})
