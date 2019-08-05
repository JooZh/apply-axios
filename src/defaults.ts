import { RequestConfig } from './interface/config'

const defaults: RequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accpet: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
