import { RequestConfig, Method, ResponseConfig } from '../interface/config'
import { AxiosPromise } from '../interface/axios'
import InterceptorManager from './Interceptor'
import axiosRequest from './request'
import { InterceptorPromise, InterceptorList } from '../interface/interceptor'
import mergeConfig from './mergeConfig'

export default class Axios {
  defaults: RequestConfig
  interceptors: InterceptorList
  constructor(initConfig: RequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<RequestConfig>(),
      response: new InterceptorManager<ResponseConfig>()
    }
  }
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config)

    return this._interceptor(config)
  }
  get(url: string, config?: RequestConfig): AxiosPromise {
    return this._common(url, 'get', config)
  }
  head(url: string, config?: RequestConfig): AxiosPromise {
    return this._common(url, 'head', config)
  }
  options(url: string, config?: RequestConfig): AxiosPromise {
    return this._common(url, 'options', config)
  }
  delete(url: string, config?: RequestConfig): AxiosPromise {
    return this._common(url, 'delete', config)
  }
  post(url: string, config?: RequestConfig): AxiosPromise {
    return this._common(url, 'post', config)
  }
  put(url: string, config?: RequestConfig): AxiosPromise {
    return this._common(url, 'put', config)
  }
  patch(url: string, config?: RequestConfig): AxiosPromise {
    return this._common(url, 'patch', config)
  }

  _common(url: string, method: Method, config?: RequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method: method,
        url: url
      })
    )
  }
  _interceptor(config?: any) {
    const chain: InterceptorPromise<any>[] = [
      {
        resolved: axiosRequest,
        rejected: undefined
      }
    ]
    this.interceptors.request.each(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.each(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
  }
}
