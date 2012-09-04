/*
domready
*/"use strict"

var $ = require("./events")

var readystatechange = 'onreadystatechange' in document,
    shouldPoll       = false,
    loaded           = false,
    readys           = [],
    checks           = [],
    ready            = null,
    timer            = null,
    test             = document.createElement('div'),
    doc              = $(document),
    win              = $(window)

var domready = function(){

    if (timer) timer = clearTimeout(timer)

    if (!loaded){

        if (readystatechange) doc.off('readystatechange', check)
        doc.off('DOMContentLoaded', domready)
        win.off('load', domready)

        loaded = true

        for (var i = 0; ready = readys[i++];) ready()
    }

    return loaded

}

var check = function(){
    for (var i = checks.length; i--;) if (checks[i]()) return domready()
    return false
}

var poll = function(){
    clearTimeout(timer)
    if (!check()) timer = setTimeout(poll, 1e3 / 60)
}

if (document.readyState){ // use readyState if available

    var complete = function(){
        return !!(/loaded|complete/).test(document.readyState)
    }

    checks.push(complete)

    if (!complete()){ // unless dom is already loaded
        if (readystatechange) doc.on('readystatechange', check) // onreadystatechange event
        else shouldPoll = true //or poll readyState check
    } else { // dom is already loaded
        domready()
    }

}

if (test.doScroll){ // also use doScroll if available (doscroll comes before readyState "complete")

    // LEGAL DEPT:
    // doScroll technique discovered by, owned by, and copyrighted to Diego Perini http://javascript.nwbox.com/IEContentLoaded/

    // testElement.doScroll() throws when the DOM is not ready, only in the top window

    var scrolls = function(){
        try {
            test.doScroll()
            return true
        } catch (e){}
        return false
    }

    // If doScroll works already, it can't be used to determine domready
    // e.g. in an iframe

    if (!scrolls()){
        checks.push(scrolls)
        shouldPoll = true
    }

}

if (shouldPoll) poll()

// make sure that domready fires before load, also if not onreadystatechange and doScroll and DOMContentLoaded load will fire
doc.on('DOMContentLoaded', domready)
win.on('load', domready)

module.exports = function(ready){
    (loaded) ? ready() : readys.push(ready)
    return null
}
