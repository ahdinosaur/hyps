/* global HTMLElement */
const test = require('tape')

const create = require('../create')

test('create', function (t) {
  t.ok(create, 'module is require-able')
  t.end()
})

test('create(tag)', function (t) {
  const el = create('div')
  t.ok(el)
  t.ok(el instanceof HTMLElement)
  t.equal(el.tagName, 'DIV')
  t.end()
})

test('create(, props)', function (t) {
  const el = create('nav', {
    test: 'hey hey'
  })
  t.ok(el)
  t.equal(el.test, 'hey hey')
  t.end()
})

test('create(,, ...children)', function (t) {
  const el = create('section', {}, [
    create('div'),
    create('div', {}, ['two']),
    [create('div', {}, ['three'])],
    [[create('div', {}, ['four'])]]
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

test('create(,, ...children) text optimization', function (t) {
  const el = create('section', {}, [
    create('div'),
    'two',
    ['three'],
    [['four']]
  ])
  const expectedText = 'twothreefour'
  t.equal(el.childNodes.length, 2)
  t.equal(el.childNodes[1].textContent, expectedText)
  t.end()
})

test('create(, props, ...children)', function (t) {
  const el = create('section', {}, [
    create('div'),
    'two',
    [create('div', { textContent: 'three' })]
  ])
  const expectedText = [
    '',
    'two',
    'three'
  ]
  const childs = el.childNodes
  for (var i = 0; i < childs.length; ++i) {
    const child = childs[i]
    t.equal(child.textContent, expectedText[i])
  }
  t.end()
})

test('create(, props, ...children)', function (t) {
  const el = create('section', {}, [
    create('div'),
    'two',
    [create('div', { textContent: 'three' })]
  ])
  const expectedText = [
    '',
    'two',
    'three'
  ]
  const childs = el.childNodes
  for (var i = 0; i < childs.length; ++i) {
    const child = childs[i]
    t.equal(child.textContent, expectedText[i])
  }
  t.end()
})

test('create(, { ref: },)', function (t) {
  create('div', {
    ref: function (el) {
      t.ok(el)
      t.ok(el instanceof HTMLElement)
      t.equal(el.tagName, 'DIV')
      t.end()
    }
  })
})
