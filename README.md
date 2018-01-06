# pointer.js

[![Travis CI Build](https://travis-ci.org/antgonzales/pointer.js.svg?branch=master)](https://travis-ci.org/antgonzales/pointer.js)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A waypoint library to find your place in the DOM. Pointer.js is built on
the experimental [Intersection Observer API]
(https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
to determine if an element is visible in the viewport. Pointer.js is ready to 
use across all browsers and all devices.

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
## API

### new Pointer(options) 

options: A Javascript object containing Pointer options. This object is 
required. It must contain element and handler properties.

options.element: A document element that you wish to set as the waypoint.

options.handler: A function that executes when the options.element is in view.
The function passes an [Intersection Observer Entry]
(https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).


## Copyright & Licensing

Copyright 2018 Anthony Gonzales. Code released under the [MIT License](https://github.com/antgonzales/pointer.js/blob/master/LICENSE). 

