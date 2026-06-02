import axios from 'axios'
import { glpiConfig } from './glpiConfig'
import { getValidToken, clearToken } from './tokenManager'

export const httpClient = axios.create({
  baseURL: glpiConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use(async (config) => {
  const token = await getValidToken()

  config.headers.Authorization = `Bearer ${token}`

  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearToken()
    }

    return Promise.reject(error)
  },
)