const listeners = require('./listeners')

module.exports = create

function create (tag, properties, children) {
  return Element(global.document, null, tag, properties, children)
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
    element.setAttribute(name, attributes[name])
  }
}

function applyEvents (element, events = {}) {
  listeners.set(element, events)

  for (const name in events) {
    element.addEventListener(name, events[name])
  }
}

function applyStyle (element, style = {}) {
  for (const name in style) {
    element.style.setProperty(name, style[name])
  }
}

function applyRef (element, ref) {
  if (ref) ref(element)
}

function applyProperties (element, properties = {}) {
  for (const name in properties) {
    element[name] = properties[name]
  }
}

function applyOptions (element, options = {}) {
  var attributes, events, style, ref
  var properties = {}
  for (const name in options) {
    const value = options[name]
    switch (name) {
      case 'attributes': attributes = value; break
      case 'events': events = value; break
      case 'style': style = value; break
      case 'ref': ref = value; break
      default: properties[name] = value
    }
  }

  applyAttributes(element, attributes)
  applyEvents(element, events)
  applyProperties(element, properties)
  applyStyle(element, style)
  applyRef(element, ref)

  return element
}
