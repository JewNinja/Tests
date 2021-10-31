import { createStore } from 'vuex'
import jwt_decode from "jwt-decode";
import { loginRequest, signupRequest } from '@/api/auth'
import tests from './tests'
import blackbox from './blackbox'
import { axiosInstance } from '../api/config/axios'
import { setApolloProvider } from '@/api/config/apollo'
import { getUserDetails } from '@/api/users';
import { IJwtTokenData } from '@/models';

export default createStore({
  state: {
    app: {
      isInit: false,
      isLogin: false
    },
    user: {
      blackbox: {
        is_used: null,
        pictures: []
      }
    }
  },
  mutations: {
    setInit(state: any, status: boolean) {
      state.app.isInit = status
    },
    setLogin(state: any, status: boolean) {
      state.app.isLogin = status
    },
    setUserDetails(state: any, details: any) { // TODO: типизировать
      state.user = details
    },
    setUserUsedBlackbox(state: any) {
      state.user = {
        ...state.user,
        blackbox: {
          ...state.user.blackbox,
          is_used: true
        }
      }
    },
    setUserBlackboxPictures(state: any, pictures: Array<string>) {
      state.user = {
        ...state.user,
        blackbox: {
          ...state.user.blackbox,
          pictures
        }
      }
    },
  },
  actions: {
    async initApp({ dispatch, commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          var { userId }: IJwtTokenData = jwt_decode(token);

          await dispatch('getUserDetails', { userId })

          commit('setLogin', true)
          commit('setInit', true)
        } catch (e) {
          dispatch('logout')
          commit('setInit', true)
        }
      } else {
        commit('setLogin', false)
        commit('setInit', true)
      }
    },
    async loginRequest({ dispatch, commit }, { email, password }) {
      return await loginRequest(email, password).then(async (res) => {
        if (res?.status === 201) {
          try {
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
            setApolloProvider({Authorization: `Bearer ${res.data.access_token}`})
            localStorage.setItem('token', res.data.access_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
            localStorage.setItem('expires_in', res.data.expiresIn)
  
            var { userId }: IJwtTokenData = jwt_decode(res.data.access_token);
            await dispatch('getUserDetails', { userId })
          } catch (e) {
            dispatch('logout')
            commit('setLogin', false)
            return false
          }
          commit('setLogin', true)
          return true
        } 
        return false
      })
    },
    logout({ commit }) {
      axiosInstance.defaults.headers.common.Authorization = null
      setApolloProvider({Authorization: null})
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expires_in')
      commit('setLogin', false)
    },
    async signupRequest({ dispatch, commit }, { email, password }) {
      return await signupRequest(email, password).then(async (res) => {
        if (res?.status === 201) {
          try {
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`  // TODO: убрать дублирование это здесь и в loginRequest
            setApolloProvider({Authorization: `Bearer ${res.data.access_token}`})
            localStorage.setItem('token', res.data.access_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
            localStorage.setItem('expires_in', res.data.expiresIn)
  
            var { userId }: IJwtTokenData = jwt_decode(res.data.access_token);
            await dispatch('getUserDetails', { userId })
          } catch (e) {
            dispatch('logout')
            commit('setLogin', false)
            return false
          }

          commit('setLogin', true)
          return true
        } 
        return false
      })
    },
    async getUserDetails({ commit }, { userId, userEmail }) {
      return await getUserDetails({ userId, userEmail }).then(res => {
        const {__typename, ...details} = res.data.giveUserDetails

        commit('setUserDetails', details)
      })
    },
  },
  modules: {
    tests,
    blackbox,
  }
})
