/*
elements
*/"use strict"

var prime   = require("prime")

var forEach = require("mout/array/forEach"),
    map     = require("mout/array/map"),
    filter  = require("mout/array/filter"),
    every   = require("mout/array/every"),
    some    = require("mout/array/some")

// uniqueID

var index = 0,
    __dc = document.__counter,
    counter = document.__counter = (__dc ? parseInt(__dc, 36) + 1 : 0).toString(36),
    key = "uid:" + counter

var uniqueID = function(n){
    if (n === window) return "window"
    if (n === document) return "document"
    if (n === document.documentElement) return "html"
    return n[key] || (n[key] = (index++).toString(36))
}

var instances = {}

// elements prime

var $ = prime({constructor: function $(n, context){

    if (n == null) return (this && this.constructor === $) ? new Elements : null

    var self, uid

    if (n.constructor !== Elements){

        self = new Elements

        if (typeof n === "string"){
            if (!self.search) return null
            self[self.length++] = context || document
            return self.search(n)
        }

        if (n.nodeType || n === window){

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

        }

    } else {
      self = n
    }

    if (!self.length) return null

    // when length is 1 always use the same elements instance

    if (self.length === 1){
        uid = uniqueID(self[0])
        return instances[uid] || (instances[uid] = self)
    }

    return self

}})

var Elements = prime({

    inherits: $,

    constructor: function Elements(){
        this.length = 0
    },

    unlink: function(){
        return this.map(function(node){
            delete instances[uniqueID(node)]
            return node
        })
    },

    // methods

    forEach: function(method, context){
        forEach(this, method, context)
        return this
    },

    map: function(method, context){
        return map(this, method, context)
    },

    filter: function(method, context){
        return filter(this, method, context)
    },

    every: function(method, context){
        return every(this, method, context)
    },

    some: function(method, context){
        return some(this, method, context)
    }

})

module.exports = $
