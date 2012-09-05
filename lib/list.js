/*
nodes events
*/"use strict"

var $     = require("./nodes"),
    array = require("prime/es5/array").prototype

module.exports = $.implement({

    // straight es5 prototypes (or emulated methods)

    forEach: array.forEach,
    map: array.map,
    filter: function(condition, context){
        return $(array.filter.call(this, function(node){
            if (condition.call(context, $(node))) return true
        }))
    },
    every: array.every,
    some: array.some

})
