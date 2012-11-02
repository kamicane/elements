/*
Slick Integration
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
        // we should probably not do this
        if (this.length === 1){
            var nodes = slick.search(expression, this[0], new this.constructor)
            return nodes.length ? nodes : null
        }

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
