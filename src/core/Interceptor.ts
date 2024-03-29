import { InterceptorRejected, InterceptorResolved, Interceptor } from '../interface/interceptor'

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: InterceptorResolved<T>, rejected?: InterceptorRejected): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
  each(func: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(item => {
      if (item !== null) {
        func(item)
      }
    })
  }
}
