/* eslint-env mocha */

import { assert } from 'chai'
import sinon from 'sinon'
import Pointer from '../src/Pointer'

describe('Pointer', () => {
  function createDomNodes (type, attributes, amount) {
    const els = []
    for (let i = 0; i < amount; i++) {
      const el = document.createElement(type)
      el.setAttribute(attributes.name, attributes.value)
      els.push(el)
    }
    return els
  }

  it('returns the element', () => {
    const div = createDomNodes('div', {name: 'class', value: 'js-waypoint'}, 1)[0]
    const pointer = new Pointer({element: div})
    const element = pointer.getElement()
    assert(element === div)
  })

  it('creates an observer', () => {
    const pointer = new Pointer()
    const mockCb = function () {}
    const observer = pointer.createObserver(mockCb)
    assert(observer.constructor.name === 'IntersectionObserver')
  })

  it('saves the observer on the instance', () => {
    const mockCreateObserver = function () { return true }
    Pointer.prototype.creatObserver = mockCreateObserver
    const pointer = new Pointer()
    assert(pointer.observer)
  })

  it('observes the element', () => {
    const spy = sinon.spy()
    const mockObserver = {
      observe: spy
    }
    const pointer = new Pointer()
    pointer.observer = mockObserver
    const el = 'test'
    pointer.watchElement(el)
    assert(spy.calledOnce)
  })

  it('watches the element on initialization', () => {
    sinon.spy(Pointer.prototype, 'watchElement')
    const el = createDomNodes('div', {name: 'class', value: 'js-waypoint'}, 1)[0]
    const pointer = new Pointer({element: el})
    assert(pointer.watchElement.calledOnce)
  })

  it('returns a function to run the callback on each observations entry', () => {
    const spy = sinon.spy()
    const pointer = new Pointer()
    const mockEntries = [1, 2, 3, 4, 5]
    const handler = pointer.createHandler(spy)
    handler(mockEntries)
    assert(spy.callCount === mockEntries.length)
  })

  it('passes class context to the handler', () => {
    const pointer = new Pointer()
    const mockCb = function (entries) {
      assert(pointer === this)
    }
    const handler = pointer.createHandler(mockCb)
    const mockEntries = [1]
    handler(mockEntries)
  })

  it('disables watching an element', () => {
    const spy = sinon.spy()
    const mockObserver = {
      unobserve: spy
    }
    const pointer = new Pointer()
    pointer.observer = mockObserver
    const el = 'test'
    pointer.disableWatch(el)
    assert(spy.calledWith(el))
  })
})
