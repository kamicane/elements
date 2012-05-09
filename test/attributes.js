"use strict";
var $ = require('../lib/attributes')
var expect = require('expect.js')
describe('attribute.js', function(){
    // prepare the environment
    beforeEach(function(){
        var body = document.getElementsByTagName('body')[0];
        var container = document.getElementById('container');
        if (!container){
            container = document.createElement('div');
            container.id = 'container';
            container.style.display = 'none';
            container.style.position = 'absolute';
            container.top = 0;
            container.left = 0;
        }
        body.appendChild(container);
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
        ].join('');
    })

    describe('setAttribute', function(){

        it('should set title attribute on the 2nd li', function(){
            var lis = document.getElementById('container').getElementsByTagName('li');
            var li = $(lis[1]);
            expect(li.getAttribute('title')).to.be('title');
            li.setAttribute('title', 'changed');
            expect(li.getAttribute('title')).to.be('changed');
        })

    })

    describe('getAttribute', function(){

        it('should get correct attributes', function(){
            var lis = $(document.getElementById('container').getElementsByTagName('li'));
            lis.handle(function(element, index){
                switch (index){
                    case 0:
                        expect(this.getAttribute('class')).to.be('first');
                        break;
                    case 1:
                        expect(this.getAttribute('title')).to.be('title');
                        break;
                    case 2:
                        expect(this.getAttribute('id')).to.be('third');
                        break;
                }
            })
        })

    })

    describe('hasAttribute', function(){

        it('should know if an element has an attribute or not', function(){
            var lis = document.getElementById('container').getElementsByTagName('li');
            var li = $(lis[0]);
            expect(li.hasAttribute('class')).to.be.ok();
            expect(li.hasAttribute('id')).to.be(false);
        })

        it('should fallback in case hasAttribute is not present', function(){
            var lis = document.getElementById('container').getElementsByTagName('li');
            lis[0].hasAttribute = null;
            var li = $(lis[0]);
            expect(li.hasAttribute('class')).to.be.ok();
            expect(li.hasAttribute('id')).to.be(false);
        })

    })

    describe('removeAttribute', function(){

        it('should correctly remove an attribute', function(){
            var lis = document.getElementById('container').getElementsByTagName('li');
            var li = $(lis[1]);
            expect(li.hasAttribute('title')).to.be.ok();
            li.removeAttribute('title');
            expect(li.hasAttribute('title')).to.be(false);
        })

    })

    describe('common setter / getter: ', function(){

        describe('should correctly handle common properties: ', function(){

            it('handles type', function(){
                var input = $(document.getElementById('moo'));
                expect(input.type()).to.be('text');
                input.type('button');
                expect(input.type()).to.be('button');
            })

            it('handles value', function(){
                var input = $(document.getElementById('moo'));
                expect(input.value()).to.be('mootools');
                input.value('mootools rocks!');
                expect(input.value()).to.be('mootools rocks!');
            })

            it('handles name', function(){
                var input = $(document.getElementById('moo'));
                expect(input.name()).to.be('library');
                input.name('framework');
                expect(input.name()).to.be('framework');
            })

            it('handles href', function(){
                var link = $(document.getElementById('link'));
                expect(link.href().indexOf('#library') != -1).to.be.ok();
                link.href('#framework');
                expect(link.href().indexOf('#framework') != -1).to.be.ok();
            })

            it('handles title', function(){
                var lis = document.getElementById('container').getElementsByTagName('li');
                var li = $(lis[1]);
                expect(li.title()).to.be('title');
                li.title('mootools li');
                expect(li.title()).to.be('mootools li');
            })

        })

        describe('should correcly handle booleans: ', function(){

            it('handles checked', function(){
                var input = $(document.getElementById('moo'));
                input.type('checkbox');
                input.checked(true);
                expect(input.checked()).to.be.ok();
                input.checked(false);
                expect(input.checked()).to.be(false);
            })

            it('handles disabled', function(){
                var input = $(document.getElementById('moo'));
                input.disabled(true);
                expect(input.disabled()).to.be.ok();
                input.disabled(false);
                expect(input.disabled()).to.be(false);
            })

            it('handles selected', function(){
                var select = document.getElementById('mooselect'),
                    first = $(select.childNodes[0]),
                    second = $(select.childNodes[1]);
                expect(first.selected()).to.be(false);
                expect(second.selected()).to.be.ok();
                first.selected(true);
                expect(first.selected()).to.be.ok();
                expect(second.selected()).to.be(false);
            })

        })

        describe('handle className, classNames, id, tag', function(){

            it('set new id', function(){
                var html = $(document.documentElement);
                html.id('newid');
                expect(html.id()).to.be('newid');
                html.id('html');
                expect(html.id()).to.be('html');
            })

            it('can reset classnames with className', function(){
                var lis = document.getElementById('container').getElementsByTagName('li'),
                    li = $(lis[0]);
                expect(li.className()).to.be('first');
                li.className('ex first now second');
                expect(li.className()).to.be('ex first now second');
            })

            it('has classnames method that return classes as an ordered array of string', function(){
                var lis = document.getElementById('container').getElementsByTagName('li'),
                    li = $(lis[0]);
                expect(li.classNames()).to.be.an(Array);
                expect(li.classNames().length).to.be(1);
                expect(li.classNames()[0]).to.be('first');
                li.className('once first now second');
                expect(li.classNames().length).to.be(4);
                var exp = ['once', 'first', 'now', 'second'].sort();
                for (var i = 0, max = 3; i < max; i++){
                    expect(li.classNames()[i]).to.be(exp[i]);
                }
            })

            it('has a tag method that return the tag name', function(){
                expect($(document.documentElement).tag()).to.be('html');
            })

        });

        describe('implements has/add/removeClass:', function(){

            it('can tell if an element has a class', function(){
                var lis = document.getElementById('container').getElementsByTagName('li');
                var li = $(lis[0]);
                expect(li.hasClass('first')).to.be.ok();
                expect(li.hasClass('mootools')).to.be(false);
            })

            it('can add a class to an element', function(){
                var lis = document.getElementById('container').getElementsByTagName('li');
                var li = $(lis[0]);
                li.addClass('mootools');
                expect(li.hasClass('mootools')).to.be.ok();
                expect(li.hasClass('first')).to.be.ok();
            })

            it('can remove a class from an element', function(){
                var lis = document.getElementById('container').getElementsByTagName('li');
                var li = $(lis[0]);
                li.removeClass('first');
                li.addClass('mootools');
                expect(li.hasClass('mootools')).to.be.ok();
                expect(li.hasClass('first')).to.be(false);
            })

        })

        describe('expose a toString method', function(){

            it('return a brief description of the tag, including id, class', function(){
                var lis = document.getElementById('container').getElementsByTagName('li');
                var li = $(lis[0]);
                li.id('LI');
                li.className('mootools');
                var desc = li.toString();
                expect(desc).to.be.a('string');
                expect(desc).to.be("li#LI.mootools");
            })

        })

    })

})
