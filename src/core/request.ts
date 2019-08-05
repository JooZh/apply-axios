/*========================================
 * Axios 核心函数
 *========================================*/

import xhr from './xhr'
import parseUrl from '../helpers/parseUrl'
import { parseRequestData, parseResponseData } from '../helpers/parseData'
import { parseRequestHeader, parseResponseHeader } from '../helpers/parseHeader'
import { RequestConfig } from '../interface/config'
import { AxiosPromise } from '../interface/axios'

export default function axios(config: RequestConfig): AxiosPromise {
  config.url = parseUrl(config.url, config.params)
  config.data = parseRequestData(config.data)
  config.headers = parseRequestHeader(config.headers, config.data)

  return xhr(config).then(res => {
    res.data = parseResponseData(res.data)
    res.headers = parseResponseHeader(res.headers)
    return res
  })
}
