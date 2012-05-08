"use strict";

var $ = require('../lib/events')
var expect = require('expect.js')

describe('events.js',function(){
    var body=$(document.documentElement);

    describe('should implement Emit.on/off/emit', function(){
        it('should allow event subscription', function(){
            var flag = false;
            body.on('w00fz', function(){
                flag = true;
            })
            body.emit('w00fz');
            expect(flag).to.be(true);
        })

        it('should allow event de-subscription',function(){
            var flag = false;
            var callback = function(){
                flag = true;
            };
            body.on('w00fz', callback)
            body.off('w00fz', callback)
            body.emit('w00fz');
            expect(flag).to.be(false);
        })
    })
})