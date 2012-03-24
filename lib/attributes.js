/*
nodes attributes
*/"use strict"

var $      = require("./nodes"),
    string = require("prime/types/string"),
    array  = require("prime/es5/array")

// attributes

$.implement({

    setAttribute: function(name, value){
        this.handle(function(node){
            node.setAttribute(name, value)
        })
        return this
    },

    getAttribute: function(name){
        return this.node().getAttribute(name)
    },

    removeAttribute: function(name){
        this.handle(function(node){
            node.removeAttribute(name, value)
        })
        return this
    }

})

// common properties

$.implement((function(){

    var properties = {}

    array.forEach("type,value,name,className,href,title".split(","), function(name){
        properties[name] = function(value){
            if (arguments.length){
                this.handle(function(node){
                    node[name] = value
                })
                return this
            } else return this.node()[name]

        }
    })

    return properties

})())

// booleans

$.implement((function(){

    var booleans = {}

    array.forEach("checked,disabled,selected".split(","), function(name){
        booleans[name] = function(value){
            if (arguments.length){
                this.handle(function(node){
                    node[name] = !!value
                })
                return this
            } else return !!this.node()[name]
        }
    })

    return booleans

})())

// classNames, id, tag

$.implement({

    classNames: function(){
        var classNames = string.clean(this.className()).split(" "),
            uniques    = {}

        return array.filter(classNames, function(className){
            if (!uniques[className]) return uniques[className] = className
        })
    },

    id: function(id){
        var node = this.node()
        if (arguments.length) node.id = id
        else return node.id
        return this
    },

    tag: function(){
        return this.node().tagName.toLowerCase()
    }

})

// has / add / remove Class

var classNameRes = {};
var classNameRe = function(className){
    return classNameRes[className] || (classNameRes[className] = RegExp('(^|\\s)' + string.escape(className) + '(?:\\s|$)'))
}

$.implement({

    hasClass: function(className){
        return classNameRe(className).test(this.node().className)
    },

    addClass: function(className){
        this.handle(function(node){
            if (!this.hasClass(className)) node.className = string.clean(node.className + ' ' + className)
        })
        return this
    },

    removeClass: function(className){
        this.handle(function(node){
            node.className = string.clean(node.className.replace(classNameRe(className), '$1'))
        })
        return this
    }

})


// toString

$.prototype.toString = function(){
    var tag     = this.tag(),
        id      = this.id(),
        classes = this.classNames()

    var str = '<' + tag
    if (id) str += '#' + id
    if (classes.length) str += '.' + classes.join(".")
    return str + '>'
}

module.exports = $