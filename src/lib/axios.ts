import Axios, { AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

import { API_URL } from '@/config'
// import { useNotificationStore } from '@/stores/notifications'
import storage from '@/utils/storage'

const authRequestInterceptor = async (config: AxiosRequestConfig) => {
  const session = await getSession()
  storage.setToken(session?.accessToken as string)
  return {
    ...config,
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
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
  (error) => {
    // const message = error.response?.data?.message || error.message
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // })

    return Promise.reject(error)
  }
)
