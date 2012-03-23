// Nodes wrapper

var prime = require("prime/prime"),
    array = require("prime/es5/array")

// Node

var instances = {}

var key = "n" + Math.round((Math.random() * 1e5)).toString(36)

var Node = prime({

    constructor: function Node(node){
        this[key] = node
    },

    node: function(i){
        return i ? null : this[key]
    },

    nodes: function(begin, end){
        return [this[key]].slice(begin, end)
    },

    handle: function(method){
        var buffer = [], node = this[key]
        var res = method.call(this, node, 0, buffer)
        if (res != null && res !== false && res !== true) buffer.push(res)
        return buffer
    }

})

// Nodes

var Nodes = prime({

    inherits: Node,

    constructor: function Nodes(nodes){
        this[key] = nodes
    },

    node: function(i){
        var node = this[key][i == null ? 0 : i]
        return node ? node : null
    },

    nodes: function(begin, end){
        return array.slice(this[key], begin, end)
    },

    count: function(){
        return this[key].length
    },

    handle: function(method){
        var buffer = [], nodes = this[key]
        for (var i = 0, l = nodes.length; i < l; i++){
            var node = nodes[i],
                res = method.call(new Node(node), node, i, buffer)
            if (res === false || res === true) break
            if (res != null) buffer.push(res)
        }
        return buffer
    }

})

var $ = prime({constructor: function(nodes){
    if (nodes == null) return null
    if (nodes instanceof Node) return nodes

    if (typeof nodes === "string"){
        nodes = $.querySelectorAll(document, nodes)
        if (nodes == null) return null
    }

    var len = nodes.length

    if (len == null) return new Node(nodes)
    if (len === 1) return new Node(nodes[0])
    else if (len === 0) return null
    return new Nodes(nodes)
}})

$.prototype = Node.prototype

$.querySelectorAll = function(context, selector){
    return context.querySelectorAll ? context.querySelectorAll(selector) : null
}

$.querySelector = function(context, selector){
    return context.querySelector ? context.querySelector(selector) : null
}

module.exports = $
