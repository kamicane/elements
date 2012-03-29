/*
nodes
*/"use strict"

var prime = require("prime/prime")

var uniqueIndex = 0
var uniqueID = function(n){
    return (n === global) ? "global" : n.uniqueNumber || (n.uniqueNumber = "n:" + (uniqueIndex++).toString(36))
}

// var key = "n:" + Math.floor(Math.random() * (1295 - 36 + 1) + 36).toString(36) // 2 digits random string

module.exports = function(proto){

    if (!proto) proto = {}

    var instances = {}

    proto.constructor = function(n, context){

        if (n == null) return null
        if (n instanceof $) return n

        var self = new Nodes

        if (n.nodeType || n === global){

            self[self.length++] = n

        } else if (typeof n === "string"){

            n = $.select ? $.select(n, context) : null
            if (n && n.length) for (var i = 0, l = n.length; i < l; i++) self[self.length++] = n[i]

        } else if (n.length){

            var uniques = {}
            for (var i = 0, l = n.length; i < l; i++){
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

        if (self.length === 1){
            var uid = uniqueID(self[0])
            return instances[uid] || (instances[uid] = self)
        }

        return self
    }

    var $ = prime(proto)

    var Nodes = prime({

        inherits: $,

        constructor: function Nodes(){
            this.length = 0
        },

        handle: function(method){
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

    $.select = function(expression, context){
        if (!context) context = document
        return (context.querySelectorAll) ? context.querySelectorAll(expression) : null
    }

    $.use = function(extension){
        for (var i = 0; extension = arguments[i++];) $.implement(prime.create(extension.prototype))
    }

    return $
}
