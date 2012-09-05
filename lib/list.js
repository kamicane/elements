/*
nodes events
*/"use strict"

var $     = require("./nodes"),
    array = require("prime/es5/array").prototype

module.exports = $.implement({

    // straight es5 prototypes (or emulated methods)

    forEach: array.forEach,
    map: array.map,
    filter: array.filter,
    every: array.every,
    some: array.some

})
