Attributes
==========

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

1. html - (*string*) if the `html` argument is set, it will set the html, otherwise it will return the current html.

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

1. text - (*string*) if the `text` argument is set, it will set the text, otherwise it will return the current text.

### Examples

```js
myElement.text("I'm just contemplating the ifs.")
// or
var text = myElement.text()
```
