/*
events
*/"use strict"

var $       = require("./index"),
    prime   = require("prime"),
    Emitter = require("prime/emitter")

var html = document.documentElement

var addEventListener = html.addEventListener ? function(node, event, handle){
    node.addEventListener(event, handle, false)
    return handle
} : function(node, event, handle){
    node.attachEvent('on' + event, handle)
    return handle
}

var removeEventListener = html.removeEventListener ? function(node, event, handle){
    node.removeEventListener(event, handle, false)
} : function(node, event, handle){
    node.detachEvent("on" + event, handle)
}

$.implement({

    on: function(event, handle){

        return this.forEach(function(node){
            var self = $(node)

            Emitter.prototype.on.call(self, event, handle)

            var domListeners = self._domListeners || (self._domListeners = {})
            if (!domListeners[event]) domListeners[event] = addEventListener(node, event, function(e){
                self.emit(event, e || window.event, Emitter.EMIT_SYNC)
            })
        })
    },

    off: function(event, handle){

        return this.forEach(function(node){

            var self = $(node)

            var domListeners = self._domListeners, domEvent, listeners = self._listeners, events

            if (domListeners && (domEvent = domListeners[event]) && listeners && (events = listeners[event])){

                Emitter.prototype.off.call(self, event, handle)

                var empty = true, k, l
                for (k in events){
                    empty = false
                    break
                }

                if (empty){
                    removeEventListener(node, event, domEvent)
                    delete domListeners[event]

                    for (l in domListeners){
                        empty = false
                        break
                    }

                    if (empty) delete self._domListeners
                }

            }
        })
    },

    emit: function(event){
        var args = arguments
        return this.forEach(function(node){
            Emitter.prototype.emit.apply($(node), args)
        })
    }

})

module.exports = $
