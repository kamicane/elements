/*
nodes events
*/"use strict"

var $     = require("./nodes"),
    list  = require("prime/es5/array").prototype

module.exports = $.implement({

    // straight es5 prototypes (or emulated methods)

    forEach: list.forEach,
    map: list.map,
    filter: list.filter,
    every: list.every,
    some: list.some

})
