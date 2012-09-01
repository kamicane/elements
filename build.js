/*
MooTools
*/"use strict"

var prime = require("prime")

var type = require("prime/util/type")

var map = require("prime/collection/map")
var list = require("prime/collection/list")
var hash = require("prime/collection/hash")

var array = require("prime/es5/array")
var string = require("prime/types/string")
var number = require("prime/types/number")

var ghost = require("prime/util/ghost")

var mootools = {}

mootools.prime = prime

mootools.type = type

mootools.map = map
mootools.list = list
mootools.hash = hash

mootools.array = array
mootools.string = string
mootools.number = number

mootools._ = ghost

var slick = require("slick")
var nodes = require("./")
nodes.use(slick)

mootools.$ = nodes

global.mootools = mootools