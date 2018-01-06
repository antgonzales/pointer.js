import 'intersection-observer'

export default class Pointer {
  constructor (options) {
    this.options = Object.assign({}, options)
    this.callback = createHandler(this.options.handler).bind(this)
    this.observer = createObserver(this.callback)
    this.init()
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
  init () {
    const element = this.getElement()
    if (element instanceof Element === false) {
      return
    }
    this.watchElement(element)
  }
}

function createObserver (cb) {
  const settings = {
    root: null,
    rootMargin: '0px',
    threshold: [0.0, 0.25, 0.50, 0.75, 1.0]
  }
  return new IntersectionObserver(cb, settings)
}

function createHandler (callback) {
  return function (entries) {
    for (let i = 0; i < entries.length; i++) {
      callback.call(this, entries[i])
    }
  }
}
