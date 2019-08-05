/*========================================
 * 请求和返回 参数接口
 *========================================*/

import { isDate, isObject, encode } from './utils'

export default function parseUrl(url: any, params: any): string {
  if (!params) return url

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (!val) return
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let paramsString = parts.join('&')
  if (paramsString) {
    const hasHashIdx = url.indexOf('#')
    if (hasHashIdx !== -1) {
      url = url.slice(0, hasHashIdx)
    }
    const hasParams = url.indexOf('?')
    if (hasParams !== -1) {
      url += `&${paramsString}`
    } else {
      url += `?${paramsString}`
    }
  }

  return url
}
