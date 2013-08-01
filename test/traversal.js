"use strict";

require('./runmocha')

var $ = require('../traversal')
var expect = require('expect.js')

// just test the code in traversal.js, not all slick stuff or check if all
// selector engine features work, that _should_ be tested in slick
describe('traversal', function(){


    var one, two, three, traversalParent;
    before(function(){
        one = $('#one'),
        two = $('#two'),
        three = $('#three'),
        traversalParent = $('#parent-traversal')
    })

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

        it('should find two siblings', function(){
            expect(one.nextSiblings().length).to.be(2)
        })

        it('should find one sibling', function(){
            expect(two.nextSiblings().length).to.be(1)
        })

        it('should find no sibling', function(){
            expect(three.nextSiblings()).to.be(null)
        })

        it('should find the correct siblings', function(){
            var oneSiblings = one.nextSiblings(),
                twoSiblings = two.nextSiblings()

            expect(oneSiblings[0].id).to.be('two')
            expect(oneSiblings[1].id).to.be('three')
            expect(twoSiblings[0].id).to.be('three')
        })
    })

    describe('nextSibling', function(){

        it('should find one sibling', function(){
            expect(two.nextSibling().length).to.be(1)
        })

        it('should find no sibling', function(){
            expect(three.nextSibling()).to.be(null)
        })

        it('should find the correct siblings', function(){
            var oneSibling = one.nextSibling(),
                twoSibling = two.nextSibling()

            expect(oneSibling[0].id).to.be('two')
            expect(twoSibling[0].id).to.be('three')
        })

    })

    describe('previousSiblings', function(){

        it('should find no siblings', function(){
            expect(one.previousSiblings()).to.be(null)
        })

        it('should find one sibling', function(){
            expect(two.previousSiblings().length).to.be(1)
        })

        it('should find two sibling', function(){
            expect(three.previousSiblings().length).to.be(2)
        })

        it('should find the correct siblings', function(){
            var threeSiblings = three.previousSiblings(),
                twoSiblings = two.previousSiblings()

            expect(threeSiblings[0].id).to.be('two')
            expect(threeSiblings[1].id).to.be('one')
            expect(twoSiblings[0].id).to.be('one')
        })
    })

    describe('previousSibling', function(){

        it('should find one sibling', function(){
            expect(two.previousSibling().length).to.be(1)
        })

        it('should find no sibling', function(){
            expect(one.previousSibling()).to.be(null)
        })

        it('should find the correct siblings', function(){
            var threeSibling = three.previousSibling(),
                twoSibling = two.previousSibling()

            expect(threeSibling[0].id).to.be('two')
            expect(twoSibling[0].id).to.be('one')
        })
    })

    describe('children', function(){

        it('should have three children', function(){
            expect(traversalParent.children().length).to.be(3)
        })
    })

    describe('firstChild', function(){

        it('should be #one', function(){
            expect(traversalParent.firstChild()[0].id).to.be('one')
        })

    })

    describe('lastChild', function(){

        it('should be #three', function(){
            expect(traversalParent.lastChild()[0].id).to.be('three')
        })
    })

    describe('parent', function(){

       it('should be #parent-traversal', function(){
           expect(one.parent()[0].id).to.be('parent-traversal')
       })

       it('should be the same for brothers', function(){
            expect(one.parent() == two.parent()).to.be.ok()
       })
    })

    describe('parents', function(){

       it('should have parents', function(){
           var parents = one.parents()
           expect(parents.length).to.be(4)
           expect(parents[0].id).to.be('parent-traversal')
           expect(parents[1].tagName.toLowerCase()).to.be('body')
           expect(parents[2].tagName.toLowerCase()).to.be('html')
           expect(parents[3].nodeName).to.be('#document')
       })
    })
})