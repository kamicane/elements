/*
nodes insertion
*/"use strict"

var $ = require("./list")

// base insertion

$.implement({

    appendChild: function(child){
        this[0].appendChild($(child)[0])
        return this
    },

    insertBefore: function(child, ref){
        this[0].insertBefore($(child)[0], $(ref)[0])
        return this
    },

    removeChild: function(child){
        this[0].removeChild($(child)[0])
        return this
    },

    replaceChild: function(child, ref){
        this[0].replaceChild($(child)[0], $(ref)[0])
        return this
    }

})

// before, after, bottom, top

$.implement({

    before: function(element){
        element = $(element)[0]
        var parent = element.parentNode
        if (parent) this.forEach(function(node){
            parent.insertBefore(node, element)
        })
        return this
    },

    after: function(element){
        element = $(element)[0]
        var parent = element.parentNode
        if (parent) this.forEach(function(node){
            parent.insertBefore(node, element.nextSibling)
        })
        return this
    },

    bottom: function(element){
        element = $(element)[0]
        this.forEach(function(node){
            element.appendChild(node)
        })
        return this
    },

    top: function(element){
        element = $(element)[0]
        this.forEach(function(node){
            element.insertBefore(node, element.firstChild)
        })
        return this
    }

})

// insert, remove, replace

$.implement({

    insert: $.prototype.bottom,

    remove: function(){
        this.forEach(function(node){
            var parent = node.parentNode
            if (parent) parent.removeChild(node)
        })
        return this
    },

    replace: function(element){
        element = $(element)[0]
        element.parentNode.replaceChild(this[0], element)
        return this
    }

})

module.exports = $
