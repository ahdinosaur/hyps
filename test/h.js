/* global HTMLElment */
const test = require('tape')

const h = require('../h')

test('h', function (t) {
  t.ok(h, 'module is require-able')
  t.end()
})

test('h(tag)', function (t) {
  const el = h('div')
  t.ok(el)
  t.ok(el instanceof HTMLElement)
  t.equal(el.tagName, 'DIV')
  t.end()
})

test('h(,, ...children)', function (t) {
  const el = h('section', {}, [
    h('div'),
    'two',
    ['three'],
    [['four']]
  ])
  const expectedText = [
    '',
    'two',
    'three',
    'four'
  ]
  el.childNodes.forEach((child, index) => {
    t.equal(child.textContent, expectedText[index])
  })
  t.end()
})


test('h(, { ref: },)', function (t) {
  const el = h('div', {
    ref: function (el) {
      t.ok(el)
      t.ok(el instanceof HTMLElement)
      t.equal(el.tagName, 'DIV')
    }
  })
  t.ok(el)
  t.end()
})
