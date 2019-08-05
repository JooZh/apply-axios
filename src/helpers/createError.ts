import { RequestConfig, ResponseConfig, ErrorConfig } from '../interface/config'

class AxiosError extends Error {
  isAxiosError: boolean
  config: RequestConfig
  code?: string | null
  request?: any
  response?: ResponseConfig

  /* istanbul ignore next */
  constructor(configObj: ErrorConfig) {
    super(configObj.message)

    this.config = configObj.config
    this.code = configObj.code
    this.request = configObj.request
    this.response = configObj.response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export default function createError(configObj: ErrorConfig): AxiosError {
  return new AxiosError(configObj)
}
