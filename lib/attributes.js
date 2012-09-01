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

    getTag: function(){
        return this[0].tagName.toLowerCase()
    }

})

// toString

$.prototype.toString = function(){
    var tag     = this.getTag(),
        id      = this.get('id'),
        classes = this.getClassNames()

    var str = tag
    if (id) str += '#' + id
    if (classes.length) str += '.' + classes.join(".")
    return str
}

module.exports = $
