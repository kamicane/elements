"use strict";

var $ = require('../lib/delegation')
$.use(require('slick'))
var expect = require('expect.js')

describe('delegation', function(){

    var handler = function(event, li){
        li[0].setAttribute('clicked', '1');
    }

    it('should add a delegation handler', function(){
        $('#container').delegate('click', 'a', function(event, a){
            event.preventDefault()
            a[0].innerHTML = a[0].className
        })
        $(document).delegate('click', 'li', handler)
    })

    it('should remove a handler with undelegate', function(){
        $(document).undelegate('click', 'li', handler)
    })

})
