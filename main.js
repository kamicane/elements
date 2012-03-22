// Nodes wrapper

var prime = require("prime/prime"),
    array = require("prime/es5/array")

// Node

var instances = {}

var Node = function(node){

    this.node = function(i){
        return i ? null : node
    }

    this.nodes = function(s, e){
        return [node].slice(s, e)
    }

    this.count = function(){
        return 1
    }

    this.handle = function(ƒ){
        var buffer = []
        var res = ƒ.call(this, node, 0, buffer)
        if (res != null && res !== false && res !== true) buffer.push(res)
        return buffer
    }

}

// Nodes

var Nodes = function(nodes){

    this.node = function(i){
        var node = nodes[i == null ? 0 : i]
        return node ? node : null
    }

    this.nodes = function(s, e){
        return array.slice(nodes, s, e)
    }

    this.count = function(){
        return nodes.length
    }

    this.handle = function(ƒ){
        var buffer = []
        for (var i = 0, l = nodes.length; i < l; i++){
            var node = nodes[i],
                res = ƒ.call(new Node(node), node, i, buffer)
            if (res === false || res === true) break
            if (res != null) buffer.push(res)
        }
        return buffer
    }

}

var $ = prime({constructor: function(nodes){
    if (nodes == null) return null
    if (nodes instanceof Nodes || nodes instanceof Node) return nodes

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

Nodes.prototype = Node.prototype = $.prototype

$.querySelectorAll = function(context, selector){
    return context.querySelectorAll ? context.querySelectorAll(selector) : null
}

$.querySelector = function(context, selector){
    return context.querySelector ? context.querySelector(selector) : null
}

module.exports = $
