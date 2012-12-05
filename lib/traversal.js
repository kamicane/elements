/*
traversal
*/"use strict"

var $     = require("./elements"),
    array = require("prime/es5/array"),
    slick = require("slick")

var walk = function(combinator, method){

    return function(expression){
        var parts = slick.parse(expression || "*")

        expression = array.map(parts, function(part){
            return combinator + " " + part
        }).join(", ")

        return this[method](expression)
    }

}

$.implement({

    search: function(expression){
        if (this.length === 1){
            var nodes = slick.search(expression, this[0], new $)
            return nodes.length ? nodes : null
        }

        var buffer = []
        for (var i = 0, node; node = this[i]; i++) buffer.push.apply(buffer, slick.search(expression, node))
        return $(buffer)
    },

    find: function(expression){
        if (this.length === 1) return $(slick.find(expression, this[0]))

        var buffer = []
        for (var i = 0, node; node = this[i]; i++) buffer.push(slick.find(expression, node))
        return $(buffer)
    },

    sort: function(){
        return slick.sort(this)
    },

    matches: function(expression){
        return slick.matches(this[0], expression)
    },

    nextSiblings: walk("~", "search"),

    nextSibling: walk("+", "find"),

    previousSiblings: walk("!~", "search"),

    previousSibling: walk("!+", "find"),

    children: walk(">", "find"),

    firstChild: walk("^", "find"),

    lastChild: walk("!^", "find"),

    parent: function(expression){
        for (var i = 0, node; node = this[i]; i++) while ((node = node.parentNode)){
            if (!expression || slick.matches(node, expression)) return $(node)
        }
        return null
    },

    parents: function(expression){
        var buffer = []
        for (var i = 0, node; node = this[i]; i++) while ((node = node.parentNode)){
            if (!expression || slick.matches(node, expression)) buffer.push(node)
        }
        return $(buffer)
    }

})

module.exports = $
