/*
nodes dimensions
*/"use strict"


var $ = require("./list")


/*
private methods
*/
var computedStyle = function(element, property){
	var computed

	if (element.currentStyle){
		computed = element.currentStyle(property)
	} else {
		computed = window.getComputedStyle(element, null).getPropertyValue(property)
	}

	return computed
}


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

	scrollTo: function(x, y){
		this.forEach(function(el){
			el.scrollLeft = x
			el.scrollTop = y
		})
		return this
	},

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

	getOffsets: function(){
		var el = this[0],
			x = 0,
			y = 0
		while (el && el.offsetLeft && el.offsetTop){
			x += el.offsetLeft - el.scrollLeft
			y += el.offsetTop - el.scrollTop
			el = el.offsetParent
		}
		return {
			x: x,
			y: y
		}
	}

})


/*
position
*/
$.implement({

	getPosition: function(){
		var el = this[0],
			offset = this.getOffsets(),
			scroll = this.getScroll()
		return {
			x: offset.x - scroll.x,
			y: offset.y - scroll.y
		}
	},

	getCoordinates: function(){
		var position = this.getPosition(),
			size = this.getSize()
		var coords = {
			left: position.x,
			top: position.y,
			width: size.x,
			height: size.y
		}
		coords.right = coords.left + coords.width
		coords.bottom = coords.top + coords.height
		return coords
	}

})


module.exports = $
