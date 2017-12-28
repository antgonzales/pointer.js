import 'intersection-observer'

export default class Pointer {
  constructor (options, cb) {
    this.options = Object.assign({}, options)
    this.observer = this.createObserver(this.createHandler(cb))
    this.init()
  }
  createObserver (cb) {
    const settings = {
      root: null,
      rootMargin: '0px',
      threshold: [0.0, 0.25, 0.50, 0.75, 1.0]
    }
    return new IntersectionObserver(cb, settings)
  }
  getObserver () {
    return this.observer
  }
  getElement () {
    return this.options.element
  }
  watchElement (target) {
    this.getObserver().observe(target)
  }
  disableWatch (target) {
    this.getObserver().unobserve(target)
  }
  createHandler (callback) {
    return function (entries) {
      for (let i = 0; i < entries.length; i++) {
        callback.call(this, entries[i])
      }
    }.bind(this)
  }
  init () {
    const element = this.getElement()
    if (element instanceof Element === false) {
      return
    }
    this.watchElement(element)
  }
}
