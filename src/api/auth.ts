import { axiosInstance } from "./config/axios"


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
