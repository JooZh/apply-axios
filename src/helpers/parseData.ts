/*========================================
 * 处理 传入和返回的 data
 *========================================*/

import { isObject } from './utils'

export function parseRequestData(data: any): any {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return null
}

export function parseResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
