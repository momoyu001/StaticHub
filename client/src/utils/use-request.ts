import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

export function useRequest() {
  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 在发送请求之前做些什么
      return config
    },
    (error: any) => {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 对响应数据做些什么
      return response.data
    },
    (error: any) => {
      // 对响应错误做些什么
      return Promise.reject(error)
    }
  )

  return {
    $axios: instance
  }
}
