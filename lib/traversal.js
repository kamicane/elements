/*
nodes traversal
*/"use strict"

var $ = require("./nodes")

var walk = function(node, brother, start){
    node = start ? node[start] : node[brother]
    if (node && node.nodeType == 1) return node
    if (node) while (node = node[brother]) if (node.nodeType == 1) return node
}

var walkAll = function(node, nodes, brother, start){
    node = start ? node[start] : node[brother]
    if (node && node.nodeType == 1) nodes.push(node)
    if (node) while (node = node[brother]) if (node.nodeType == 1) nodes.push(node)
    return nodes
}

$.implement({

    getFirst: function(){
        return $(walk(this[0], 'nextSibling', 'firstChild'))
    },

    getLast: function(){
        return $(walk(this[0], 'previousSibling', 'lastChild'))
    },

    getChildren: function(){
        return $(walkAll(this[0], [], 'nextSibling', 'firstChild'))
    },

    getNext: function(){
        return $(walk(this[0], 'nextSibling'))
    },

    getAllNext: function(){
        return $(walkAll(this[0], [], 'nextSibling'))
    },

    getPrevious: function(){
        return $(walk(this[0], 'previousSibling'))
    },

    getAllPrevious: function(){
        return $(walkAll(this[0], [], 'previousSibling'))
    },

    getSiblings: function(){
        return $(walkAll(this[0], walkAll(this[0], [], 'previousSibling'), 'nextSibling'))
    }

})

module.exports = $
