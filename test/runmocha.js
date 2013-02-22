/*global mocha:true mochaPhantomJS:true */
"use strict";

var ready = function(){
    document.body.setAttribute('data-ready', '1')
}

mocha.setup('bdd')
window.onload = function(){
    if (window.mochaPhantomJS) mochaPhantomJS.run(ready)
    else mocha.run(ready)
}
