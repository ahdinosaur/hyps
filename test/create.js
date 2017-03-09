/* global HTMLElement */

const test = require('tape')
const jsdom = require('jsdom')

var create

test('load window', function (t) {
  jsdom.env('', (err, win) => {
    global.document = win.document
    global.window = win
    global.HTMLElement = win.HTMLElement

    create = require('../create')

    t.error(err)
    t.pass('created window')
    t.end()
  })
})

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

test('creates children of type number converted to string', function(t) {
  const number = 1
  const el = create('section', {}, number)
  const childs = el.childNodes
  t.equal(childs[0].textContent, String(number))
  t.end()
})

test('creates children of type boolean converted to string', function(t) {
  const boolean = true
  const el = create('section', {}, boolean)
  const childs = el.childNodes
  t.equal(childs[0].textContent, String(boolean))
  t.end()
})

test('creates children of type function converted to string', function(t) {
  const func = function myFunc() {}
  const el = create('section', {}, func)
  const childs = el.childNodes
  t.equal(childs[0].textContent, String(func))
  t.end()
})

test('creates children of type date converted to string', function(t) {
  const date = new Date() 
  const el = create('section', {}, date)
  const childs = el.childNodes
  t.equal(childs[0].textContent, String(date))
  t.end()
})

test('creates children of type regex converted to string', function(t) {
  const regex = new RegExp('.') 
  const el = create('section', {}, regex)
  const childs = el.childNodes
  t.equal(childs[0].textContent, String(regex))
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

test('create(, { style: },)', function (t) {
  const el = create('div', {
    style: {color: '#000'}
  })
  t.ok(el.style.color)
  t.end()
})

test('create(, { attributes: },)', function (t) {
  const attrType = 'style'
  const attrVal = {color: '#000'}
  const el = create('div', {
    attributes: {[attrType]: attrVal} 
  })
  t.equal(el.attributes[0].name, attrType)
  t.end()
})


test('unload window', function (t) {
  window.close()
  t.pass('unloaded window')
  t.end()
})
