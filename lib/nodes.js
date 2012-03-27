/*
nodes
*/"use strict"

var prime = require("prime/prime")

var uniqueIndex = 0
var uniqueID = function(n){
    return (n === global) ? "global" : n.uniqueNumber || (n.uniqueNumber = "n:" + (uniqueIndex++).toString(36))
}

var key = "n:" + Math.floor(Math.random() * (1295 - 36 + 1) + 36).toString(36) // 2 digits random string

var instances = {}

// $ is both the ancestor for Node and Nodes, and the exposed prime
//   this way, while one will still be able to implement base methods to $ (handle, ...)
//   they will always be overridden by Nodes / Node

var $ = prime({constructor: function(n, context){

    if (n == null) return null

    // already a $ instance

    if (n.nodeType || n === global){
        var uid = uniqueID(n)
        return instances[uid] || (instances[uid] = new Node(n))
    }

    if (n[key]) return n

    var clean

    /*(nodes.select)?*/
    if (typeof n === "string"){
        n = $.select(n, context)
        clean = true
    }/*:*/

    if (n && n.length){

        // unless n comes from $.search
        // we need to cleanup the nodes
        if (!clean){
            var a = [], u = {}

            for (var i = 0, l = n.length; i < l; i++){
                var instance = $(n[i]), nodes
                if (instance && (nodes = instance[key])){
                    for (var j = 0, k = nodes.length; j < k; j++){
                        var node = nodes[j], uid = uniqueID(node)
                        if (!u[uid]){
                            a.push(node)
                            u[uid] = true
                        }
                    }
                }
            }

            if (!a.length) return null
            n = a

        }

        return (n.length === 1) ? $(n[0]) : new Nodes(n)
    }

    return null

}})

/*(nodes.select)?*/
$.select = function(expression, context){
    if (!context) context = document
    var results, length
    if (context.querySelectorAll && (results = context.querySelectorAll(expression)) && (length = results && results.length)){
        // always return an array of nodes
        var nodes = []
        for (var i = 0; i < length; i++) nodes[i] = results[i]
        return nodes
    }
    return null
}/*:*/

// Node

var Node = prime({

    inherits: $,

    constructor: function Node(node){
        this[key] = [node]
    },

    node: function(i){
        var node = this[key][i || 0]
        return node || null
    },

    nodes: function(begin, end){
        return this[key].slice(begin, end)
    },

    count: function(){
        return this[key].length
    },

    handle: function(method){
        var buffer = [], node = this[key][0]
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

    handle: function(method){
        var buffer = [], nodes = this[key]
        for (var i = 0, l = nodes.length; i < l; i++){
            var node = nodes[i],
                res  = method.call($(node), node, i, buffer)

            if (res === false || res === true) break
            if (res != null) buffer.push(res)
        }
        return buffer
    }

})

module.exports = $
