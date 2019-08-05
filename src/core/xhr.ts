/*========================================
 * XMLHttpRequest 核心函数
 *========================================*/
import createError from '../helpers/createError'
import { RequestConfig, ResponseConfig } from '../interface/config'
import { AxiosPromise } from '../interface/axios'

export default function xhr(config: RequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data, url, method, headers, responseType, timeout } = config

    const xhr = new XMLHttpRequest()

    responseType && (xhr.responseType = responseType)

    timeout && (xhr.timeout = timeout)

    xhr.open(method!.toUpperCase(), url!, true)

    if (headers) {
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          xhr.setRequestHeader(name, headers[name])
        }
      })
    }

    xhr.send(data)

    xhr.onerror = function handleError() {
      reject(
        createError({
          message: 'Network Error',
          config: config,
          request: xhr,
          code: 'NOT FIND'
        })
      )
    }

    xhr.ontimeout = function handleTimeout() {
      reject(
        createError({
          message: `Timeout of ${config.timeout} ms exceeded`,
          config: config,
          request: xhr,
          code: 'ECONNABORTED'
        })
      )
    }

    xhr.onreadystatechange = function handleLoad() {
      if (xhr.readyState !== 4) return
      if (xhr.status === 0) return
      const responseData = responseType && responseType !== 'text' ? xhr.response : xhr.responseText
      const response: ResponseConfig = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        config: config,
        request: xhr
      }
      if (xhr.status >= 200 && xhr.status <= 304) {
        resolve(response)
      } else {
        reject({
          message: `Request failed with status code ${response.status}`,
          config: config,
          code: 'STATUS ERROR',
          data: null,
          request: xhr,
          response: response
        })
      }
    }
  })
}
