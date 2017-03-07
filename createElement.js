module.exports = createElement

function createElement (tag, properties = {}, ...children) {
  var element = document.createElement(tag)

  if (children) appendChildren(element, children)

  if (typeof properties.ref === 'function') {
    properties.ref(element)
  }

  return element
}

// taken from `shama/bel`
// https://github.com/shama/bel/blob/6dab8325600553836b9bf09e148ea0b5a1c48a8c/index.js
function appendChildren (element, childs) {
  if (!Array.isArray(childs)) return

  for (var i = 0; i < childs.length; i++) {
    var child = childs[i]

    if (Array.isArray(child)) {
      appendChildren(element, child)
      continue
    }

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
        continue
      }
      child = document.createTextNode(child)
    }

    if (child && child.nodeType) {
      element.appendChild(child)
    }
  }
}
