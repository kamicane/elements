/*
nodes insertion
*/"use strict"

var $ = require("./list")

$.implement({

	getSize: function(){
		var el = this[0]
		return {
			x: el.offsetWidth,
			y: el.offsetHeight
		}
	}
    
})

module.exports = $
