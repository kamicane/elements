"use strict";

var $ = require('../delegation')
var expect = require('expect.js')

describe('delegation', function(){

    var handler = function(event, li){
        li[0].setAttribute('clicked', '1');
    }

    it('should add a delegation handler', function(){
        $('#container').delegate('click', 'a', function(event, a){
            event.preventDefault()
            a[0].innerHTML = a[0].className
            a[0].setAttribute('data-id', this[0].id)
        })
        $(document).delegate('click', 'li', handler)
    })

    it('should remove a handler with undelegate', function(){
        $(document).undelegate('click', 'li', handler)
    })

})
