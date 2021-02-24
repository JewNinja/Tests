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
