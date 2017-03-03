# hyps

minimal `h` hyperscript module wrapped with [@skatejs/val](https://github.com/skatejs/val)

```shell
npm install --save hyps
```

## usage

### `hyps = require('hyps')`

### `HTMLElement el = hyps(tag, props, ...children)`

`hyps` is `@skatejs/val` wrapping `hyps/h`

see [`@skatejs/val#usage`](https://github.com/skatejs/val#usage)

### `h = require('hyps/h')`

### `HTMLElement el = h(tag, props, ...children)`

`h` is the minimal html element factory function

it only:

- creates `HTMLElement` with `tag`
- flattens and appends child nodes to node
  - if child is string, creates text node
- calls `props.ref` if given

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
