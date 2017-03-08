const morphdom = require('morphdom')

const listeners = require('./listeners')

module.exports = update

function update (fromNode, toNode, opts = {}) {
  if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier

  return morphdom(fromNode, toNode, opts)
}

// inspiration from https://github.com/maxogden/yo-yo/blob/b4e1e8fe2e1081464c1fbdd1ad6c7a0ae7e24ad1/index.js
function copier (fromNode, toNode) {
  copyEvents(fromNode, toNode)
  copyValues(fromNode, toNode)
}

function copyEvents (fromNode, toNode) {
  const toEventListeners = listeners.get(toNode)
  const fromEventListeners = listeners.get(fromNode)

  // iterate through all event listeners
  uniqueKeys(toEventListeners, fromEventListeners).forEach(name => {
    const toEventListener = toEventListeners[name]
    const fromEventListener = fromEventListeners[name]
    // if existing event listener does not match new event listener
    if (fromEventListener !== toEventListener) {
      // if existing event listener is defined
      if (fromEventListener !== undefined) {
        // remove existing event listener
        fromNode.removeEventListener(name, fromEventListener)
        delete fromEventListeners[name]
      }
      // if new event listener is defined
      if (toEventListener !== undefined) {
        // add new event listener
        fromNode.addEventListener(name, toEventListener)
        fromEventListeners[name] = toEventListener
      }
    }
  })
}

function copyValues (fromNode, toNode) {
  var oldValue = fromNode.value
  var newValue = toNode.value
  // copy values for form elements
  if (
    (
    fromNode.nodeName === 'INPUT' &&
    fromNode.type !== 'file'
    ) ||
    fromNode.nodeName === 'SELECT'
  ) {
    if (!newValue) {
      toNode.value = fromNode.value
    } else if (newValue !== oldValue) {
      fromNode.value = newValue
    }
  } else if (fromNode.nodeName === 'TEXTAREA') {
    if (toNode.getAttribute('value') === null) fromNode.value = toNode.value
  }
}

function uniqueKeys (objA = {}, objB = {}) {
  var keys = Object.keys(objA)
  for (const name in objB) {
    if (keys.indexOf(name) === -1) keys.push(name)
  }
  return keys
}
