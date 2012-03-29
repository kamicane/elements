/*
nodes events
*/"use strict"

var nodes = require("./nodes"),
    list  = require("prime/es5/array").prototype

module.exports = nodes({

    // straight es5 prototypes (or emulated methods)

    forEach: list.forEach,
    map: list.map,
    filter: list.filter,
    every: list.every,
    some: list.some

})
