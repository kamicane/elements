# ![elements](http://kamicane.github.io/assets/elements.png)

[![Build Status](http://img.shields.io/travis/kamicane/prime/master.svg)](http://travis-ci.org/kamicane/elements)

A minimal DOM Library built on top of [prime](https://github.com/mootools/prime).

## Overview

```js
// require elements
var $ = require('elements');

// require elements utilities
var ready = require('elements/domready');
var zen = require('elements/zen');

// do this on domready
ready(function() {

  // create an element with css syntax
  var element = zen('div#someID.className');

  // add text and insert into body
  element.text('read the documentation').insert(document.body);

  // add an event listener for click
  element.on('click', function() {
    console.log('clicked!');
  });

  var document = $(document);

  // find the element in the dom, it's the same elements instance!
  if (document.find('div#someID.className') === element) {
    console.log('success!');
  }

  // delegate click, because delegation is best
  document.delegate('click', 'div#someID', function() {
    console.log('delegation is nice');
  });

  // finally add a class name
  element.addClass('className2');

});

```

When all else fails, read the [full documentation](https://github.com/mootools/elements/blob/master/doc/elements.md).
