import axios from 'axios'
import { INewTest } from '@/models'

export const axiosInstance = axios.create({
  timeout: 20000,
  baseURL: 'http://localhost:3003/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
})
axiosInstance.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('token')}`

export const getTests = (order = {}, filter = {}, page = 1, perPage = 200) => axiosInstance({
  method: 'get',
  url: '/tests',
  params: {
    page,
    perPage,
    ...order,
    ...filter,
  },
})

export const postTest = (data: INewTest) => axiosInstance({
  method: 'post',
  url: '/tests',
  data,
})

export const updateTest = (id: string, data: INewTest) => axiosInstance({
  method: 'put',
  url: `/tests/${id}`,
  data,
})

export const deleteTest = (id: string) => axiosInstance({
  method: 'delete',
  url: `/tests/${id}`,
})

export const getBusyStatus = (key: string, value: string) => axiosInstance({
  method: 'get',
  url: '/tests/busy',
  params: {
    key,
    value,
  },
})

export const loginRequest = (email: string, password: string) => axiosInstance({
  method: 'post',
  url: `/auth/login`,
  data: {
    email,
    password,
  }
})

export const signupRequest = (email: string, password: string) => axiosInstance({
  method: 'post',
  url: `/auth/signup`,
  data: {
    email,
    password,
  }
})

export const refreshTokenRequest = (refreshToken: string) => axiosInstance({
  method: 'post',
  url: `/auth/refresh`,
  data: {
    refreshToken,
  }
})


axiosInstance.interceptors.response.use(response => response, async (error) => {
  if (error.response.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      return await refreshTokenRequest(refreshToken).then(res => {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        localStorage.setItem('expires_in', res.data.expiresIn)

        error.config.headers.Authorization = `Bearer ${res.data.access_token}`
        return axiosInstance(error.config)
      })
    }
  }
})