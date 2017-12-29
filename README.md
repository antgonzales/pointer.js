# pointer.js
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)[![Travis CI Build](https://travis-ci.org/antgonzales/pointer.js.svg?branch=master)](https://travis-ci.org/antgonzales/pointer.js)
A waypoint library to find your place in the DOM.

## Installation

| Source |                                                                |
|:-------|:---------------------------------------------------------------|
| npm    | `npm install pointer.js --save`                                |
| yarn   | `yarn add pointer.js`                                          |
| unpkg  | [`https://unpkg.com/pointer.js`](https://unpkg.com/pointer.js) |

## Usage

```js
var waypoint = new Pointer({
  element: document.querySelector('.js-waypoint'),
  handler: function (entry) {
    alert('The element is in view!')
  }
})
```

