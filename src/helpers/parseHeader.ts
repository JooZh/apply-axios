/*========================================
 * 处理 传入和返回的请求头
 *========================================*/

import { isObject } from './utils'

export function parseRequestHeader(headers: any, data: any): any {
  if (!headers) return null
  const normalizedName = 'Content-Type'
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
  if (isObject(data)) {
    if (headers && !headers[normalizedName]) {
      headers[normalizedName] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseResponseHeader(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })

  return parsed
}
