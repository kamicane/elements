var $   = require("./events"),
    Map = require("prime/collection/map")

$.implement({

    delegate: function(event, selector, handle){

        this.handle(function(node){

            var delegation = this._delegation || (this._delegation = {}),
                events     = delegation[event] || (delegation[event] = {})
                map        = (events[selector] || (events[selector] = new Map))

            var action = function(e){
                var target = $(e.target),
                    match  = target.matches(selector) ? target : target.parent(selector)
                if (match) handle.call(this, e, match)
            }

            map.set(handle, action)

            this.on(event, action)

        })

        return this

    },

    undelegate: function(event, selector, handle){

        this.handle(function(ndoe){

            var delegation, events, map

            if (!(delegation = this._delegation) || !(events = delegation[event]) || !(map = events[selector])) return this

            var action = map.get(handle)

            if (action){
                this.off(event, action)
                map.remove(handle)

                // if there are no more handles in a given selector, delete it
                if (!map.count()) delete events[selector]
                // var evc = evd = 0, x
                var e1 = e2 = true, x
                for (x in events){
                    e1 = false
                    break
                }
                // if no more selectors in a given event type, delete it
                if (e1) delete delegation[event]
                for (x in delegation){
                    e2 = false
                    break
                }
                // if there are no more delegation events in the element, delete the _delegation object
                if (!e2) delete this._delegation
            }

        })

        return this
    }

})
