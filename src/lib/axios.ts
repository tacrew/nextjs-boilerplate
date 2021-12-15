import Axios, { AxiosRequestConfig, AxiosError } from 'axios'

import { API_URL } from '@/config'
// import { useNotificationStore } from '@/stores/notifications'
import storage from '@/utils/storage'

const authRequestInterceptor = async (config: AxiosRequestConfig) => {
  const accessToken = storage.getToken()
  return {
    ...config,
    headers: {
      authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  }
}

export const axios = Axios.create({
  baseURL: API_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError) => {
    // const message = error.response?.data?.message || error.message
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // })
    // throw error
    return Promise.reject(error)
  }
)
