# hyps

`hyps` is a [hyperscript-style](https://github.com/hyperhype/awesome-hyperscript) module to create and update pure DOM elements.

```shell
npm install --save hyps
```

## usage

### `hyps = require('hyps')`

### `element = hyps.create(tagName, [properties], [children])`

`tagName` is a string that specifies the type of element to be created, which is passed into [`document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/document/createElement).

`properties` is an object with the following:

- `attributes`: an object mapping attribute names to values, which is passed into `element.setAttribute(name, value)`.
- `events`: an object mapping event names to listeners. which is passed into `element.addEventListener(name, listener)`.
- `hooks`: TODO an array of functions ("hooks") called when element is added to the dom. if hook returns function, that will be called when the element is removed from the dom.
- `data`: TODO
- `style`: either an element style string or an object mapping element style properties to values, which is either passed into `element.style = style` or `element.style.setProperty(name, value)`, respectively.

`children` is either an `Array`, `Node`, `Element`, or `String`. an `Array` may contained nested `Array`s.

`element` returned is an `instanceof` `Node` or `Element`.

### `hyps.update(targetElement, newElement, [options])`

uses [`morphdom`](https://github.com/patrick-steele-idem/morphdom) to efficently update an element by diffing and morphing a new element onto an existing target element.

any options passed in will be passed to `morphdom`.

### `elementListeners = hyps.listeners.get(element)`

## license

The Apache License

Copyright &copy; 2017 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
