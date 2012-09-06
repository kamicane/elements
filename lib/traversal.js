/*
Slick Integration
*/"use strict"

var $     = require("./elements"),
    array = require("prime/es5/array"),
    slick = require("slick")

$.use(slick)

var walk = function(combinator, method){

    return function(expression){
        var parts = slick.parse(expression || "*")

        expression = array.map(parts, function(part){
            return combinator + " " + part
        }).join(", ")

        if (this.length === 1) return $(expression, this[0])

        if (method === "search") return $(this.handle(function(node, i, buffer){
            buffer.push.apply(buffer, slick.search(expression, node))
        }))

        if (method === "find") return $(this.handle(function(node){
            return slick.find(expression, node)
        }))
    }

}

$.implement({

    search: function(expression){
        if (this.length === 1) return $(expression, this[0])

        return $(this.handle(function(node, i, buffer){
            buffer.push.apply(buffer, slick.search(expression, node))
        }))
    },

    find: function(expression){
        if (this.length === 1) return $(slick.find(expression, this[0]))

        return $(this.handle(function(node, i, buffer){
            buffer.push(slick.find(expression, node))
        }))
    },

    matches: function(expression){
        return slick.matches(this[0], expression)
    },

    nextSiblings: walk("~", "search"),

    nextSibling: walk("+", "find"),

    previousSiblings: walk("!~", "search"),

    previousSibling: walk("!+", "find"),

    children: walk(">", "find"),

    parent: function(expression){
        return $(this.handle(function(node, i, buffer){
            while ((node = node.parentNode)){
                if (!expression || slick.matches(node, expression)) return !buffer.push(node)
            }
        }))
    },

    parents: function(expression){
        return $(this.handle(function(node, i, buffer){
            while ((node = node.parentNode)){
                if (!expression || slick.matches(node, expression)) buffer.push(node)
            }
        }))
    }

})

module.exports = $
