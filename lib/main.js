/*
require everything and export
*/"use strict"

var $ = require("./nodes")()

var attributes = require("./attributes"),
    insertion  = require("./insertion"),
    events     = require("./events"),
    list       = require("./list"),
    domready   = require("./domready")

$.use(attributes, insertion, events, list)
$.ready = domready

module.exports = $
