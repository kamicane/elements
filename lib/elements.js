/*
elements
*/"use strict"

var prime = require("prime/prime"),
    array = require("prime/es5/array").prototype

// uniqueID

var uniqueIndex = 0
var uniqueID = function(n){
    return (n === global) ? "global" : n.uniqueNumber || (n.uniqueNumber = "n:" + (uniqueIndex++).toString(36))
}

var instances = {}

// elements prime

var $ = prime({constructor: function $(n, context){

    if (n == null) return (this && this.constructor === $) ? new elements : null
    if (n.constructor === elements) return n

    var self = new elements, uid

    if (typeof n === "string"){
        if (!self.search) return null
        self[self.length++] = context || document
        return self.search(n)
    }

    if (n.nodeType || n === global){

        self[self.length++] = n

    } else if (n.length){

        // this could be an array, or any object with a length attribute,
        // including another instance of elements from another interface.

        var uniques = {}

        for (var i = 0, l = n.length; i < l; i++){ // perform elements flattening
            var nodes = $(n[i], context)
            if (nodes && nodes.length) for (var j = 0, k = nodes.length; j < k; j++){
                var node = nodes[j]
                uid = uniqueID(node)
                if (!uniques[uid]){
                    self[self.length++] = node
                    uniques[uid] = true
                }
            }
        }

        if (self.sort && self.length > 1) self.sort()

    }

    if (!self.length) return null

    // when length is 1 always use the same elements instance

    if (self.length === 1){
        uid = uniqueID(self[0])
        return instances[uid] || (instances[uid] = self)
    }

    return self

}})

var elements = prime({

    inherits: $,

    constructor: function elements(){
        this.length = 0
    },

    unlink: function(){
        return this.map(function(node, i){
            delete instances[uniqueID(node)]
            return node
        })
    },

    // straight es5 prototypes (or emulated methods)

    forEach: array.forEach,
    map: array.map,
    filter: array.filter,
    every: array.every,
    some: array.some

})

module.exports = $
