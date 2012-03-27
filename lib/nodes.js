/*
nodes
*/"use strict"

var prime = require("prime/prime"),
    slice = Array.prototype.slice

var uniqueIndex = 0
var uniqueID = function(node){
    return node.uniqueNumber || (node.uniqueNumber = "nodes:" + (uniqueIndex++).toString(36))
}

// $ is both the ancestor for Node and Nodes, and the exposed prime
// this way, while one will still be able to implement base methods to $ (handle, ...)
// they will always be overridden by Nodes / Node

var instances = {},
    document  = global.document

var $ = prime({constructor: function(nodes, context){

    if (nodes == null) return null

    // avoid creating an uniqueID for the global/window object
    if (nodes === global) return (instances.global) || (instances.global = new Node(global))

    if (nodes instanceof $) return nodes

    /*(nodes.querySelector)?*/
    if (typeof nodes === "string"){
        nodes = $.querySelectorAll(context || document, nodes)
        if (nodes == null) return null
    }/*:*/

    var len = nodes.length
    if (len === 0) return null

    var node = (len == null) ? nodes : (len === 1) ? nodes[0] : null

    if (node){
        var uid = uniqueID(node)
        return instances[uid] || (instances[uid] = new Node(node))
    }

    return new Nodes(nodes)

}})

/*(nodes.querySelector)?*/
$.querySelectorAll = function(context, selector){
    return context.querySelectorAll ? context.querySelectorAll(selector) : null
}

$.querySelector = function(context, selector){
    return context.querySelector ? context.querySelector(selector) : null
}/*:*/

// Node

var key = "n" + Math.round((Math.random() * 1e5)).toString(36)

var Node = prime({

    inherits: $,

    constructor: function Node(node){
        this[key] = node
    },

    node: function(i){
        return i ? null : this[key]
    },

    nodes: function(begin, end){
        return [this[key]].slice(begin, end)
    },

    count: function(){
        return 1
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

    inherits: $,

    constructor: function Nodes(nodes){
        this[key] = nodes
    },

    node: function(i){
        var node = this[key][i == null ? 0 : i]
        return node ? node : null
    },

    nodes: function(begin, end){
        return slice.call(this[key], begin, end)
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

module.exports = $
