/*global phantom:true */
"use strict";

// Run tests with phantomjs <http://phantomjs.org/>
// mostly used for travis.ci

var args = phantom.args;
if (args.length < 1 || args.length > 2){
    console.log("Usage: " + phantom.scriptName + " <URL> <timeout>");
    phantom.exit(1);
}

var page = require('webpage').create();

page.onConsoleMessage = function(msg){
    if (msg.slice(0,8) === 'WARNING:') { return; }
    console.log(msg);
};

page.open(phantom.args[0], function(status){

    if (status !== "success"){
        console.log("Unable to access network");
        phantom.exit();
    } else {

        var timeout = parseInt(args[1] || 60000, 10)
        var start = Date.now();

        var poll = function(){

            if (Date.now() > start + timeout){
                console.log("Tests timed out")
                phantom.exit(124)
                return
            }

            var ready = page.evaluate(function(){

                ready = document.body.getAttribute('data-ready')

                if (!ready) return false

                return {
                    failures: document.querySelector('#stats .failures em').innerHTML,
                    passes:   document.querySelector('#stats .passes em').innerHTML,
                    duration: document.querySelector('#stats .duration em').innerHTML
                }

            })

            if (!ready){
                console.log('polling tests')
                setTimeout(poll, 200)
            } else {
                console.log('failures: ' + ready.failures +
                    ' passes: ' + ready.passes +
                    ' duration: ' + ready.duration)
                phantom.exit(ready.failures > 0 ? 1 : 0)
            }

        }

        setTimeout(poll, 200);
    }

})
