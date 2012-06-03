/*
 nodes attributes
 */
"use strict"

var $ = require("./list"),
    string = require("prime/types/string"),
    array = require("prime/es5/array")

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

// common properties

$.implement((function(){

    var properties = {}

    array.forEach("type,value,name,href,title".split(","), function(name){
        properties[name] = function(value){
            if (arguments.length){
                this.forEach(function(node){
                    node[name] = value
                })
                return this
            }
            return this[0][name]

        }
    })

    return properties

})())

// content

var textProp = 'textContent' in document.createElement('div') ? 'textContent' : 'innerText'

$.implement({
    text: function(text){
        if (arguments.length){
            this.forEach(function(node){
                node[textProp] = text
            })
            return this
        }
        var node = this[0]
        return node[textProp]
    },
    html: function(html){
        if (arguments.length){
            this.forEach(function(node){
                node.innerHTML = html
            })
            return this
        }
        var node = this[0]
        return node.innerHTML
    }
})

// booleans

$.implement((function(){

    var booleans = {}

    array.forEach("checked,disabled,selected".split(","), function(name){
        booleans[name] = function(value){
            if (arguments.length){
                this.forEach(function(node){
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
        uniques = {}

    return array.filter(classNames,
        function(className){
            if (className !== "" && !uniques[className]) return uniques[className] = className
        }).sort()
}

$.implement({

    classNames: function(){
        return classes(this[0].className)
    },

    className: function(className){
        if (arguments.length){
            this.forEach(function(node){
                node.className = classes(className).join(" ")
            })
            return this
        }

        return this.classNames().join(" ")
    },

    id: function(id){
        var node = this[0]
        if (arguments.length){
            node.id = id
        }
        else {
            return node.id
        }
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
    var tag = this.tag(),
        id = this.id(),
        classes = this.classNames()

    var str = tag
    if (id) str += '#' + id
    if (classes.length) str += '.' + classes.join(".")
    return str
}

module.exports = $
