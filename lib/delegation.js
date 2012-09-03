var $   = require("./events"),
    map = require("prime/collection/map")

$.implement({

    delegate: function(event, selector, handle){
        var handles        = this._handles || (this._handles = {}),
            eventHandle    = handles[event] || (handles[event] = {}),
            selectorHandle = eventHandle[selector] || (eventHandle[selector] = new map)

        var action = function(e){
            var target = $(e.target), match  = target.matches(selector) ? target : target.parent(selector)
            if (match) handle.call(this, e, match)
        }

        selectorHandle.set(handle, action)

        return this.on(event, action)
    },

    undelegate: function(event, selector, handle){
        var handles = this._handles
        if (!handles) return this
        var eventHandle = handles[event]
        if (!eventHandle) return this
        var selectorHandle = eventHandle[selector]
        if (!selectorHandle) return this

        var action = selectorHandle.get(handle)
        if (action){
            this.off(event, action)
            selectorHandle.remove(handle)
        }

        return this
    }

})
