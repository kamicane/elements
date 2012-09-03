Elements
========

Elements is a DOM library using wrapped elements.

## $

Returns `elements` instances.

### Example

```js
var $ = require('elements')

// a collection elements, will only contain unique elements
var elements = $(document.getElementsByTagName('div'))
elements.addClass('test')

// a single element
var element = $(document.getElementById('myElement'))
element.addClass('test')

// if an element does not exist, $ will return null
var element = $(document.getElementById('not-existing')) // → null
```

## handle

This method will loop through all elements and the callback will be called with
the native DOM element. The returned version of the callback will be returned
as an array, like `Array.prototype.map`.

### Syntax

```js
elements.handle(callback)
```

### Arguments

1. callback - (*function*) callback that will be called with the native
element, the index and the returned buffer array. The context is the elements
instance which belongs to the element.

### Returns

- (*array*) an array with the values returned by the callbacks

## remove

Removes an element from the DOM.

### Syntax

```js
element.remove()
```

zen
===

Create elements through CSS selectors.

### Examples

```js
var zen = require('elements/lib/zen')

// returns elements instance with one div element
zen('div')

// returns elements instance with two a elements
zen('a + a')

// returns an elements instance with an a in a div
zen('div a')

// with an id, classes and attributes
zen('div a#link.menu.big[href="test.html"]')
```

### Notes

- zen also requires the Slick CSS parser.

attributes
==========

```js
$ = require('elements/lib/attributes')
```

## get

Get an attribute or property from the first element.

### Syntax

```js
element.get(name)
```

### Arguments

1. name (*string*) the name of the attribute or property

### Example

```html
<a href="/test" title="elements">test</a>
```

```js
element.get('title') // elements
```

### Returns

- the value of the attribute

## set

Set an attribute to an element.

### Syntax

```js
element.set(name, value)
```

### Arguments

1. name - (*string*) the name of the attribute or property
2. value - (*mixed*) the value the element attribute should be set to.

### Returns

- the elements instance

### Examples

```js
element.set('href', 'index.html')
element.set('checked', true)
```

## getAttribute

Calls the native `getAttribute` on the first element.

### Example

```js
element.getAttribute('id')
```

## setAttribute

Calls the native `setAttribute` on all elements.

### Example

```js
elements.setAttribut('src', 'mario.png')
```

## hasAttribute

Checks if an element has an attribute.

### Example

```js
element.hasAttribute('title')
```

## removeAttribute

Removes an attribute from all elements

### Example

```js
elements.removeAttribute('title')
```

## classNames

Get a sorted array of all classes of an element

### Syntax

```js
elements.classNames()
```

### Returns

- *array* - an ordered array of the classes on the element

## hasClass

Tests the Element to see if it has the passed in className.

### Syntax

```js
var result = myElement.hasClass(className)
```

### Arguments

1. className - (*string*) The class name to test.

### Returns

- (*boolean*) Returns true if the Element has the class, otherwise false.

### Examples

#### HTML

```html
<div id="myElement" class="testClass"></div>
```

#### JS

```js
$(document.getElementById('myElement')).hasClass('testClass'); // returns true
```

## addClass

Adds the passed in class to the Element, if the Element doesnt already have it.

### Syntax

```js
myElement.addClass(className)
```

### Arguments

1. className - (*string*) The class name to add.

### Returns

* (*element*) This Element.

### Examples

#### HTML

```html
<div id="myElement" class="testClass"></div>
```

#### JavaScript

```js
$(document.getElementById('myElement')).addClass('newClass')
```

#### Resulting HTML

```html
<div id="myElement" class="newClass testClass"></div>
```

## removeClass

