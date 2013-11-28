"use strict";

require('./runmocha')

var $ = require('../events')
var expect = require('expect.js')

describe('events.js', function(){

    var body, container, captureContainer, form, input, submit

    before(function(){
        body = $(document.documentElement)

        container = $(document.getElementById('container'))
        captureContainer = $(document.getElementById('capture-container'))

        form   = $(document.getElementById('form'))
        input  = $(document.getElementById('input'))
        submit = $(document.getElementById('submit'))
    })


    describe('should implement Emit.on/off/emit', function(){

        it('should allow event subscription', function(done){
            var flag = false
            body.on('w00fz', function(){
                flag = true
                done()
            })
            body.emit('w00fz')
            expect(flag).to.not.be.ok()
        })

        it('should allow event de-subscription', function(){
            var callback = function(){
                throw new Error("this should never be called")
            }
            body.on('Timmeh', callback)
            body.off('Timmeh', callback)
            body.emit('Timmeh')
        })

    })

    // the behavior is mostly tested with eventsCasper.js

    describe("on('click')", function(){
        it('should attach an event listener', function(){
            container.on('click', function(event){
                container[0].innerHTML = (this == container) ? 'equal' : 'wop'
            })
        })
    })

    describe("on('click', handler, useCapture)", function(){
        it('should attach an event listener', function(){
            var windowHandlerCalled = false;

            captureContainer.on('click', function(event){
                captureContainer[0].innerHTML = windowHandlerCalled ? 'element:afterwindow' : 'element'
            })

            // This handler should be called first, because it uses the capture phase.
            // This means that the handler above will be called after, and the innerHTML
            // will finally be 'element', as set in the above handler.
            var handler = function(event){
                captureContainer[0].innerHTML = 'window'
                windowHandlerCalled = true;
            };
            $(window).on('click', handler, true)

            // This should not remove the handler, since the useCapture flag must match
            $(window).off('click', handler)
        })
    })

    describe("on('keydown')", function(){
        it('should attach keydown listener', function(){
            input.on('keydown', function(event){
                container[0].innerHTML = 'keydown'
            })
        })
    })

    describe("on('submit')", function(){
        it('should attach keydown listener', function(){
            form.on('submit', function(event){
                event.preventDefault()
                container[0].innerHTML = 'submit'
            })
        })
    })

})
