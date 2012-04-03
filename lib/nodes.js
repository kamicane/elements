/*
nodes
*/"use strict"

var prime = require("prime/prime")

// uniqueID

var uniqueIndex = 0
var uniqueID = function(n){
    return (n === global) ? "global" : n.uniqueNumber || (n.uniqueNumber = "n:" + (uniqueIndex++).toString(36))
}

var instances = {}

// the default selector engine (bland querySelectorAll)

var search = function(expression, context, nodes){
    if (!context) context = document
    var n = (context.querySelectorAll) ? context.querySelectorAll(expression) : null
    if (n && n.length) for (var i = 0, l = n.length; i < l; i++) nodes[nodes.length++] = n[i]
}

// the exposed prime

var $ = prime({constructor: function nodes(n, context){

    if (n == null) return null
    if (n instanceof Nodes) return n

    var self = new Nodes

    if (n.nodeType || n === global){

        self[self.length++] = n

    } else if (typeof n === "string"){

        search(n, context, self)

    } else if (n.length){

        // this could be an array, or any object with a length attribute,
        // including another instance of Nodes from another interface.

        var uniques = {}
        for (var i = 0, l = n.length; i < l; i++){ // perform nodes flattening
            var nodes = $(n[i], context)
            if (nodes && nodes.length) for (var j = 0, k = nodes.length; j < k; j++){
                var node = nodes[j], uid = uniqueID(node)
                if (!uniques[uid]){
                    self[self.length++] = node
                    uniques[uid] = true
                }
            }
        }

    }

    if (!self.length) return null

    // when length is 1 always use the same Nodes instance

    if (self.length === 1){
        var uid = uniqueID(self[0])
        return instances[uid] || (instances[uid] = self)
    }

    return self

}})

// the resulting prime
// this also makes it impossible to override handle (short of constructor hijacking)

var Nodes = prime({

    inherits: $,

    constructor: function Nodes(){
        this.length = 0
    },

    handle: function handle(method){
        var buffer = [], length = this.length

        if (length === 1){
            var res = method.call(this, this[0], 0, buffer)
            if (res != null && res !== false && res !== true) buffer.push(res)
        } else for (var i = 0; i < length; i++){
            var node = this[i],
                res  = method.call($(node), node, i, buffer)

            if (res === false || res === true) break
            if (res != null) buffer.push(res)
        }
        return buffer
    }

})

$.use = function(extension){
    for (var i = 0; extension = arguments[i++];){
        $.implement(prime.create(extension.prototype))
        if (extension.search) search = extension.search
    }
    return this
}

module.exports = $
