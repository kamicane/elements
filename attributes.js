/*
attributes
*/"use strict"

var $       = require("./index"),
    clean   = require("prime/string/clean"),
    forEach = require("prime/array/forEach"),
    filter  = require("prime/array/filter"),
    indexOf = require("prime/array/indexOf")

// attributes

$.implement({

    setAttribute: function(name, value){
        return this.forEach(function(node){
            node.setAttribute(name, value)
        })
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
        return this.forEach(function(node){
            var attr = node.getAttributeNode(name)
            if (attr) node.removeAttributeNode(attr)
        })
    }

})

var accessors = {}

forEach(["type", "value", "name", "href", "title", "id"], function(name){

    accessors[name] = function(value){
        return (value !== undefined) ? this.forEach(function(node){
            node[name] = value
        }) : this[0][name]
    }

})

// booleans

forEach(["checked", "disabled", "selected"], function(name){

    accessors[name] = function(value){
        return (value !== undefined) ? this.forEach(function(node){
            node[name] = !!value
        }) : !!this[0][name]
    }

})

// className

var classes = function(className){
    var classNames = clean(className).split(" "),
        uniques    = {}

    return filter(classNames, function(className){
        if (className !== "" && !uniques[className]) return uniques[className] = className
    }).sort()
}

accessors.className = function(className){
    return (className !== undefined) ? this.forEach(function(node){
        node.className = classes(className).join(" ")
    }) : classes(this[0].className).join(" ")
}

// attribute

$.implement({

    attribute: function(name, value){
        var accessor = accessors[name]
        if (accessor) return accessor.call(this, value)
        if (value != null) return this.setAttribute(name, value)
        if (value === null) return this.removeAttribute(name)
        if (value === undefined) return this.getAttribute(name)
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
        return indexOf(this.classNames(), className) > -1
    },

    addClass: function(className){
        return this.forEach(function(node){
            var nodeClassName = node.className
            var classNames = classes(nodeClassName + " " + className).join(" ")
            if (nodeClassName != classNames) node.className = classNames
        })
    },

    removeClass: function(className){
        return this.forEach(function(node){
            var classNames = classes(node.className)
            forEach(classes(className), function(className){
                var index = indexOf(classNames, className)
                if (index > -1) classNames.splice(index, 1)
            })
            node.className = classNames.join(" ")
        })
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

var textProperty = (document.createElement('div').textContent == null) ? 'innerText' : 'textContent'

// tag, html, text, data

$.implement({

    tag: function(){
        return this[0].tagName.toLowerCase()
    },

    html: function(html){
        return (html !== undefined) ? this.forEach(function(node){
            node.innerHTML = html
        }) : this[0].innerHTML
    },

    text: function(text){
        return (text !== undefined) ? this.forEach(function(node){
            node[textProperty] = text
        }) : this[0][textProperty]
    },

    data: function(key, value){
        return (value !== undefined) ? this.setAttribute("data-" + key, value) : this.getAttribute('data-' + key)
    }

})

module.exports = $
