const flatten = require('array-flatten')

module.exports = h

function h (tag, properties = {}, ...children) {
  var element = document.createElement(tag)

  if (children) {
    flatten(children).forEach(function (child) {
      if (child == null) return
      element.appendChild(
        typeof child === 'string'
        ? document.createTextNode(child)
        : child
      )
    })
  }

  if (typeof properties.ref === 'function') {
    properties.ref(element)
  }

  return element
}
