/*
nodes dimensions
*/"use strict"

var $ = require("./list")

/*
size
*/
$.implement({

	getSize: function(){
		var el = this[0]
		return {
			x: el.offsetWidth,
			y: el.offsetHeight
		}
	}
    
})

/*
scroll
*/
$.implement({

	getScrollSize: function(){
		var el = this[0]
		return {
			x: el.scrollWidth,
			y: el.scrollHeight
		}
	},

	getScroll: function(){
		var el = this[0]
		return {
			x: el.scrollLeft,
			y: el.scrollTop
		}
	}
	
})

/*
offset
*/
$.implement({

	getOffsetParent: function(){
	},
	
	getOffsets: function(){
	}

})

/*
position
*/
$.implement({

	getPosition: function(){
	},
	
	getCoordinates: function(){
	}

})

module.exports = $
