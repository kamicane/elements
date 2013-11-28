"use strict";

var casper = require('casper').create();

casper.test.on('fail', function(){
    casper.exit(1)
})

casper.start('http://localhost:9090/events.html', function(){
    this.echo('Testing Events', 'INFO_BAR')
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

function testContainer(expect, msg){
    return function(){
        casper.test.assertEvalEquals(function(){
            return document.querySelector('#container').innerHTML
        }, expect, msg)
    }
}
function testCaptureContainer(expect, msg){
    return function(){
        casper.test.assertEvalEquals(function(){
            return document.querySelector('#capture-container').innerHTML
        }, expect, msg)
    }
}

// click

casper.then(function(){
    this.echo('click an elements', 'INFO')
    this.click('#container')
})

casper.then(
    testContainer("equal", "this should be the same as the element the event is added to")
)

casper.then(function(){
    this.echo('click an elements (capture)', 'INFO')
    this.click('#capture-container')
})

casper.then(
    testCaptureContainer("element:afterwindow", "the handler on the element should be triggered after the one on window (when using capture)")
)

// keydown

casper.then(function(){
    this.echo('send keys an elements', 'INFO')
    this.sendKeys('#input', "it's a me!")
})

casper.then(
    testContainer("keydown", "it should have executed the keydown listener")
)

// submit

casper.then(function(){
    this.echo('submit form', 'INFO')
    this.click('#submit')
})

casper.then(
    testContainer("submit", "it should have executed the submit listener")
)

casper.run()
