/*
nodes attributes
*/"use strict"

var $      = require("./list"),
    string = require("prime/types/string"),
    array  = require("prime/es5/array")

// attributes

$.implement({

    setAttribute: function(name, value){
        this.forEach(function(node){
            node.setAttribute(name, value)
        })
        return this
    },

    getAttribute: function(name){
        var attr = this[0].getAttributeNode(name)
        return (attr && attr.specified) ? attr.value : null
    },

    hasAttribute: function(name){
        var node = this[0]
        if (node.hasAttribute) return node.hasAttribute(name)
        var attr = node.getAttributeNode(name)
        return !!(attr && attr.specified)
    },

    removeAttribute: function(name){
        this.forEach(function(node){
            var attr = node.getAttributeNode(name)
            if (attr) node.removeAttributeNode(attr)
        })
        return this
    }

})

var getters = {}, setters = {}

// common properties

array.forEach("type,value,name,href,title,id".split(","), function(name){
    getters[name] = function(){
        return this[0][name]
    }
    setters[name] = function(value){
        this.forEach(function(node){
            node[name] = value
        })
        return this
    }
})

// booleans

array.forEach("checked,disabled,selected".split(","), function(name){
    getters[name] = function(){
        return !!this[0][name]
    }
    setters[name] = function(value){
        this.forEach(function(node){
            node[name] = !!value
        })
        return this
    }
})

// className, classNames, id, tag

var classes = function(className){
    var classNames = string.clean(className).split(" "),
        uniques    = {}

    return array.filter(classNames, function(className){
        if (className !== "" && !uniques[className]) return uniques[className] = className
    }).sort()
}

getters.className = function(){
    return this.getClassNames().join(" ")
}

setters.className = function(className){
    this.forEach(function(node){
        node.className = classes(className).join(" ")
    })
}

// has / add / remove Class

$.implement({

    getClassNames: function(){
        return classes(this[0].className)
    },

    hasClass: function(className){
        return array.indexOf(this.getClassNames(), className) > -1
    },

    addClass: function(className){
        this.forEach(function(node){
            var nodeClassName = node.className
            var classNames = classes(nodeClassName + " " + className).join(" ")
            if (nodeClassName != classNames) node.className = classNames
        })
        return this
    },

    removeClass: function(className){
        this.forEach(function(node){
            var classNames = classes(node.className)
            array.forEach(classes(className), function(className){
                var index = array.indexOf(classNames, className)
                if (index > -1) classNames.splice(index, 1)
            })
            node.className = classNames.join(" ")
        })
        return this
    }

})

// getter / setter

$.implement({

    set: function(name, value){
        var setter = setters[name]
        if (setter) setter.call(this, value)
        else this.setAttribute(name, value)
        return this
    },

    get: function(name){
        var getter = getters[name]
        return getter ? getter.call(this) : this.getAttribute(name)
    },

    tag: function(){
        return this[0].tagName.toLowerCase()
    }

})

// toString

$.prototype.toString = function(){
    var tag     = this.tag(),
        id      = this.get('id'),
        classes = this.getClassNames()

    var str = tag
    if (id) str += '#' + id
    if (classes.length) str += '.' + classes.join(".")
    return str
}

// html

var setHTML = function(node, html){
    node.innerHTML = html
}

var supportsHTML5Elements = true,
    supportsTableInnerHTML = true,
    supportsTRInnerHTML = true

/*<ltIE9>*/
// technique by jdbarlett - http://jdbartlett.com/innershiv/
var div = document.createElement('div')
div.innerHTML = '<nav></nav>'
supportsHTML5Elements = (div.childNodes.length == 1)
if (!supportsHTML5Elements){
    var tags = 'abbr article aside audio canvas datalist details figcaption '
    tags += 'figure footer header hgroup mark meter nav output progress section'
    tags += 'summary time video'.split(' ')
    var fragment = document.createDocumentFragment(), l = tags.length
    while (l--) fragment.createElement(tags[l])
}
div = null
/*</ltIE9>*/

/*<IE>*/
var table = document.createElement('table')
try {
    table.innerHTML = '<tr><td></td></tr>'
} catch (e){
    supportsTableInnerHTML = false
}
table = null
/*</IE>*/

/*<ltFF4>*/
var tr = document.createElement('tr'), html = '<td></td>'
tr.innerHTML = html
supportsTRInnerHTML = (tr.innerHTML == html)
tr = null
/*</ltFF4>*/

if (!supportsTableInnerHTML || !supportsTRInnerHTML || !supportsHTML5Elements){

    setHTML = (function(set){

        var translations = {
            table: [1, '<table>', '</table>'],
            select: [1, '<select>', '</select>'],
            tbody: [2, '<table><tbody>', '</tbody></table>'],
            tr: [3, '<table><tbody><tr>', '</tr></tbody></table>']
        }

        translations.thead = translations.tfoot = translations.tbody

        return function(node, html){
            var wrap = translations[node.getTag()]
            if (!wrap && !supportsHTML5Elements) wrap = [0, '', '']
            if (!wrap) return set.call(this, node, html)

            var level = wrap[0]
            var wrapper = document.createElement('div')
            var target = wrapper
            if (!supportsHTML5Elements) fragment.appendChild(wrapper)
            wrapper.innerHTML = [wrap[1], html, wrap[2]].flatten().join('')
            while (level--) target = target.firstChild
            this.empty()
            node.appendChild(target.childNodes)
            if (!supportsHTML5Elements) fragment.removeChild(wrapper)
            wrapper = null
        }

    })(setHTML)
}

$.implement({

    html: function(html){
        if (html != null){
            this.forEach(function(node){
                setHTML.call(this, node, html)
            })
            return this
        }
        return this[0].innerHTML
    }

})

// text

var textProperty = (document.createElement('div').textContent == null) ? 'innerText': 'textContent'

$.implement({

    text: function(text){
        if (text != null){
            this.forEach(function(node){
                node[textProperty] = text
            })
            return this
        }
        return this[0][textProperty]
    }

})

module.exports = $
