/*
elements events
*/"use strict"

var $       = require("./elements"),
    prime   = require("prime/prime"),
    Emitter = require("prime/util/emitter")

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

var NodesEmitter = prime({

    inherits: Emitter,

    on: function(event, handle){

        this.handle(function(node){
            NodesEmitter.parent.on.call(this, event, handle)

            var self = this, domListeners = this._domListeners || (this._domListeners = {})
            if (!domListeners[event]) domListeners[event] = addEventListener(node, event, function(e){
                self.emit(event, (e || window.event))
            })
        })

        return this
    },

    off: function(event, handle){

        this.handle(function(node){

            var domListeners = this._domListeners, domEvent, listeners = this._listeners, events

            if (domListeners && (domEvent = domListeners[event]) && listeners && (events = listeners[event])){

                NodesEmitter.parent.off.call(this, event, handle)

                var empty = true, k, l
                for (k in events){
                    empty = false
                    break
                }

                if (empty){
                    removeEventListener(node, event, domEvent)
                    delete domListeners[event]

                    for (l in domListeners) empty = false
                    if (empty) delete this._domListeners
                }

            }
        })

        return this
    },

    emit: function(event){
        var args = arguments
        this.handle(function(node){
            NodesEmitter.parent.emit.apply(this, args)
        })
        return this
    }

})

module.exports = $.use(NodesEmitter)
