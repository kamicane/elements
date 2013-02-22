"use strict";

var casper = require('casper').create();

casper.start('http://localhost:9090/events.html', function(){
    this.echo('Testing Delegation', 'INFO_BAR')
})

casper.waitFor(function(){
    this.echo('wait for the tests in ./events to finish', 'INFO')
    return this.evaluate(function(){
        return document.body.getAttribute('data-ready')
    })
}, function(){}, function(){
    this.echo("body[data-ready] wasn't set to 1", "ERROR")
    this.die()
})

casper.then(function(){
    this.echo('click an elements', 'INFO')
    this.click('#container')
})

casper.then(function(){

    this.echo('check if the added handler for is executed correctly', 'INFO')

    this.test.assertEvalEquals(function(){
        return document.querySelector('#container').innerHTML
    }, "equal", "this should be the same as the element the event is added to")

})

casper.run()
