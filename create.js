const setAttribute = require('@f/set-attribute')

const listenersCache = require('./listeners')
const hooksCache = require('./hooks')

const SVG_NS = 'http://www.w3.org/2000/svg'

module.exports = create
module.exports.svg = createSvg

function create (tag, properties, children) {
  return Element(global.document, null, tag, properties, children)
}

function createSvg (tag, properties, children) {
  return Element(global.document, SVG_NS, tag, properties, children)
}

function Element (document, namespace, tag, properties, children) {
  var element = namespace
    ? document.createElementNS(namespace, tag)
    : document.createElement(tag)

  if (children) appendChildren(document, element, children)

  applyOptions(element, properties)

  return element
}

// taken from `shama/bel`
// https://github.com/shama/bel/blob/6dab8325600553836b9bf09e148ea0b5a1c48a8c/index.js
function appendChildren (document, element, childs) {
  if (Array.isArray(childs)) {
    return childs.forEach(function (child) {
      appendChildren(document, element, child)
    })
  }

  var child = childs
  if (
    typeof child === 'number' ||
    typeof child === 'boolean' ||
    typeof child === 'function' ||
    child instanceof Date ||
    child instanceof RegExp
  ) {
    child = child.toString()
  }

  if (typeof child === 'string') {
    if (element.lastChild && element.lastChild.nodeName === '#text') {
      element.lastChild.nodeValue += child
      return
    }
    child = document.createTextNode(child)
  }

  if (child && child.nodeType) {
    element.appendChild(child)
  }
}

function applyAttributes (element, attributes = {}) {
  for (const name in attributes) {
    setAttribute(element, name, attributes[name])
  }
}

function applyEvents (element, events = {}) {
  listenersCache.set(element, events)

  for (const name in events) {
    element.addEventListener(name, events[name])
  }
}

function applyStyle (element, style = {}) {
  for (const name in style) {
    element.style.setProperty(name, style[name])
  }
}

function applyHooks (element, hooks = []) {
  hooksCache.onLoad.set(element, hooks.map(hook => {
    return (node) => runHook(node, hook)
  }))
}

function runHook (node, hook) {
  const onUnload = hook(node)
  hooksCache.onUnload.set(
    node,
    [...hooksCache.onUnload.get(node), onUnload]
  )
}

function applyProperties (element, properties = {}) {
  for (const name in properties) {
    element[name] = properties[name]
  }
}

function applyOptions (element, options = {}) {
  const { attributes, events, style, hooks } = options

  var properties = {}
  for (const name in options) {
    switch (name) {
      case 'attributes':
      case 'events':
      case 'style':
      case 'hooks':
        break
      default:
        properties[name] = options[name]
    }
  }

  applyAttributes(element, attributes)
  applyEvents(element, events)
  applyProperties(element, properties)
  applyStyle(element, style)
  applyHooks(element, hooks)

  return element
}
