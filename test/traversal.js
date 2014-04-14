"use strict";

require('./runmocha')

var $ = require('../traversal')
var expect = require('expect.js')

// just test the code in traversal.js, not all slick stuff or check if all
// selector engine features work, that _should_ be tested in slick

describe('search', function(){

    it('should use .search with $', function(){
        expect($('#parent').length).to.be(1)
    })

    describe('single context', function(){

        it('should select a multiple elements', function(){
            expect($('#parent').search('div').length).to.be(3)
        })

        it('should return a single element', function(){
            var parent = $('#parent')
            var result = parent.search('div.last')
            expect(result.length).to.be(1)
            expect(result === parent.search('div.last')).to.be.ok()
        })

    })

    describe('multiple contexts', function(){

        it('should select all elements from multiple contexts', function(){
            var parents = $('#parent, #parent2')
            var results = parents.search('div')
            expect(results.length).to.be(5)
        })

    })

})

describe('find', function(){

    describe('single context', function(){

    })

    describe('multiple context', function(){

    })

})

describe('sort', function(){

    it('should sort elements', function(){
        var parent1 = $('#parent')[0]
        var parent2 = $('#parent2')[0]
        var collection = $([parent2, parent1])
        expect(collection[0] === parent2).to.be.ok()
        expect(collection[1] === parent1).to.be.ok()
        var result = collection.sort()
        expect(result === collection).to.be.ok()
        expect(result[0] === parent1).to.be.ok()
        expect(result[1] === parent2).to.be.ok()
    })

})

describe('matches', function(){

    it('should match elements', function(){
        var parent = $('#parent')
        expect(parent.matches('div')).to.be.ok()
        expect(parent.matches('span')).not.to.be.ok()
    })

})

describe('nextSiblings', function(){

})

describe('nextSibling', function(){

})

describe('previousSiblings', function(){

})

describe('previousSibling', function(){

})

describe('children', function(){

})

describe('firstChild', function(){

})

describe('lastChild', function(){

})

describe('parent', function(){
    it('should match parent', function(){
        expect($('div.last').parent('body')).to.be($(document.body));
        expect($('div.last').parent('#parent')).to.be($('#parent'));
        expect($('div.last').parent('#parent2')).to.be(null);
    })

    it('should support selectors with spaces', function(){
        expect($('#child1').parent('#parent3 div')).to.be($('#child1parent'));
    })

    it('should support multiple contexts', function(){
        expect($('.child').parent('div')).to.be($('#parent4'));
    })
})

describe('parents', function(){
    it('should match parents', function(){
        var lastParents = $('div.last').parents();
        expect(lastParents.length).to.be(3);
        expect($(lastParents[2])).to.be($('html'));
        expect($(lastParents[1])).to.be($('body'));
        expect($(lastParents[0])).to.be($('#parent'));

    })

    it('should match parents with expression', function(){
        var lastParents = $('div.last').parents('body');
        expect(lastParents).to.be($('body'));
    })
})
