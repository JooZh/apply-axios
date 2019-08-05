/*========================================
 * 请求和返回 参数接口
 *========================================*/
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface RequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [propName: string]: any
}

export interface ResponseConfig<T = any> {
  data: T
  status: number
  statusText: string
  config: RequestConfig
  headers: any
  request: any
}

export interface ErrorConfig {
  message: string
  config: RequestConfig
  code?: string | null
  request?: any
  response?: ResponseConfig
}
