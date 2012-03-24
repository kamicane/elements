/*
nodes insertion
*/"use strict"

var $ = require("./nodes")

// base insertion

$.implement({

    appendChild: function(child){
        this.node().appendChild($(child).node())
        return this
    },

    insertBefore: function(child){
        this.node().insertBefore($(child).node())
        return this
    },

    removeChild: function(child){
        this.node().removeChild($(child).node())
        return this
    },

    replaceChild: function(child){
        this.node().replaceChild($(child).node())
        return this
    }

})

// before, after, bottom, top

$.implement({

    before: function(element){
        element = $(element).node()
        var parent = element.parentNode
        if (parent) this.handle(function(node){
            parent.insertBefore(node, element)
        })
        return this
    },

    after: function(element){
        element = $(element).node()
        var parent = element.parentNode
        if (parent) this.handle(function(node){
            parent.insertBefore(node, element.nextSibling)
        })
        return this
    },

    bottom: function(element){
        element = $(element).node()
        this.handle(function(node){
            element.appendChild(node)
        })
        return this
    },

    top: function(element){
        element = $(element).node()
        this.handle(function(node){
            element.insertBefore(node, element.firstChild)
        })
        return this
    }

})

// insert, remove, replace

$.implement({

    insert: $.prototype.bottom,

    remove: function(){
        this.handle(function(node){
            var parent = node.parentNode
            if (parent) parent.removeChild(node)
        })
        return this
    },

    replace: function(element){
        element = $(element).node()
        element.parentNode.replaceChild(this.node(), element)
        return this
    }

})

module.exports = $
