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

var getters = {}, setters = {}, methods = {}

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

    methods[name] = function(value){
        return (value == null) ? getters[name].call(this) : setters[name].call(this, value)
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

    methods[name] = function(value){
        return (value == null) ? getters[name].call(this) : setters[name].call(this, value)
    }

})

$.implement(methods)

$.implement({

    check: function(){
        return this.set("checked", true)
    },

    uncheck: function(){
        return this.set("checked", false)
    },

    disable: function(){
        return this.set("disabled", true)
    },

    enable: function(){
        return this.set("disabled", false)
    },

    select: function(){
        return this.set("selected", true)
    },

    deselect: function(){
        return this.set("selected", false)
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
    return this.classNames().join(" ")
}

setters.className = function(className){
    this.forEach(function(node){
        node.className = classes(className).join(" ")
    })
}

// className, classNames, has / add / remove Class

$.implement({

    className: function(className){
        return (className == null) ? this.get('className') : this.set('className', className)
    },

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
    }

})

// toString

$.prototype.toString = function(){
    var tag     = this.tag(),
        id      = this.get('id'),
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
