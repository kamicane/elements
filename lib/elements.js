/*
elements
*/"use strict"

var prime = require("prime/prime")

// uniqueID

var uniqueIndex = 0
var uniqueID = function(n){
    return (n === global) ? "global" : n.uniqueNumber || (n.uniqueNumber = "n:" + (uniqueIndex++).toString(36))
}

var instances = {}

// `search` is the selector engine
// `sort` is the elements sorter

var search, sort

// the exposed prime

var $ = prime({constructor: function $(n, context){

    if (n == null) return null
    if (n instanceof elements) return n

    var self = new elements, uid

    if (n.nodeType || n === global){

        self[self.length++] = n

    } else if (typeof n === "string"){

        if (search) search(n, context, self)

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

        if (sort && self.length > 1) sort(self)

    }

    if (!self.length) return null

    // when length is 1 always use the same elements instance

    if (self.length === 1){
        uid = uniqueID(self[0])
        return instances[uid] || (instances[uid] = self)
    }

    return self

}})

// the resulting prime
// this also makes it impossible to override handle (short of constructor hijacking)

var elements = prime({

    inherits: $,

    constructor: function elements(){
        this.length = 0
    },

    handle: function handle(method){
        var buffer = [], length = this.length, res

        if (length === 1){
            res = method.call(this, this[0], 0, buffer)
            if (res != null && res !== false && res !== true) buffer.push(res)
        } else for (var i = 0; i < length; i++){
            var node = this[i]
            res  = method.call(this, node, i, buffer)

            if (res === false || res === true) break
            if (res != null) buffer.push(res)
        }
        return buffer
    },

    remove: function(destroy){
        var res = this.handle(function(node){
            var parent = node.parentNode
            if (parent) parent.removeChild(node)
            if (destroy){
                delete instances[uniqueID(node)]
                return node
            }
        })
        return destroy ? res : this
    }

})

$.use = function(extension){
    $.implement(prime.create(extension.prototype))
    if (extension.search) search = extension.search
    if (extension.sort) sort = extension.sort
    return this
}

module.exports = $
