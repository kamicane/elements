"use strict";

var casper = require('casper').create();

casper.test.on('fail', function(){
    casper.exit(1)
})

casper.start('http://localhost:9090/delegation.html', function(){
    this.echo('Testing Delegation', 'INFO_BAR')
})

casper.waitFor(function(){
    this.echo('wait for the tests in ./delegation to finish', 'INFO')
    return this.evaluate(function(){
        return document.body.getAttribute('data-ready')
    })
}, function(){}, function(){
    this.echo("body[data-ready] wasn't set to 1", "ERROR")
    this.die()
})

casper.then(function(){
    this.echo('click some a elements', 'INFO')
    this.click('a.first')
    this.click('a.second')
})

casper.then(function(){

    this.echo('check if the added handler for is executed correctly', 'INFO')

    this.test.assertEvalEquals(function(){
        return document.querySelector('a.first').innerHTML
    }, "first", "it should have clicked a.first and executed the handler which changed the innerHTML to equal the className")

    this.test.assertEvalEquals(function(){
        return document.querySelector('a.first').getAttribute('data-id')
    }, "container", "this should be the container element object")

    this.test.assertEvalEquals(function(){
        return document.querySelector('a.second').innerHTML
    }, "second", "it should have clicked a.second and executed the handler which changed the innerHTML to equal the className")

    this.test.assertEvalEquals(function(){
        return document.querySelector('a.third').innerHTML
    }, "old", "it shouldn't have clicked a.third, so that should still have the old innerHTML")

    this.test.assertEvalEquals(function(){
        return document.querySelector('a.fourth').innerHTML
    }, "old", "it shouldn't have clicked a.fourth, so that should still have the old innerHTML")

})

casper.then(function(){

    this.echo('check if the handler for li is removed correctly', 'INFO')

    this.test.assertEval(function(){
        var lis = document.querySelectorAll('#container li')
        for (var i = 0; i < lis.length; i++){
            if (lis[i].getAttribute('clicked')) return false
        }
        return true
    }, "it should have removed the handler, so clicking a, which propagates to li, would not execute the removed handler")

})

casper.run()
