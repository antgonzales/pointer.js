import fs from 'fs'
import { JSDOM } from 'jsdom'
import test from 'ava'
import sinon from 'sinon'

const build = fs.readFileSync('dist/umd/pointer.js', { encoding: 'utf-8' })
let window
let Pointer

function createDomNodes (type, attributes, amount) {
  const els = []
  for (let i = 0; i < amount; i++) {
    const el = window.document.createElement(type)
    el.setAttribute(attributes.name, attributes.value)
    els.push(el)
  }
  return els
}

test.beforeEach(() => {
  window = (new JSDOM(``, { runScripts: 'dangerously' })).window
  const scriptEl = window.document.createElement('script')
  scriptEl.textContent = build
  window.document.body.appendChild(scriptEl)
  Pointer = window.Pointer.js
})

test('includes IntersectionObserver depedency', (assert) => {
  assert.truthy(window.IntersectionObserver)
})

test('returns the element', (assert) => {
  const div = createDomNodes('div', {name: 'class', value: 'js-waypoint'}, 1)[0]
  const pointer = new Pointer({element: div})
  const element = pointer.getElement()
  assert.is(element, div)
})

test('creates an observer', (assert) => {
  const pointer = new Pointer()
  const observer = pointer.observer
  assert.is(observer.constructor.name, 'IntersectionObserver')
})

test('observes the element', (assert) => {
  const spy = sinon.spy()
  const mockObserver = {
    observe: spy
  }
  const pointer = new Pointer()
  pointer.observer = mockObserver
  const el = 'test'
  pointer.watchElement(el)
  assert.true(spy.calledOnce)
})

test('watches the element on instantiation', (assert) => {
  sinon.spy(Pointer.prototype, 'watchElement')
  const el = createDomNodes('div', {name: 'class', value: 'js-waypoint'}, 1)[0]
  const pointer = new Pointer({element: el})
  assert.true(pointer.watchElement.calledOnce)
})

test('returns a function to run the callback on each observations entry', (assert) => {
  const spy = sinon.spy()
  const pointer = new Pointer({handler: spy})
  const mockEntries = [1, 2, 3, 4, 5]
  pointer.callback(mockEntries)
  assert.is(spy.callCount, mockEntries.length)
})

test('passes class context to the handler', (assert) => {
  const handler = function () {
    assert.is(this.constructor.name, 'Pointer')
  }
  const pointer = new Pointer({handler: handler})
  const mockEntries = [1]
  pointer.callback(mockEntries)
})

test('disables watching an element', (assert) => {
  const spy = sinon.spy()
  const mockObserver = {
    unobserve: spy
  }
  const pointer = new Pointer()
  pointer.observer = mockObserver
  const el = 'test'
  pointer.disableWatch(el)
  assert.true(spy.calledWith(el))
})
