"use strict";

require('./runmocha')

var $ = require('../events')
var expect = require('expect.js')

describe('events.js', function(){

    var body, container, form, input, submit

    before(function(){
        body = $(document.documentElement)

        container = $(document.getElementById('container'))

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
            body.on('w00fz', callback)
            body.off('w00fz', callback)
            body.emit('w00fz')
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
