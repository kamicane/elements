"use strict";
var $ = require('../lib/domready')
var expect = require('expect.js')
describe('domready.js', function(){
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

    describe('domready', function(){

        it('should trigger on and after dom ready (in our case it instant trigger since dom is already loaded)', function(){
            var flag = false;
            $.ready(function(){
                flag = true;
            });
            expect(flag).to.be.ok();
        })

    })

})
