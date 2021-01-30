import axios from 'axios'

export const axiosInstance = axios.create({
  timeout: 20000,
  baseURL: 'http://localhost:3003/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
})

export const getTests = (order = {}, filter = {}, page = 1, perPage = 100) => axiosInstance({
  method: 'get',
  url: '/tests',
  params: {
    page,
    perPage,
    ...order,
    ...filter,
  },
})