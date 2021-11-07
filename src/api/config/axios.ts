import axios from 'axios'
import { ElNotification } from 'element-plus'
import { refreshTokenRequest } from '../auth'
import { setApolloProvider } from './apollo'
import { GraphQLResponseErrorType } from './types'

export const axiosInstance = axios.create({
  timeout: 20000,
  baseURL: process.env.VUE_APP_REST_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
})
axiosInstance.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('token')}`


axiosInstance.interceptors.response.use(
  async (response) => {
    if (response?.data?.errors?.some((e: GraphQLResponseErrorType) => e.extensions.response.statusCode === 401)  ) {
      const refreshToken = localStorage.getItem('refresh_token')
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expires_in')
      if (refreshToken) {
        return await refreshTokenRequest(refreshToken).then(res => {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
          setApolloProvider({Authorization: `Bearer ${res.data.access_token}`})
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          localStorage.setItem('expires_in', res.data.expiresIn)

          response.config.headers.Authorization = `Bearer ${res.data.access_token}`
          return axiosInstance(response.config)
        })
      }
    }
    return await response
  }, 
  async (error) => {
    if (error?.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token')
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expires_in')
      if (refreshToken) {
        return await refreshTokenRequest(refreshToken).then(res => {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
          setApolloProvider({Authorization: `Bearer ${res.data.access_token}`})
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          localStorage.setItem('expires_in', res.data.expiresIn)

          error.config.headers.Authorization = `Bearer ${res.data.access_token}`
          return axiosInstance(error.config)
        })
      }
    } else if (error.response.status === 403) {
      ElNotification({
        type: 'error',
        title: 'Отказано в доступе',
        message: 'У Вас недостаточно прав для этого действия'
      }); 
    }
  }
)
