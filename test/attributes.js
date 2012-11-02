"use strict";

var $ = require('../lib/attributes')
var expect = require('expect.js')

describe('attribute.js', function(){

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

    describe('setAttribute', function(){

        it('should set title attribute on the 2nd li', function(){
            var lis = document.getElementById('container').getElementsByTagName('li')
            var li = $(lis[1])
            expect(li.getAttribute('title')).to.be('title')
            li.setAttribute('title', 'changed')
            expect(li.getAttribute('title')).to.be('changed')
        })

    })

    describe('getAttribute', function(){

        it('should get correct attributes', function(){
            var lis = $(document.getElementById('container').getElementsByTagName('li'))
            lis.forEach(function(element, index){
                var self = $(element)
                switch (index){
                    case 0: expect(self.getAttribute('class')).to.be('first'); break
                    case 1: expect(self.getAttribute('title')).to.be('title'); break
                    case 2: expect(self.getAttribute('id')).to.be('third'); break
                }
            })
        })

    })

    describe('hasAttribute', function(){

        it('should know if an element has an attribute or not', function(){
            var lis = document.getElementById('container').getElementsByTagName('li')
            var li = $(lis[0])
            expect(li.hasAttribute('class')).to.be.ok()
            expect(li.hasAttribute('id')).not.to.be.ok()
        })

        it('should fallback in case hasAttribute is not present', function(){
            var lis = document.getElementById('container').getElementsByTagName('li')
            lis[0].hasAttribute = null
            var li = $(lis[0])
            expect(li.hasAttribute('class')).to.be.ok()
            expect(li.hasAttribute('id')).to.be(false)
        })

    })

    describe('removeAttribute', function(){

        it('should correctly remove an attribute', function(){
            var lis = document.getElementById('container').getElementsByTagName('li')
            var li = $(lis[1])
            expect(li.hasAttribute('title')).to.be.ok()
            li.removeAttribute('title')
            expect(li.hasAttribute('title')).to.be(false)
        })

    })

    describe('common setter / getter: ', function(){

        describe('should correctly handle common properties: ', function(){

            it('handles type', function(){
                var input = $(document.getElementById('moo'))
                expect(input.type()).to.be('text')
                input.type('button')
                expect(input.type()).to.be('button')
            })

            it('handles value', function(){
                var input = $(document.getElementById('moo'))
                expect(input.value()).to.be('mootools')
                input.value('mootools rocks!')
                expect(input.value()).to.be('mootools rocks!')
            })

            it('handles name', function(){
                var input = $(document.getElementById('moo'))
                expect(input.name()).to.be('library')
                input.name('framework')
                expect(input.name()).to.be('framework')
            })

            it('handles href', function(){
                var link = $(document.getElementById('link'))
                expect(link.href().indexOf('#library') != -1).to.be.ok()
                link.href('#framework')
                expect(link.href().indexOf('#framework') != -1).to.be.ok()
            })

            it('handles title', function(){
                var lis = document.getElementById('container').getElementsByTagName('li')
                var li = $(lis[1])
                expect(li.title()).to.be('title')
                li.title('mootools li')
                expect(li.title()).to.be('mootools li')
            })

        })

        describe('should correcly handle booleans: ', function(){

            it('handles checked', function(){
                var input = $(document.getElementById('moo'))
                input.type('checkbox')
                input.checked(true)
                expect(input.checked()).to.be.ok()
                input.checked(false)
                expect(input.checked()).to.be(false)
            })

            it('handles disabled', function(){
                var input = $(document.getElementById('moo'))
                input.disabled(true)
                expect(input.disabled()).to.be.ok()
                input.disabled(false)
                expect(input.disabled()).to.be(false)
            })

            it('handles selected', function(){
                var select = document.getElementById('mooselect'),
                    first = $(select.childNodes[0]),
                    second = $(select.childNodes[1])
                expect(first.selected()).to.be(false)
                expect(second.selected()).to.be.ok()
                first.selected(true)
                expect(first.selected()).to.be.ok()
                expect(second.selected()).to.be(false)
            })

        })

    })

    describe('class attribute methods', function(){

        describe('handle className, classNames, id, tag', function(){

            it('set new id', function(){
                var html = $(document.documentElement)
                html.id('newid')
                expect(html.id()).to.be('newid')
                html.id('html')
                expect(html.id()).to.be('html')
            })

            it('can reset classnames with className', function(){
                var lis = document.getElementById('container').getElementsByTagName('li'),
                    li = $(lis[0])
                expect(li.className()).to.be('first')
                li.className('ex first now second')
                expect(li.className()).to.be('ex first now second')
            })

            it('has classnames method that return classes as an ordered array of string', function(){
                var lis = document.getElementById('container').getElementsByTagName('li'),
                    li = $(lis[0])
                expect(li.classNames()).to.be.an(Array)
                expect(li.classNames().length).to.be(1)
                expect(li.classNames()[0]).to.be('first')
                li.className('once first now second')
                expect(li.classNames().length).to.be(4)
                var exp = ['first', 'now', 'once', 'second']
                for (var i = 0, max = 3; i < max; i++){
                    expect(li.classNames()[i]).to.be(exp[i])
                }
            })

            it('has a tag method that return the tag name', function(){
                expect($(document.documentElement).tag()).to.be('html')
            })

        })

        describe('implements has/add/removeClass:', function(){

            it('can tell if an element has a class', function(){
                var lis = document.getElementById('container').getElementsByTagName('li')
                var li = $(lis[0])
                expect(li.hasClass('first')).to.be.ok()
                expect(li.hasClass('mootools')).to.be(false)
            })

            it('can add a class to an element', function(){
                var lis = document.getElementById('container').getElementsByTagName('li')
                var li = $(lis[0])
                li.addClass('mootools')
                expect(li.hasClass('mootools')).to.be.ok()
                expect(li.hasClass('first')).to.be.ok()
            })

            it('can remove a class from an element', function(){
                var lis = document.getElementById('container').getElementsByTagName('li')
                var li = $(lis[0])
                li.removeClass('first')
                li.addClass('mootools')
                expect(li.hasClass('mootools')).to.be.ok()
                expect(li.hasClass('first')).to.be(false)
            })

        })

    })

    describe('expose a toString method', function(){

        it('return a brief description of the tag, including id, class', function(){
            var lis = document.getElementById('container').getElementsByTagName('li')
            var li = $(lis[0])
            li.id('LI')
            li.className('mootools')
            var desc = li.toString()
            expect(desc).to.be.a('string')
            expect(desc).to.be("li#LI.mootools")
        })

    })

    describe('html', function(){

        it("should set the html of an Element", function(){
            var html = '<a href="http://mootools.net/">link</a>'
            var parent = document.createElement('div')
            $(parent).html(html)
            expect(parent.innerHTML.toLowerCase()).to.equal(html)
        })

        it("should return a select Element that retains it's selected options", function(){
            var div = document.createElement('div')
            $(div).html([
                '<select multiple="multiple" name="select">',
                '<option value="" name="none">--</option>',
                '<option value="volvo" name="volvo">Volvo</option>',
                '<option value="saab" name="saab" selected="selected">Saab</option>',
                '<option value="opel" name="opel" selected="selected">Opel</option>',
                '<option value="bmw" name="bmw">BMW</option>',
                '</select>'
            ].join(''))
            var select = div.firstChild
            expect(select.multiple).to.be.ok()
            expect(select.name).to.be('select')
            expect(select.options.length).to.be(5)

        })

        it("should set the html of a select Element", function(){
            var html = '<option>option 1</option><option selected="selected">option 2</option>'
            var select = document.createElement('select')
            $(select).html(html)
            expect(select.getElementsByTagName('*').length).to.equal(2)
            expect(select.options.length).to.equal(2)
            expect(select.selectedIndex).to.equal(1)
        })

        it("should set the html of a table Element", function(){
            var html = '<tbody><tr><td>cell 1</td><td>cell 2</td></tr><tr><td class="cell">cell 1</td><td>cell 2</td></tr></tbody>'
            var table = document.createElement('table')
            $(table).html(html)
            expect(table.childNodes.length).to.equal(1)
            expect(table.firstChild.firstChild.getElementsByTagName('*').length).to.equal(2)
            expect(table.firstChild.lastChild.firstChild.className).to.equal('cell')
        })

        it("should set the html of a tbody Element", function(){
            var html = '<tr><td>cell 1</td><td>cell 2</td></tr><tr><td class="cell">cell 1</td><td>cell 2</td></tr>'
            var tbody = document.createElement('tbody')
            var table = document.createElement('table')
            table.appendChild(tbody)
            $(tbody).html(html)
            expect(tbody.childNodes.length).to.equal(2)
            expect(tbody.lastChild.firstChild.className).to.equal('cell')
        })

        it("should set the html of a tr Element", function(){
            var html = '<td class="cell">cell 1</td><td>cell 2</td>'
            var table = document.createElement('table')
            var tbody = document.createElement('tbody')
            var tr = document.createElement('tr')
            table.appendChild(tbody)
            tbody.appendChild(tr)
            $(tr).html(html)
            expect(tr.getElementsByTagName('*').length).to.equal(2)
            expect(tr.firstChild.className).to.equal('cell')
        })

        it("should set the html of a tr Element, even when it has no parentNode", function(){
            var html = '<td class="cell c">cell 1</td><td>cell 2</td>'
            var table = document.createElement('table')
            var tbody = document.createElement('tbody')
            var tr = document.createElement('tr')
            expect(tr.parentNode).to.equal(null)
            // In IE using appendChild like in set('html') sets the parentNode to a documentFragment
            $(tr).html(html)
            table.appendChild(tbody)
            tbody.appendChild(tr)
            expect(tr.innerHTML.toLowerCase().replace(/>\s+</, '><')).to.equal(html)
            expect(tr.childNodes.length).to.equal(2)
            expect(tr.firstChild.className).to.equal('cell c')
        })

        it('should create childNodes for html5 tags', function(){
            var html = '<nav>Muu</nav><p>Tuuls</p><section>!</section>'
            var div = document.createElement('div')
            $(div).html(html)
            expect(div.childNodes.length).to.equal(3)
        })

        it('should set a number (so no string) as html', function(){
            var div = document.createElement('div')
            $(div).html(20)
            expect(div.innerHTML).to.equal('20')
        })

        it('should get the HTML of an element', function(){
            var html = '<a href="http://mootools.net/">link</a>'
            var div = document.createElement('div')
            div.innerHTML = html
            expect($(div).html()).to.equal(html)
        })

    })

    describe('text', function(){

        it("should set the text of an element", function(){
            var div = document.createElement('div')
            $(div).text('some text content')
            expect($(div).text()).to.equal('some text content')
            expect(div.innerHTML).to.equal('some text content')
        })

        it('should return the original text with `text-transform: uppercase`', function(){
            var div = document.createElement('div')
            $(div).html('<div style="text-transform: uppercase">text</div>')
            document.body.appendChild(div)
            expect($(div.firstChild).text()).to.equal('text')
            div.removeChild(div.firstChild)
        })
    })

})
