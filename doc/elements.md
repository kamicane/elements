package: elements
=================

Elements is the most awesome DOM library you will ever use.

In many examples below you will see `require()` calls, as if elements was used
in nodejs. You can build `elements` for browsers with just the components you
need, using [wrapup](https://github.com/kamicane/wrapup).

You will need node and npm installed in your system. Make sure to configure the
`NODE_PATH` environment variable in your bash profile.

## install wrapup:

```
npm install wrapup -g
```

## install elements in your project folder

```
cd path/to/project
npm install elements
```

## build elements from a custom control module

Create a JavaScript file in the root of your project. We will feed this file to
WrapUp to make your personalized build. Feel free to customize the global
variables as you see fit.

Note: It is strongly advised to organize your code using modules, this way you
can organize your codebase using `require()` calls, in which case you will
direct WrapUp to build from your own modules / entry point module, instead of
the following dummy module.

```js
// assign window.$
global.$ = require('elements')

// extend elements with its modules
require('elements/lib/attributes')
require('elements/lib/events')
require('elements/lib/delegation')
require('elements/lib/insertion')
require('elements/lib/traversal')

// elements utilities
global.ready = require('elements/lib/domready')
global.zen = require('elements/lib/zen')
```

Now we're ready to build elements using WrapUp

```
wrup -r ./file.js -o elements.js
```

This will generate an elements.js in the root of your project.

**Note:** you can skip creating this control module and use WrapUp command-line
parameters instead. Refer to the WrapUp documentation for more information.

## use the built elements.js

An index.html in the root of your project will look like this:

```html
<script type="text/javascript" src="elements.js"></script>
<script type="text/javascript">
    ready(function(){
        var text = "When all else fails, read the manual"
        var element = zen('div.class').text(text).insert(document.body)
    })
</script>
```

module: elements
================

## exports

elements.js exports a function which returns an elements instance.

Notes:

1. an elements instance will never contain duplicate elements
2. if the internal collection is empty, you will get `null` instead of an empty
elements instance.

## parameters

1. (*node* / *collection* / *string* / *array*) - an dom node, a collection of
nodes, a string representing a css selector (requires slick or any other
selector engine) or an array containing any of the above.
2. context - (*node* - optional, defaults to *document*) - when string is used
as the first argument, the context argument will decide from where to run the
dom search.

## syntax

```js
var $ = require('elements')

var elements = $(document.getElementsByTagName('div'))
elements.addClass('test')

var element = $(document.getElementById('myElement'))
element.addClass('test')

var elements = $('li.someClass')

// requires a selector engine
var elements = $(['li.someClass', someDiv, document.getElementsByTagName('a')])

var element = $(document.getElementById('not-existing')) // → null
```

## selector engine integration

```js
var $ = require('elements')
$.implement({
    search: function(expression){
        /*... filtering logic ...*/
    },
    sort: function(){
        /*... sorting logic ...*/
    }
})
```

module: zen
===========

The zen modules generates dom elements using CSS-Style selectors.
Note: zen requires the slick parser.

## exports

exports the function used to generate elements.

## syntax

```js
var zen = require('elements/lib/zen')

// returns elements instance with one div element
zen('div')

// returns elements instance with two a elements
zen('a + a')

// returns an elements instance with an a in a div
zen('div a')

// returns an elements instance with one div element with an id, class, and
// href attributes
zen('div a#link.menu.big[href="test.html"]')
```

module: attributes
==================

This the attributes module implements attribute-related methods to elements.

## exports

elements

## syntax

```js
var $ = require('elements/lib/attributes')
```

same as

```js
var $ = require('elements')
require('elements/lib/attributes')

```

method: attribute
-----------------

Gets or sets an attribute or property.
Returns the value of the attribute If only the name parameter is passed,
otherwise returns the current elements instance.

### syntax

```js
element.attribute(name[, value])
```

### parameters

1. name (*string*) The name of the attribute or property
2. value (*string*, optional) If the `value` parameter is set, this method will
act like a setter and will set the `value` to all elements in the collection. If
this parameter is omitted, it will act as a getter on the first element in the
collection.

### sample

```html
<a href="/test" title="elements">test</a>
```

```js
// as getter
element.attribute('title') // returns 'some title'
// as setter
element.attribute("text", "Here's Johnny!")
element.attribute("title", "The Shining")
```

method: convenience methods
---------------------------

There are several convenience methods available to work with attributes. Used as
a setter, the methods will return the `elements` instance, while used as a
getter, they will return a `string` value:

* `type`
* `value`
* `name`
* `title`
* `id`

Used only as a getter, the following methods will return a `boolean` value:

* `checked`
* `disabled`
* `selected`

The following methods will return the `elements` instance, and perform a
self-explanatory action.

* `check`
* `uncheck`
* `disable`
* `enable`
* `select`
* `deselect`

method: classNames
------------------

Gets a sorted array of all class names of an element.

### syntax

```js
elements.classNames()
```

method: hasClass
----------------

Tests the element to see if it has the passed in className. Returns the boolean
`true`, or `false`.

### sample

```js
var result = myElement.hasClass(className)
```

### parameters

1. className - (*string*) The class name to test.

### sample

```html
<div id="myElement" class="testClass"></div>
```

```js
$(document.getElementById('myElement')).hasClass('testClass'); // returns true
```

method: addClass
----------------

Adds the passed in class to the element, if the element doesn't already have it
. Returns the elements instance.

### syntax

```js
myElement.addClass(className)
```

### parameters

1. className - (*string*) The class name to add.

### sample

```html
<div id="myElement" class="testClass"></div>
```

```js
$(document.getElementById('myElement')).addClass('newClass')
```

```html
<div id="myElement" class="newClass testClass"></div>
```

method: removeClass
-------------------

Works like [addClass](#addClass), but removes the class from the element.
Returns the elements instance.

### syntax

```js
myElement.removeClass(className)
```

### parameters

1. className - (*string*) The class name to remove.

### sample

```html
<div id="myElement" class="testClass newClass"></div>
```

```js
$(document.getElementById('myElement')).removeClass('newClass')
```

```html
<div id="myElement" class="testClass"></div>
```

method: toString
----------------

Creates a simple CSS selector from the element.

### sample

```html
<div id="myElement" class="otherClass testClass"></div>
```

```js
$(document.getElementById('myElement')).toString() // div#myElement.otherClass.testClass
```

method: tag
-----------

Gets the tag name of an element as a lower case string.

### syntax

```js
myElement.tag() // div
```

method: html
------------

Set or get HTML of an element.

### syntax

```js
myElement.html([html])
```

### parameters

1. html - (*string*) If the `html` parameter is set, it will set the HTML in the
element, otherwise it will return the current HTML in the element. Returns the
`elements` instance If the `html` parameter is set, otherwise a string
containing the HTML in the element.

### sample

```js
myElement.html('<p>new html</p>')
// or
var html = myElement.html() // returns: <p>new html</p>
```

method: text
------------

Set or get text of on element.

### Syntax

```js
myElement.text([text])
```

### Parameters

1. text - (*string*) If the `text` parameter is set, it will set the text in the
element, otherwise it will return the current text in the element.

### Examples

```js
myElement.text("I'm just contemplating the ifs.")
// or
var text = myElement.text()
```

### Returns

If the `text` parameter is set:

- (*elements*) The `elements` instance.

If the `text` parameter is not set:

- (*string*) A string containing the text in the element.

domready
========

Contains the DOMReady event, which executes when the DOM is loaded.

Code that attempts to access DOM elements need to be placed within the
'domready' event to ensure that DOM elements exist when the code is executed.

### Example

```js
var domready = require('elements/lib/domready')
domready(function(){
	alert('The DOM is ready!')
})
```

events
======

Events lets you attach event listeners to DOM elements on the page. Those event
listeners will be executed once the user clicks something or something else
happens.

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

### Example

```js
myElement.on('click', function(event){
    alert('clicked')
})
```

### Returns

- (*elements*) The `elements` instance.

## off

Works as [on](#on), but instead removes the specified event listener.

### Syntax

```js
myElement.off(type, fn)
```

### Parameters

1. type - (*string*) The event name.
2. fn   - (*function*) The function to remove.

Examples

```js
var destroy = function(){
	alert('Boom: ' + this.id)
} // this refers to the element.

myElement.on('click', destroy)

//later...
myElement.off('click', destroy)
```

### Returns

- (*elements*) The `elements` instance.

### Note

- To remove a listener, it is important to pass the same function to the `fn`
parameter as the one that was previously attached. In the example the reference
to the function is stored in the `destroy` variable.

## emit

Executes all events attached for the specified type on an element.

### Syntax

```js
myElement.emit(type[, args...])
```

### Parameters

1. type - (*string*) The event name.
2. args... - (*mixed*, optional) Zero or multiple extra parameters that will be
passed to the event listeners

### Examples

```js
var add = function(a, b){
	alert(a + b)
}
element.on('click', add)
element.emit('click', 4, 2) // alerts 6
```

### Returns

- (*elements*) The `elements` instance.

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
2. selector - (*string*) A CSS Selector the element the event is fired on should
match (see [matches](#matches))
3. fn - (*function*) The function to execute.

### Returns

- (*elements*) The `elements` instance.

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

$('ul').delegate('click', 'a', function(event, a){ // a is the matching element
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
2. selector - (*string*) A CSS Selector the element the event is fired on should
match (see [matches](#matches)).
3. fn   - (*function*) The function to remove.

### Returns

- (*elements*) The `elements` instance.

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

### Note

- To remove a listener, it is important to pass the same function to the `fn`
parameter as the one that was previously attached. In the example the reference
to the function is stored in the `click` variable.

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

### Syntax
```js
parent.appendChild(child)
```

### Parameters

1. child - (*elements*) another elements instance.

### Returns

- (*elements*) The `elements` instance.

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

- [MDN appendChild](https://developer.mozilla.org/en-US/docs/DOM/Node.appendChild)

## insertBefore

Wrapper method of the native `insertBefore` method. It will insert an element
before another element.

### Syntax
```js
parent.insertBeore(child, ref)
```

### Parameters

1. child - (*elements*) The child `elements` instance.
2. ref - (*elements*) The reference element. `child` will be inserted before
`ref`.

### Returns

- (*elements*) The `elements` instance.

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

Wrapper method of the native `removeChild` method. It will remove a child
element from the parent element.

### Syntax

```js
parent.removeChild(child)
```

1. child - (*elements*) An `elements` instance, which is a child of the parent
element.

### Returns

- (*elements*) The `elements` instance.

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

Wrapper method of the native `replaceChild` method. It will replace one element
with another.

### Syntax

1. child - (*elements*) The child `elements` instance.
2. ref - (*elements*) The reference element. `ref` will be replaced with
`child`.

### Returns

- (*elements*) The `elements` instance.

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

### Returns

- (*elements*) The `elements` instance.

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

### Returns

- (*elements*) The `elements` instance

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

### Returns

- (*elements*) The `elements` instance.

### Example

#### JS

```js
myFirstElement.bottom(mySecondElement)
```

#### Resulting HTML

```html
<div id="mySecondElement">
	<div id="myThirdElement"></div>
	<div id="myFirstElement"></div>
</div>
```

## top

Injects an element at the top of another element.

### Returns

- (*elements*) The `elements` instance.

### Example

#### JS

```js
myFirstElement.top(mySecondElement)
```

#### Resulting HTML

```html
<div id="mySecondElement">
	<div id="myFirstElement"></div>
	<div id="myThirdElement"></div>
</div>
```

## insert

`insert` is an alias of [bottom](#bottom)

### Returns

- (*elements*) The `elements` instance.

## replace

Replace another element with this element.

### Returns

- (*elements*) The `elements` instance.

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
index of the element in the elements collection.
2. bind - (*object*, optional) Object to use as `this` when executing `fn`.

### Example

```js
var elements = $(document.getElementsByTagName('a'))
elements.forEach(function(element, index){
	return $(element).text('element: ' + index)
})
```

### See also

- [handle()](#handle)
- [MDN Array forEach](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach)

## map

Creates a new array with the results of calling a provided function on every
element in the elements collection.

### Syntax

```js
var mapped = elements.map(fn[, bind])
```

### Parameters

1. fn - (*function*) Function that produces an element of the new Array from an
element of the current one. `fn` is called like `fn(element, index)` where
`element` is the native element, and `index` is the index of the element in the
elements collection.
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

Returns true if at least one element in the array satisfies the provided testing
function.

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

- (*boolean*) - If some element in the collection satisfies the provided testing
function, returns true. Otherwise, returns false.

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

1. expression - (*string*) A CSS selector.

### Return

- (*elements*) An `elements` instance with the new elements.

### Example

```js
// slick is included by traversal, we can pass selectors to $()
// select all p elements
var elements = $('p')
// select all a elements in the previously found p elements
elements.search('a')
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

1. expression - (*string*) A CSS selector.

### Returns

- (*elements*) An `elements` instance with the new elements.

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
// We can pass selectors to $() because slick is included by traversal

// select both ul elements
var elements = $('ul')
// select the first element for each list
var cities = elements.find('li')
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

- An `elements` instance with all next siblings that match the CSS expression,
if any is given.

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
next sibling that matches the expression, if any is given.

### Returns

- An `elements` instance with the first next sibling that matches the CSS
expression, if any is given.

### Example

With the same HTML as [nextSiblings](#nextSiblings):

```js
var div = $('div') // finds the two div elements
div.nextSibling() // returns [p, strong]
div.nextSibling('p') // returns [p, p]
```

## previousSiblings

Exactly like [nextSiblings](#nextSiblings), except it will return all previous
siblings instead of next siblings, if any is given.

## previousSibling

Exactly like [nextSibling](#nextSibling), except it will return one previous
sibling instead of one next sibling, if any is given.

### Example

With the same HTML as [nextSibling](#nextSibling):

```js
var div = $('div') // finds the two div elements
div.previousSiblings() // returns [em, p, a]
div.previousSiblings('p') // returns [p]
```
## children

Like [nextSiblings](#nextSiblings), but returns the direct child elements, if
they match the passed CSS expression, if any is given.

### Returns

- An `elements` instance with the the direct child elements that matches the CSS
expression, if any is given.

### Example

With the same html as [nextsiblings](#nextsiblings):

```js
var div = $('div') // finds the two div elements
div.nextSibling() // returns [p, strong]
div.nextSibling('p') // returns [p, p]
```
## parent

Get the parent node that matches the expression, if any given, for each element.
Syntax is the same as [nextSiblings](#nextSiblings).

### Returns

- An `elements` instance with one parent element that matches the CSS
expression, for each element, if any is given.

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

### Returns

- An `elements` instance with the parent elements that matches the CSS
expression, for each element, if any is given.

### Example

With the same html as [parent](#parent):

```js
var strong = $('strong') // finds the strong element
strong.parents() // returns [p, div]
strong.parents('div') // only [div]
```
