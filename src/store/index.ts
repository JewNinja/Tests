import { createStore } from 'vuex'
import { loginRequest, signupRequest } from '@/config/api'
import tests from './tests'
import { axiosInstance } from '../config/api'

export default createStore({
  state: {
    app: {
      isInit: false,
    }
  },
  mutations: {
    setInit(state: any, status: boolean) {
      state.app.isInit = status
    },
    setLogin(state: any, status: boolean) {
      state.app.isLogin = status
    },
  },
  actions: {
    initApp({ commit }) {
      if (localStorage.getItem('token')) {
        commit('setInit', true)
        commit('setLogin', true)
      } else {
        commit('setInit', true)
        commit('setLogin', false)
      }
    },
    async loginRequest({ commit }, { email, password }) {
      return await loginRequest(email, password).then(res => {
        if (res?.status === 201) {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          localStorage.setItem('expires_in', res.data.expiresIn)
          commit('setLogin', true)
          return true
        } 
        return false
      })
    },
    logout({ commit }) {
      axiosInstance.defaults.headers.common.Authorization = null
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expires_in')
      commit('setLogin', false)
    },
    async signupRequest({ commit }, { email, password }) {
      return await signupRequest(email, password).then(res => {
        if (res?.status === 201) {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          localStorage.setItem('expires_in', res.data.expiresIn)
          commit('setLogin', true)
          return true
        } 
        return false
      })
    },
  },
  modules: {
    tests,
  }
})
