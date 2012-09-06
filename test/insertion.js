"use strict";

var $ = require('../lib/insertion')
var expect = require('expect.js')

describe('insertion.js', function(){

    // prepare the environment
    beforeEach(function(){
        var body = document.getElementsByTagName('body')[0]
        var container = document.getElementById('container')
        if (!container){
            container = document.createElement('div')
            container.id = 'container'
            container.style.display = 'none'
            container.style.position = 'absolute'
            container.top = 0
            container.left = 0
        }
        body.appendChild(container)
        container.innerHTML = ['',
            '<ul>',
            '<li class="first">1</li>',
            '<li title="title">2</li>',
            '<li id="third">3</li>',
            '</ul>',
            '<input id="moo" name="library" type="text" value="mootools" />',
            '<a id="link" href="#library">library</a>',
            '<select id="mooselect">',
            '<option>1</option>',
            '<option selected="selected">2</option>',
            '</select>'
        ].join('')
    })

    function $E(tag, id){
        var e = document.createElement(tag)
        e.id = id
        return $(e)
    }

    describe('implements standard w3c base methods', function(){

        it('implements appendChild', function(){
            var ul = $(document.getElementById('container').firstChild)
            ul.appendChild($E('li', 'insertedLI'))
            var found = false
            var index = 0
            $(document.getElementById('container').firstChild.childNodes).handle(function(element, i){
                if (element.id == 'insertedLI'){
                    found = true
                    index = i
                }
            })
            expect(found).to.be.ok()
            expect(index).to.be(3)
        })

        it('implements insertBefore', function(){
            var ul = $(document.getElementById('container').firstChild),
                ins = $E('li', 'insertedLI')

            ul.appendChild(ins)

            var found = false,
                index = 0,
                bef = $E('li', 'beforeLI')

            ul.insertBefore(bef, ins)

            $(document.getElementById('container').firstChild.childNodes).handle(function(element, i){
                if (element.id == 'beforeLI'){
                    found = true
                    index = i
                }
            })

            expect(found).to.be.ok()
            expect(index).to.be(3)
        })

        it('implements removeChild', function(){
            var ul = $(document.getElementById('container').firstChild)
            var lis = $(document.getElementById('container').firstChild.childNodes)
            expect(lis.length).to.be(3)
            ul.removeChild(lis[0])
            lis = $(document.getElementById('container').firstChild.childNodes)
            expect(lis.length).to.be(2)
        })

        it('implements replaceChild', function(){
            var ul = $(document.getElementById('container').firstChild)
            var lis = $(document.getElementById('container').firstChild.childNodes)
            ul.replaceChild($E('li', 'replaced'), lis[0])
            lis = $(document.getElementById('container').firstChild.childNodes)

            expect(lis[0].id).to.be('replaced')
        })

    })

    describe('implements before, after, bottom, top', function(){

        describe('before', function(){

            it('should insert the current elements before the one passed', function(){
                var ul = $(document.getElementById('container').firstChild)
                var element = $E('div', 'divFirst')
                element.before(ul)
                expect($(document.getElementById('container').firstChild) == element).to.be.ok()
            })

        })

        describe('after', function(){

            it('should insert the current elements after the one passed', function(){
                var ul = $(document.getElementById('container').firstChild)
                var element = $E('li', 'placeholder')
                element.after(ul[0].firstChild)

                expect(ul[0].childNodes[1].id).to.be('placeholder')

                var element2 = $E('li', 'placeholder2')
                element2.after(document.getElementById('third'))

                expect(ul[0].childNodes.length).to.be(5)
                expect(ul[0].childNodes[4].id).to.be('placeholder2')
            })

        })

        describe('bottom', function(){

            it('should insert the current elements at the bottom of the one passed', function(){
                var ul = $(document.getElementById('container').firstChild)
                $E('li', 'placeholder').bottom(ul)
                expect(ul[0].childNodes[3].id).to.be('placeholder')
            })

        })

        describe('top', function(){

            it('should insert the current elements at the top of the one passed', function(){
                var ul = $(document.getElementById('container').firstChild)
                $E('li', 'placeholder').top(ul)
                expect(ul[0].firstChild.id).to.be('placeholder')
            })

        })

    })

    describe('implements insert, remove, replace', function(){

        it('should alias bottom as insert', function(){
            var ul = $(document.getElementById('container').firstChild)
            $E('li', 'placeholder').insert(ul)
            expect(ul[0].childNodes[3].id).to.be('placeholder')
        })

        it('should remove the current node', function(){
            var ul = $(document.getElementById('container').firstChild)
            var element = $E('li', 'placeholder')
            element.after(ul[0].firstChild)
            $(ul[0].firstChild).remove()
            expect(ul[0].firstChild.id).to.be('placeholder')
        })

        it('should swap the current node with the one passed', function(){
            var ul = $(document.getElementById('container').firstChild)
            var element = $E('li', 'placeholder')
            element.replace(ul[0].firstChild)
            expect(ul[0].firstChild.id).to.be('placeholder')
        })

    })

})
