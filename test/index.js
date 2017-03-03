const test = require('tape')

const hyps = require('../')

test('hyps', function (t) {
  t.ok(hyps, 'module is require-able')
  t.end()
})

test('hyps(, props)', function (t) {
  const el = hyps('nav', {
    test: 'hey hey'
  })
  t.ok(el)
  t.equal(el.test, 'hey hey')
  t.end()
})

test('hyps(, props, ...children)', function (t) {
  const el = hyps('section', {}, [
    hyps('div'),
    'two'
    [hyps('div', { textContent: 'three' })]
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

test('hyps(, props, ...children)', function (t) {
  const el = hyps('section', {}, [
    hyps('div'),
    'two'
    [hyps('div', { textContent: 'three' })]
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