Works like [addClass](#addClass), but removes the class from the Element.

### Syntax

```js
myElement.removeClass(className)
```

### Arguments

1. className - (*string*) The class name to remove.

### Returns

* (*element*) This Element.

### Examples

#### HTML

```html
<div id="myElement" class="testClass newClass"></div>
```

#### JavaScript

```js
$(document.getElementById('myElement')).removeClass('newClass')
```

#### Resulting HTML

```html
<div id="myElement" class="testClass"></div>
```

## toString

Creates a simple CSS selector from the element.

### Example

#### HTML

```html
<div id="myElement" class="otherClass testClass"></div>
```

#### JS

```js
$(document.getElementById('myElement')).toString()
```

#### Result

	div#myElement.otherClass.testClass

## tag

Get the tag name of an element as a lower case string.

### Example

```js
myElement.tag() // result: div
```

## html

Set or get HTML to on element.

### Syntax

```js
myElement.html([html])
```

### Arguments

1. html - (*string*) if the `html` argument is set, it will set the html,
otherwise it will return the current html.

### Examples

```js
myElement.html('<p>new html</p>')
// or
var html = myElement.html() // returns: <p>new html</p>
```

## text

Set or get text to on element.

### Syntax

```js
myElement.text([text])
```

### Arguments

1. text - (*string*) if the `text` argument is set, it will set the text,
otherwise it will return the current text.

### Examples

```js
myElement.text("I'm just contemplating the ifs.")
// or
var text = myElement.text()
```

domready
========

Contains the DOMReady event, which executes when the DOM is loaded.

To ensure that DOM elements exist when the code attempts to access them is
executed, they need to be placed within the 'domready' event.

### Example

```js
var domready = require('elements/lib/domready')
domready(function(){
	alert('The DOM is ready!')
})
```

events
======

Events lets you attach event listeners to DOM elements on the page. Those
event listeners will be executed once the user clicks something or something
else happens.

### See Also:

- [MDN DOM Event Reference](https://developer.mozilla.org/en/DOM/DOM_event_reference)

## on

Attaches an event listener to a DOM element.

### Syntax

```js
myElement.on(type, fn)
```

### Arguments

1. type - (*string*) The event name to monitor ('click', 'load', etc) without
the prefix 'on'.
2. fn   - (*function*) The function to execute.

### Returns

- this `elements` instance

### Example

```js
myElement.on('click', function(event){
	alert('clicked')
})
```

## off

Works as [on](#on), but instead removes the specified event listener.

### Syntax

```js
myElement.off(type, fn)
```

### Arguments

1. type - (*string*) The event name.
2. fn   - (*function*) The function to remove.

### Returns

- this `elements` instance

Examples

```js
var destroy = function(){
	alert('Boom: ' + this.id)
} // this refers to the Element.
myElement.on('click', destroy)

//later...
myElement.off('click', destroy)
```

## emit

Executes all events attached for the specified type on an element.

### Syntax

```js
myElement.empty(type, args...)
```

### Arguments

1. type - (*string*) The event name.
2. args... - (*mixed*) Zero or multiple extra arguments that will be passed to
the event listeners

### Examples

```js
var add = function(a, b){
	alert(a + b)
}
element.on('click', add)
element.emit('click', 4, 2) // alerts 6
```

insertion
=========

Insertion will insert, inject or replace elements at certain places.

## appendChild

Wrapper method of the native `appendChild` method. It will append another
element as child element.

### Arguments

1. child - (*elements*) another elements instance.

### Returns

- this `elements` instance

### Example

#### HTML

```html
<div id="child"></div>
<div id="parent"></div>
```

#### JS

```js
var parent = $(document.getElementById('parent'))
var child = $(document.getElementById('child'))
parent.appendChild(child)
```

#### Resulting HTML

```html
<div id="parent"><div id="child"></div></div>
```

### See also

- [MDN appendChild]()

## insertBefore

Wrapper method of the native `insertBefore` method. It will insert an element
before another element.

### Arguments

1. child - (*elements*) another elements instance.
1. ref - (*elements*) the reference element. `child` will be inserted before
`ref`.

### Returns

- this `elements` instance

### Example

#### HTML

```html
<div id="first"></div>
<div id="parent">
	<div id="second"></div>
</div>
```

#### JS

```js
var parent = $(document.getElementById('parent'))
var child = $(document.getElementById('first'))
var ref = $(document.getElementById('second'))
parent.insertBefore(child, ref)
```

#### Resulting HTML

```html
<div id="parent">
	<div id="first"></div>
	<div id="second"></div>
</div>
```

## removeChild

Wrapper method of the native `removeChild` method.

### Syntax

```js
parent.removeChild(child)
```

1. child - (*elements*) another elements instance, which is a child of the
parent element.

### Returns

- this `elements` instance

### Example

#### HTML

```html
<div id="parent">
	<div id="child"></div>
</div>
```

#### JS

```js
var parent = $(document.getElementById('parent'))
var child = $(document.getElementById('child'))
parent.removeChild(child)
```

#### Resulting HTML

```html
<div id="parent"></div>
```

## replaceChild

Wrapper method of the native `replaceChild` method.

### Syntax

1. child - (*elements*) another elements instance.
1. ref - (*elements*) the reference element. `ref` will be replaced with
`child`.

### Returns

- this `elements` instance

### Example

#### HTML

```html
<div id="child"></div>
<div id="parent">
	<div id="ref"></div>
</div>
```

#### JS

```js
var parent = $(document.getElementById('parent'))
var child = $(document.getElementById('child'))
var ref = $(document.getElementById('ref'))
parent.replaceChild(child, ref)
```

#### Resulting HTML

```html
<div id="parent"><div id="child"></div></div>
```

## before

Inserts an element before another element.

### Example

#### JS

```js
myFirstElement.before(mySecondElement)
```

#### Resulting HTML

```html
<div id="myFirstElement"></div>
<div id="mySecondElement"></div>
```

## after

Inserts an element after another element.

### Example

#### JS

```js
myFirstElement.after(mySecondElement)
```

#### Resulting HTML

```html
<div id="mySecondElement"></div>
<div id="myFirstElement"></div>
```

## bottom

Injects an element at the bottom of another element.

### Example

#### JS

```js
myFirstElement.bottom(mySecondElement)
```

#### Resulting HTML

```html
<div id="mySecondElement">
	<div id="myFirstElement"></div>
</div>
```

## top

Injects an element at the top of another element.

### Example

#### JS

```js
myThirdElement.top(mySecondElement)
```

#### Resulting HTML

```html
<div id="mySecondElement">
	<div id="myThirdElement"></div>
	<div id="myFirstElement"></div>
</div>
```

## insert

`insert` is an alias of [bottom](#bottom)

## replace

Replace another element with this element.

### Example

#### JS

```js
myNewElement.replaces(myOldElement)
// myOldElement is gone, and myNewElement is in its place.
```

list
====

traversal
=========


