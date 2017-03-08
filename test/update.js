/* global Event */

const test = require('tape')
const hyps = require('../')

test('event attribute gets updated', function (t) {
  t.plan(2)
  function a () { t.ok(true, 'called a') }
  function b () { t.ok(true, 'called b') }
  var el = hyps.create('button', { events: { click: a } }, 'hi')
  el.click()
  hyps.update(el, hyps.create('button', { events: { click: b } }, 'hi'))
  el.click()
})

test('event attribute gets removed', function (t) {
  t.plan(1)
  function a () { t.ok(true, 'called a') }
  var el = hyps.create('button', { events: { click: a } }, 'hi')
  el.click()
  hyps.update(el, hyps.create('button', {}, 'hi'))
  el.click()
})

test('custom event listeners and properties are ignored', function (t) {
  t.plan(3)
  function a () { t.ok(true, 'called a') }
  function b () { t.ok(true, 'called b') }
  function c () { t.notOk(true, 'should not call c') }
  var el = hyps.create('button', { events: { click: a } }, 'hi')
  el.click()
  var newEl = hyps.create('button', { events: { click: b } }, 'hi')
  newEl.foo = 999
  newEl.addEventListener('foobar', c)
  hyps.update(el, newEl)
  t.equal(el.foo, undefined, 'no el.foo')
  el.dispatchEvent(new Event('foobar'))
  el.click()
})

test('input values get copied', function (t) {
  t.plan(1)
  var el = hyps.create('input', { type: 'text' })
  el.value = 'hi'
  var newEl = hyps.create('input', { type: 'text' })
  hyps.update(el, newEl)
  t.equal(el.value, 'hi')
})

test('input value gets updated', function (t) {
  t.plan(1)
  var el = hyps.create('input', { type: 'text' })
  el.value = 'howdy'
  var newEl = hyps.create('input', { type: 'text' })
  newEl.value = 'hi'
  hyps.update(el, newEl)
  t.equal(el.value, 'hi')
})

test('textarea values get copied', function (t) {
  t.plan(1)
  function textarea (val) {
    return hyps.create('textarea', {}, val)
  }
  var el = textarea('foo')
  hyps.update(el, textarea('bar'))
  t.equal(el.value, 'bar')
})
