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

var accessors = {}

array.forEach("type,value,name,href,title,id".split(","), function(name){

    accessors[name] = function(value){
        if (value !== undefined){
            this.forEach(function(node){
                node[name] = value
            })
            return this
        }

        return this[0][name]
    }

})

// booleans

array.forEach("checked,disabled,selected".split(","), function(name){

    accessors[name] = function(value){
        if (value !== undefined){
            this.forEach(function(node){
                node[name] = !!value
            })
            return this
        }

        return !!this[0][name]
    }

})

// className

var classes = function(className){
    var classNames = string.clean(className).split(" "),
        uniques    = {}

    return array.filter(classNames, function(className){
        if (className !== "" && !uniques[className]) return uniques[className] = className
    }).sort()
}

accessors.className = function(className){
    if (className !== undefined){
        this.forEach(function(node){
            node.className = classes(className).join(" ")
        })

        return this
    }

    return classes(this[0].className).join(" ")
}

// attribute

$.implement({

    attribute: function(name, value){
        var accessor = accessors[name]
        if (accessor) return accessor.call(this, value)
        if (value != null) return this.setAttribute(name, value)
        else if (value === null) return this.removeAttribute(name)
        else if (value === undefined) return this.getAttribute(name)
    }

})

$.implement(accessors)

// shortcuts

$.implement({

    check: function(){
        return this.checked(true)
    },

    uncheck: function(){
        return this.checked(false)
    },

    disable: function(){
        return this.disabled(true)
    },

    enable: function(){
        return this.disabled(false)
    },

    select: function(){
        return this.selected(true)
    },

    deselect: function(){
        return this.selected(false)
    }

})

// classNames, has / add / remove Class

$.implement({

    classNames: function(){
        return classes(this[0].className)
    },

    hasClass: function(className){
        return array.indexOf(this.classNames(), className) > -1
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

// toString

$.prototype.toString = function(){
    var tag     = this.tag(),
        id      = this.id(),
        classes = this.classNames()

    var str = tag
    if (id) str += '#' + id
    if (classes.length) str += '.' + classes.join(".")
    return str
}

var textProperty = (document.createElement('div').textContent == null) ? 'innerText': 'textContent'

// tag, html, text

$.implement({

    tag: function(){
        return this[0].tagName.toLowerCase()
    },

    html: function(html){
        if (html != null){
            this.forEach(function(node){
                node.innerHTML = html
            })
            return this
        }
        return this[0].innerHTML
    },

    text: function(text){
        if (text != undefined){
            this.forEach(function(node){
                node[textProperty] = text
            })
            return this
        }
        return this[0][textProperty]
    }

})

module.exports = $
