/*
nodes attributes
*/"use strict"

var $      = require("./nodes"),
    string = require("prime/types/string"),
    array  = require("prime/es5/array")

// attributes

$.implement({

    setAttribute: function(name, value){
        array.forEach(this, function(node){
            node.setAttribute(name, value)
        })
        return this
    },

    getAttribute: function(name){
        return this[0].getAttribute(name)
    },

    removeAttribute: function(name){
        array.forEach(this, function(node){
            node.removeAttribute(name, value)
        })
        return this
    }

})

// common properties

$.implement((function(){

    var properties = {}

    array.forEach("type,value,name,href,title".split(","), function(name){
        properties[name] = function(value){
            if (arguments.length){
                array.forEach(this, function(node){
                    node[name] = value
                })
                return this
            }
            return this[0][name]

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
                array.forEach(this, function(node){
                    node[name] = !!value
                })
                return this
            }
            return !!this[0][name]
        }
    })

    return booleans

})())

// className, classNames, id, tag

var classes = function(className){
    var classNames = string.clean(className).split(" "),
        uniques    = {}

    return array.filter(classNames, function(className){
        if (className !== "" && !uniques[className]) return uniques[className] = className
    }).sort()
}

$.implement({

    classNames: function(){
        return classes(this[0].className)
    },

    className: function(className){
        if (arguments.length){
            array.forEach(this, function(node){
                node.className = classes(className).join(" ")
            })
            return this
        }

        return this.classNames().join(" ")
    },

    id: function(id){
        var node = this[0]
        if (arguments.length) node.id = id
        else return node.id
        return this
    },

    tag: function(){
        return this[0].tagName.toLowerCase()
    }

})

// has / add / remove Class

$.implement({

    hasClass: function(className){
        return array.indexOf(this.classNames(), className) > -1
    },

    addClass: function(className){
        array.forEach(this, function(node){
            var nodeClassName = node.className
            var classNames = classes(nodeClassName + " " + className).sort().join(" ")
            if (nodeClassName != classNames) node.className = classNames
        })
        return this
    },

    removeClass: function(className){
        array.forEach(this, function(node){
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

module.exports = $
