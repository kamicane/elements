"use strict";

var casper = require('casper').create()

var url = casper.cli.args[0]

casper.start(url, function(){
    this.echo('opened: ' + url, 'INFO_BAR')
})

casper.waitFor(function(){
    return this.evaluate(function(){
        return document.body.getAttribute('data-ready')
    })
}, function(){}, function(){
    this.echo("body[data-ready] wasn't set to 1", "ERROR")
    this.die()
})

casper.then(function(){
    var result = casper.evaluate(function(){
        var fails = [].map.call(document.querySelectorAll('.fail h2'), function(el){
            return {
                title: el.innerHTML,
                trace: el.nextSibling.innerHTML
            }
        })
        return {
            fails: fails,
            failures: parseInt(document.querySelector('#stats .failures em').innerHTML, 10),
            passes:   parseInt(document.querySelector('#stats .passes em').innerHTML, 10),
            duration: document.querySelector('#stats .duration em').innerHTML
        }
    })

    this.test.assertNotEquals(result.passes, 0, 'should pass some tests')
    this.test.assertEquals(result.failures, 0, 'should not fail any tests')

    this.echo(result.passes + " passed, " + result.failures + " failed in " +
        result.duration, "INFO_BAR")

    if (result.failures){
        this.echo("following tests failed", "ERROR")
        result.fails.forEach(function(failure){
            casper.echo(failure.title, "ERROR")
            casper.echo(failure.trace, "TRACE")
        })
    }

})

casper.run(function(){
    this.test.renderResults(true, this.test.testResults.failed ? 1 : 0)
})
