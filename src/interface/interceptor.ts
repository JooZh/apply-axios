import { RequestConfig, ResponseConfig } from './config'
import { AxiosPromise } from './axios'
import InterceptorManager from '../core/Interceptor'

// export interface InterceptorManager<T> {
//   user(resolved: InterceptorResolved<T>, rejected?: InterceptorRejected) : number
//   eject(id:number) : void
// }
export interface InterceptorList {
  request: InterceptorManager<RequestConfig>
  response: InterceptorManager<ResponseConfig>
}

export interface InterceptorResolved<T> {
  (val: T): T | Promise<T>
}

export interface InterceptorRejected {
  (error: any): any
}

export interface Interceptor<T> {
  resolved: InterceptorResolved<T>
  rejected?: InterceptorRejected
}

export interface InterceptorPromise<T> {
  resolved: InterceptorResolved<T> | ((config: RequestConfig) => AxiosPromise)
  rejected?: InterceptorRejected
}
