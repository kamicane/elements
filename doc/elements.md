Elements
========

Elements is a DOM library using wrapped elements.

### Downloading elements

Big Fat Download Button

### Installation

elements can be obtained through *npm* with the following command:

	npm install elements

### Building elements

In many examples below you can see `require()` calls, just like `require()`
works in nodejs. If you have downloaded the full version, you don't have to
worry about it, all methods will be there already by default. However if you
choose to build elements manually, just with the components you need, you can
use [wrapup](https://github.com/kamicane/wrapup) to create your own build.

#### Your main.js

```js
var $ = require('elements')
var ready = require('elements/lib/domready')
var zen = require('elements/lib/zen')
ready(function(){
	var text = "When all else fails, read the manual"
	var element = zen('div.class').text(text).insert(document.body)
})
```

#### Build Command

	wrup -r ./main.js

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

### Parameters

1. callback - (*function*) callback that will be called with the native
element, the index and the returned buffer array. The context is the elements
instance which belongs to the element.

### Returns

- (*array*) an array with the values returned by the callbacks

### Example

```js
var checks = checkboxes.handle(function(checkbox){
	// checkbox is the native element
	var checked = checkbox.checked
	checkbox.checked = !checked
	// this is the wrapped element object
	this.attribute('data-checked', !checked)
	// return the result
	return checked
}) // an array with the returned value for each element
```

## remove

Removes an element from the DOM.

### Syntax

```js
element.remove()
```

## $.use

Most modules in elements don't require a specific selector engine. With
`$.use()` a selector engine can be used.

### Examples

```js
// simply require slick. install slick with: npm install slick
var $ = require('elements')
$.use(require('slick'))

// or use some other engine:
$.use({
	search: function(selector, context){
		return context.querySelectorAll(selector)
	}
})
```

Now `$` accepts any selector as well:

```js
$('a') // returns elements instance with al 'a' elements on the page
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
var $ = require('elements/lib/attributes')
```

## attribute

Get or set an attribute or property.

### Syntax

```js
element.attribute(name[, value])
```

### Parameters

1. name (*string*) the name of the attribute or property
2. value (*string*, optional) if the value parameter is set, this method will
act like a setter and will set the value to all elements in the collection.
If this attribute is omitted, it will act as a getter on the first element in
the collection.

### Example

#### HTML

```html
<a href="/test" title="elements">test</a>
```

#### JS

```js
// as getter
element.attribute('title') // elements
// as setter
element.attribute("text", "Here's Johnny!")
element.attribute("title", "The Shining")
```

### Returns

If only the name parameter is passed:

- the value of the attribute

If the name and value parameters are passed:

- the elements instance

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

### Parameters

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

### Note

- If you need to set HTML to tables, or your HTML contains HTML5 tags, this
method might not work correctly in each browser. If you really need the
cross-browser fixes, use something like
[html5shiv](http://code.google.com/p/html5shiv/).

## addClass

Adds the passed in class to the Element, if the Element doesn't already have it.

### Syntax

```js
myElement.addClass(className)
```

### Parameters

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

### Parameters

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

### Parameters

1. html - (*string*) if the `html` parameter is set, it will set the html,
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

### Parameters

1. text - (*string*) if the `text` parameter is set, it will set the text,
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

### Parameters

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

### Parameters

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

### Note

- To remove a listener, it is important to pass the same function to the `fn`
parameter. In the example the reference to the function is stored in the
`destroy` variable.

## emit

Executes all events attached for the specified type on an element.

### Syntax

```js
myElement.emit(type, args...)
```

### Parameters

1. type - (*string*) The event name.
2. args... - (*mixed*) Zero or multiple extra parameters that will be passed to
the event listeners

### Examples

```js
var add = function(a, b){
	alert(a + b)
}
element.on('click', add)
element.emit('click', 4, 2) // alerts 6
```

delegation
==========

Delegation is a common practice where an event listener is attached to a parent
element to monitor its children rather than attach events to every single child
element. It's more efficient for dynamic content or highly interactive pages
with a lot of DOM elements.

## delegate

Add a new delegation event listener to an element.

### Syntax

```js
myElement.delegate(type, selector, fn)
```

### Parameters

1. type - (*string*) The event name.
2. selector - (*string*) A CSS Selector the element the event is fired on
should match (see [matches](#matches))
3. fn   - (*function*) The function to remove.

### Returns

- this `elements` instance

### Example

#### HTML

```html
<ul>
	<li><a href="#">one</a></li>
	<li><a href="#">two</a></li>
	<li><a href="#">three</a></li>
</ul>
```

#### JS

```js
var $ = require('elements/lib/delegation')

$('ul').delegate('click', 'a', function(event, a){
	alert(a.text())
})
```

## undelegate

Removes a delegation event listener from an element. Opposite operation of
[delegate](#delegate).

### Syntax

```js
myElement.undelegate(type, selector, fn)
```

### Parameters

1. type - (*string*) The event name.
2. selector - (*string*) A CSS Selector the element the event is fired on
should match (see [matches](#matches))
3. fn   - (*function*) The function to remove.

### Returns

- this `elements` instance

### Example

```js
var click = function(event, a){
	alert(a.text())
}
// add the delegation listener
$('ul').delegate('click', 'a', click)
// later remove the delegation listener again
$('ul').undelegate('click', 'a', click)
```

insertion
=========

Insertion will insert, inject or replace elements at certain places.

### Example

```js
var $ = require('elements/lib/insertion')

var vince = $(document.getElementById('vince'))
$(document.createElement('div')).insert(vince)
```

## appendChild

Wrapper method of the native `appendChild` method. It will append another
element as child element.

### Parameters

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

### Parameters

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

List provides elements for iterating over the collection of elements of the
elements instance.

```js
var $ = require('elements/lib/list')
```

## forEach

Calls a function for each element in the array.

### Syntax

```js
elements.forEach(fn[, bind])
```

### Parameters

1. fn - (*function*) Function to execute for each element. `fn` is called like
`fn(element, index)` where `element` is the native element, and `index` is the
index of the element in the elements collection
2. bind - (*object*, optional) Object to use as `this` when executing `fn`.

### Example

var elements = $(document.getElementsByTagName('a'))
elements.forEach(function(element, index){
	return $(element).text('element: ' + index)
})

### See also

- [handle()](#handle)
- [MDN Array forEach](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach)

## map

Creates a new array with the results of calling a provided function on every
element in the elements collection

### Syntax

```js
var mapped = elements.map(fn[, bind])
```

### Parameters

1. fn - (*function*) Function that produces an element of the new Array from an
element of the current one. `fn` is called like `fn(element, index)` where
`element` is the native element, and `index` is the index of the element in the
elements collection
2. bind - (*object*, optional) Object to use as `this` when executing `fn`.

### Returns

- (*array*) The new mapped array.

### Example

```js
var elements = $(document.getElementsByTagName('a'))
var result = elements.map(function(element, index){
	return $(element).attribute('href')
}) // array with all href values of each element
```

### See also

- [handle()](#handle)
- [MDN Array Map](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map)

## filter

Creates a new array with all of the elements of the collection for which the
provided filtering function returns true.

### Syntax

```js
var filtered = elements.filter(fn[, bind])
```

### Parameters

1. fn - (*function*) The function to test each element of the collection. `fn`
is called like `fn(element, index)` where `element` is the native element, and
`index` is the index of the element in the elements collection.
2. bind - (*object*, optional) Object to use as `this` when executing `fn`.

### Returns

- (*array*) an array with only the filtered elements

### Example

```js
var elements = $(document.getElementsByTagName('*'))
var filtered = elements.filter(function(element, index){
	return element.childNodes.length > 4
}) // array with elements that have more than 4 direct children
```

### See also

- [MDN Array Filter](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter)

## every

Returns true if every element in the array satisfies the provided testing
function.

### Syntax

```js
var allPassed = elements.every(fn[, bind])
```

### Parameters

1. fn - (*function*) The function to test each element of the collection. `fn`
is called like `fn(element, index)` where `element` is the native element, and
`index` is the index of the element in the elements collection.
2. bind - (*object*, optional) Object to use as `this` when executing `fn`.

### Returns

- (*boolean*) - If every element in the collection satisfies the provided
testing function, returns true. Otherwise, returns false.

### Example

```js
var elements = $(document.getElementsByTagName('div'))
var allEnoughChildren = elements.every(function(element, index){
	return element.childNodes.length > 4
}) // true if each div has more than 4 child elements
```

### See also

- [MDN Array every](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every)

## some

Returns true if at least one element in the array satisfies the provided
testing function.

### Syntax

```js
var somePassed = elements.some(fn[, bind])
```

### Parameters

1. fn - (*function*) The function to test each element of the collection. `fn`
is called like `fn(element, index)` where `element` is the native element, and
`index` is the index of the element in the elements collection.
2. bind - (*object*, optional) Object to use as `this` when executing `fn`.

### Returns

- (*boolean*) - If some element in the collection satisfies the provided
testing function, returns true. Otherwise, returns false.

### Example

```js
var elements = $(document.getElementsByTagName('div'))
var someEnoughChildren = elements.some(function(element, index){
	return element.childNodes.length > 4
}) // true if some div has more than 4 child elements
```

### See also

- [MDN Array every](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every)

traversal
=========

Traversal adds multiple methods for finding other elements.

### Example

```js
var $ = require('elements/lib/traversal')
```

### Note

- Using the traversal package will require the slick package.

### See also

- [CSS Selectors](http://www.w3.org/TR/css3-selectors/)

## search

Search elements with by an selector, with the current elements as context.

### Syntax

```js
elements.search(expression)
```

### Parameters

1. expression - (*string*) a CSS selector

### Return

- elements instance with the new elements

### Example

```js
// slick is included by traversal, we can pass selectors to $()
// select all p elements
var elements = $("p")
// select all a elements in the previously found p elements
elements.search("a")
```

### See also

- [find()](#find)

## find

Find one element for each element in the elements collection.

### Syntax

```js
elements.find(expression)
```

### Parameters

1. expression - (*string*) a CSS selector

### Returns

- elements instance with the new elements

### Example

#### HTML

```html
<ul>
	<li>Rome</li>
	<li>Delft</li>
	<li>Graz</li>
</ul>
<ul>
	<li>Stockholm</li>
	<li>London</li>
</ul>
```

#### JS

```js
// slick is included by traversal, we can pass selectors to $()
// select both ul elements
var elements = $("ul")
// select the first element for each list
var cities = elements.find("li")
// cities now contains "Rome" and "Stockholm"
```

### See also

- [search()](#search)

## matches

Test if this element matches the passed CSS Selector.

### Syntax

```js
element.matches(selector)
```

### Parameters

1. match - (*string*) a CSS selector to test this element against

### Returns

- (*boolean*) If the element matched, returns true. Otherwise, returns false.

### Example

#### HTML

```html
<div>
	<a class="moo" href="http://mootools.net">MooTools</a>
	<a class="goo" href="http://google.com">
</div>
```

#### JS

```js
var moo = $('a.moo')
moo.matches('a[href*="mootools"]') // true
var goo = $('a.goo')
goo.matches('a[href*="mootools"]') // false
```

## nextSiblings

Returns all next siblings of each element in the collection.

### Syntax

```js
var nextSiblings = element.nextSiblings([expression])
```

### Parameters

1. (*string*, optional) - A CSS Selector to filter the next siblings

### Returns

- elements collection with all next siblings that match the CSS expression, if
any given.

### Examples

#### HTML

```html
<section>
	<em></em>
	<p></p>
	<div></div>
	<p></p>
	<em></em>
	<p></p>
	<strong></strong>
</section>
<section>
	<a></a>
	<div></div>
	<strong></strong>
	<p></p>
	<em></em>
</section>
```

#### JS

```js
var div = $('div') // finds the two div elements
div.nextSiblings() // returns [p, em, p, strong, strong, p, em]
div.nextSiblings('p') // returns [p, p, p]
```

## nextSibling

Exactly like [nextSiblings](#nextSiblings), except it only returns the first
next sibling that matches the expression, if any given.

### Example

With the same HTML as [nextSiblings](#nextSiblings):

```js
var div = $('div') // finds the two div elements
div.nextSibling() // returns [p, strong]
div.nextSibling('p') // returns [p, p]
```

## previousSiblings

Exactly like [nextSiblings](#nextSiblings), except it will return previous
siblings instead of next siblings.

## previousSibling

### Example

With the same HTML as [nextSiblings](#nextSiblings):

```js
var div = $('div') // finds the two div elements
div.previousSiblings() // returns [em, p, a]
div.previousSiblings('p') // returns [p]
```
## children

Like [nextSiblings](#nextSiblings), but returns the direct child elements,
if they match the passed CSS expression, if any given.

### Example

With the same html as [nextsiblings](#nextsiblings):

```js
var div = $('div') // finds the two div elements
div.nextSibling() // returns [p, strong]
div.nextSibling('p') // returns [p, p]
```
## parent

Get the parent node that matches the expression, if any given, for each
element. Syntax is the same as [nextSiblings](#nextSiblings).

### Example

#### HTML

```html
<div>
	<p>
		<strong></strong>
	</p>
</div>
```

```js
var strong = $('strong') // finds the strong element
strong.parent() // the p element
strong.parent('div') // the div element
```

## parents

Like [parent()](#parent), but selects all parent elements, that matches the
expression, if any given.

### Example

With the same html as [parent](#parent):

```js
var strong = $('strong') // finds the strong element
strong.parents() // returns [p, div]
strong.parents('div') // only [div]
```
