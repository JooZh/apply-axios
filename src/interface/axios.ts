import { RequestConfig, ResponseConfig } from './config'
import { InterceptorList } from './interceptor'

export interface AxiosPromise<T = any> extends Promise<ResponseConfig<T>> {}

export interface Axios {
  defaults: RequestConfig
  interceptors: InterceptorList
  request(config: RequestConfig): AxiosPromise
  get(url: string, config?: RequestConfig): AxiosPromise
  delete(url: string, config?: RequestConfig): AxiosPromise
  head(url: string, config?: RequestConfig): AxiosPromise
  options(url: string, config?: RequestConfig): AxiosPromise
  post(url: string, config?: RequestConfig): AxiosPromise
  put(url: string, config?: RequestConfig): AxiosPromise
  patch(url: string, config?: RequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: RequestConfig): AxiosPromise
  (url: string, config?: RequestConfig): AxiosPromise
}

export interface AxiosStatic extends AxiosInstance {
  create(config: RequestConfig): AxiosInstance
}
