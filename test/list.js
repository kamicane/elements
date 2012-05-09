"use strict";
var $ = require('../lib/list')
var expect = require('expect.js')
describe('list.js', function(){
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

    describe('$ should implement es5 list prototypes', function(){

        it('implement forEach', function(){
            var ul = $(document.getElementById('container').firstChild);
            var lis = $(ul[0].childNodes);
            lis.forEach(function(el, i, self){
                expect(el.innerHTML).to.be('' + (i + 1));
            })
        })

        it('implement map', function(){
            var lis = $(document.getElementById('container').firstChild.childNodes);
            var maps = lis.map(function(el){
                return el.innerHTML
            });
            expect(maps[0]).to.be('1');
            expect(maps[1]).to.be('2');
            expect(maps[2]).to.be('3');
        })

        it('implement filter', function(){
            var lis = $(document.getElementById('container').firstChild.childNodes);
            var maps = lis.filter(function(el){
                return el.innerHTML - 0 < 3;
            });
            expect(maps.length).to.be(2);
        })

        it('implement every', function(){
            var lis = $(document.getElementById('container').firstChild.childNodes);
            expect(lis.every(function(el){
                return el.tagName.toLowerCase() == 'li'
            })).to.be.ok();
            expect(lis.every(function(el){
                return el.innerHTML == '1'
            })).to.be(false);
        })

        it('implement some', function(){
            var lis = $(document.getElementById('container').firstChild.childNodes);
            expect(lis.some(function(el){
                return el.tagName == 'p'
            })).to.be(false);
            expect(lis.some(function(el){
                return el.innerHTML == '1'
            })).to.be.ok();
        })

    })

})
