"use strict"

var $ = require('../lib/elements')
var expect = require('expect.js')

var reset = function(){

    var container = document.getElementById('container')
    if (container) document.body.removeChild(container)

    container = document.createElement('div')
    container.id = 'container'
    container.style.display = 'none'
    container.style.position = 'absolute'
    container.top = 0
    container.left = 0

    document.body.appendChild(container)

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
}

describe('elements constructor', function(){

    // prepare the environment
    beforeEach(reset)

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

    describe('selector engine implementation', function(){

        it('implement custom selector engine', function(){
            $.implement({
                search: function(expression){ // stupid tagName selector

                    var buffer = []

                    this.forEach(function(node){
                        var nodes = Array.prototype.slice.call(node.getElementsByTagName(expression))
                        buffer.push.apply(buffer, nodes)
                    })

                    return $(buffer)
                }
            })
            expect($.prototype.search).to.be.ok()
        })

        it('should use the new .search, find a single element', function(){
            expect($("input").length).to.be(1)
            expect($("input") === $("input")).to.be.ok()
        })

        it('should use the new .search, find multiple elements', function(){
            expect($("div").length).to.be.greaterThan(1)
            expect($("div") !== $("div")).to.be.ok()
        })

        it('should remove the .search from the $ prototype', function(){
            delete $.prototype.search
            expect($.prototype.search).not.to.be.ok()
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

describe('list methods', function(){

    // prepare the environment
    beforeEach(reset)

    describe('$ should implement es5 list prototypes', function(){

        it('implement forEach', function(){
            var ul = $(document.getElementById('container').firstChild)
            var lis = $(ul[0].childNodes)
            lis.forEach(function(el, i){
                expect(el.innerHTML).to.be('' + (i + 1))
            })
        })

        it('implement map', function(){
            var lis = $(document.getElementById('container').firstChild.childNodes)
            var maps = lis.map(function(el){
                return el.innerHTML
            })
            expect(maps[0]).to.be('1')
            expect(maps[1]).to.be('2')
            expect(maps[2]).to.be('3')
        })

        it('implement filter', function(){
            var lis = $(document.getElementById('container').firstChild.childNodes)
            var maps = lis.filter(function(el){
                return el.innerHTML - 0 < 3
            })
            expect(maps.length).to.be(2)
        })

        it('implement every', function(){
            var lis = $(document.getElementById('container').firstChild.childNodes)
            expect(lis.every(function(el){
                return el.tagName.toLowerCase() == 'li'
            })).to.be.ok()
            expect(lis.every(function(el){
                return el.innerHTML == '1'
            })).to.be(false)
        })

        it('implement some', function(){
            var lis = $(document.getElementById('container').firstChild.childNodes)
            expect(lis.some(function(el){
                return el.tagName == 'p'
            })).to.be(false)
            expect(lis.some(function(el){
                return el.innerHTML == '1'
            })).to.be.ok()
        })

    })

})

