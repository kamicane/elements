"use strict";

var $ = require('../lib/nodes')
var expect = require('expect.js')

describe('nodes.js', function(){

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

    it('should return an instance of Nodes that is an instance of $', function(){
        //Nodes is not accessible but it inherits from $, so we test that
        var isInstance = $(document.documentElement) instanceof $
        expect(isInstance).to.be.ok()
    })

    it('should return the very instance of Nodes if a Nodes instance is passed', function(){
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

        it('expose a use method, to allow custom selector', function(){
            var html = $(document.documentElement)
            $.use({
                prototype: {

                },
                search: function(n, ctx, self){
                    self[self.length++] = document.documentElement
                }
            })
            expect($('^_^') == html).to.be.ok()
        })

        it('expose a use method, to allow custom sorter', function(){
            var lis = $(document.getElementById('container').getElementsByTagName('li'))
            $.use({
                prototype: {},
                sort: function(self){
                    //swap self[0] with self[1]
                    var tmp = self[0]
                    self[0] = self[1]
                    self[1] = tmp
                }
            })
            var lis2 = $(document.getElementById('container').getElementsByTagName('li'))
            expect(lis2[0] == lis[1]).to.be.ok()
            expect(lis2[1] == lis[0]).to.be.ok()
            expect(lis2[2] == lis[2]).to.be.ok()
        })

    })

    describe('remove', function(){

        it('should remove the current node', function(){
            var ul = document.getElementById('container').firstChild
            var childNodes = ul.childNodes.length
            var li = document.createElement('li')
            ul.appendChild(li)
            expect(ul.childNodes.length).to.be(childNodes + 1)
            var el = $(li);
            var r = el.remove()
            expect(ul.childNodes.length).to.be(childNodes)
            expect(el === r).to.be.ok()
        })

        it('should remove the current node including elements instance', function(){
            var li = document.createElement('li')
            var a = $(li)
            var r = a.remove(true)
            var b = $(li)
            expect(a === b).not.to.be.ok()
            expect(r[0] === li).to.be.ok()
        })

    })

})
