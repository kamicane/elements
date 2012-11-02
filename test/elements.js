"use strict"

var $ = require('../lib/elements')
var expect = require('expect.js')

describe('elements.js', function(){

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

    it('should receive null and return null', function(){
        expect($(null)).to.be(null)
    })

    it('should return an instance of elements that is an instance of $', function(){
        //elements is not accessible but it inherits from $, so we test that
        var isInstance = $(document.documentElement) instanceof $
        expect(isInstance).to.be.ok()
    })

    it('should return the very instance of elements if an elements instance is passed', function(){
        var html = $(document.documentElement)
        var isTheSame = $(html) === html
        expect(isTheSame).to.be.ok()
    })

    it('should return the same instance for the same element', function(){
        var li = document.createElement('li')
        var a = $(li)
        var b = $(li)
        expect(a === b).to.be.ok()
    })

    it('should correctly handle Array', function(){
        expect($([])).to.be(null)
        var res = $([document.documentElement])
        expect(res.length).to.be(1)
        expect(res instanceof $).to.be.ok()
        expect(res[0] instanceof $).to.be(false)
        var res2 = $([document.documentElement, document.getElementById('third')])
        expect(res2.length).to.be(2)
    })

    describe('expose a handle method that ', function(){

        var setRel = function(element, index){
            element.setAttribute('rel', 'handled' + index)
            return element
        }

        it('is a sort of Array.map', function(){
            var lis = $(document.getElementById('container').getElementsByTagName('li'))
            expect(lis.length).to.be(3)
            var res = lis.handle(setRel)
            expect(res[0].getAttribute('rel')).to.be('handled0')
            expect(res[1].getAttribute('rel')).to.be('handled1')
        })

        it('is a sort of Array.filter', function(){
            var lis = $(document.getElementById('container').getElementsByTagName('li'))
            var res = $(lis.handle(function(element){
                return element.className ? element : null
            }))

            expect(res.length).to.be(1)
        })

        it('can be used as Array.some', function(){
            var someHasRelHandled1 = function(element, index, buffer){
                if (element.getAttribute('rel') == 'handled1'){
                    buffer.push(true)
                    return true
                }
            }
            var lis = $(document.getElementById('container').getElementsByTagName('li'))
            var res
            lis.handle(setRel)
            res = lis.handle(someHasRelHandled1)

            expect(res.length).to.be(1)
            expect(res[0]).to.be.ok()

            var options = $(document.getElementById('container').getElementsByTagName('option'))
            res = options.handle(someHasRelHandled1)
            expect(res.length).to.be(0)
        })

        it('can be used as Array.every', function(){
            var lis = $(document.getElementById('container').getElementsByTagName('li'))
            lis.handle(setRel)
            var everyHasRel = function(element){
                if (null === element.getAttribute('rel')) return false
                return this
            }
            var res = lis.handle(everyHasRel)
            expect(res.length).to.be(lis.length)
            var options = $(document.getElementById('container').getElementsByTagName('option'))
            res = options.handle(everyHasRel)
            expect(res.length).to.not.be(options.length)
        })

        it('allow to implement custom selector engine', function(){
            $.implement({
                search: function(expression){ // stupid tagName selector

                    var res = this.handle(function(node, i, buffer){
                        var nodes = Array.prototype.slice.call(node.getElementsByTagName(expression))
                        buffer.push.apply(buffer, nodes)
                    })

                    return $(res)
                }
            })

            expect($("input").length).to.be(1)
        })

        it('allow to implement custom sorter', function(){
            var lis = $(document.getElementById('container').getElementsByTagName('li'))
            $.implement({

                sort: function(){
                    //swap self[0] with self[1]
                    var tmp = this[0]
                    this[0] = this[1]
                    this[1] = tmp
                }

            })

            var lis2 = $(document.getElementById('container').getElementsByTagName('li'))
            expect(lis2[0] == lis[1]).to.be.ok()
            expect(lis2[1] == lis[0]).to.be.ok()
            expect(lis2[2] == lis[2]).to.be.ok()
        })

    })

    describe('unlink', function(){

        it('should remove the current node from the internal collection', function(){
            var li = document.createElement('li')
            var a = $(li)
            var r = a.unlink()
            var b = $(li)
            expect(a === b).not.to.be.ok()
            expect(r[0] === li).to.be.ok()
        })

    })

})
