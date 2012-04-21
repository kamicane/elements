
var expect = require('expect.js')
var $      = require('../lib/traversal')
var array  = require('prime/es5/array')

// use ids, because .to.contain will check the entire element object
var idsOf = function(nodes){
    return array.map(nodes, function(node){
        return node.id
    })
}

var idOf = function(node){
    return node && node[0] && node[0].id
}

describe('traversal', function(){

    var wr, e1, e2, e3, e4, e5, e6, e7

    before(function(){
        wr = $(document.getElementById('wrapper'))
        e1 = $(document.getElementById('e1'))
        e2 = $(document.getElementById('e2'))
        e3 = $(document.getElementById('e3'))
        e4 = $(document.getElementById('e4'))
        e5 = $(document.getElementById('e5'))
        e6 = $(document.getElementById('e6'))
        e7 = $(document.getElementById('e7'))
    })

    describe('getFirst', function(){

        it('should select the first element', function(){
            expect(idOf(wr.getFirst())).to.be('e1')
        })

        it('should return null if there is no first element', function(){
            expect(e1.getFirst()).to.be(null)
        })

    })

    describe('getLast', function(){

        it('should select the last element', function(){
            expect(idOf(wr.getLast())).to.be('e7')
        })

        it('should return null if there is no last element', function(){
            expect(e1.getLast()).to.be(null)
        })

    })

    describe('getChildren', function(){

        it('should get the children of an element', function(){
            var nodes = wr.getChildren()
            var ids   = idsOf(nodes)
            expect(nodes.length).to.be(7)
            expect(ids).to.contain('e1')
            expect(ids).to.contain('e2')
            expect(ids).to.contain('e3')
            expect(ids).to.contain('e4')
            expect(ids).to.contain('e5')
            expect(ids).to.contain('e6')
            expect(ids).to.contain('e7')
        })

        it('should return null if there are no children', function(){
            expect(e1.getChildren()).to.be(null)
        })

    })

    describe('getNext', function(){

        it('should select the next element', function(){
            expect(idOf(e3.getNext())).to.be('e4')
        })

        it('should return null if there is no next element', function(){
            expect(e7.getNext()).to.be(null)
        })

    })

    describe('getAllNext', function(){

        it('should get all next elements', function(){
            var nodes = e4.getAllNext()
            var ids   = idsOf(nodes)
            expect(nodes.length).to.be(3)
            expect(ids).to.contain('e5')
            expect(ids).to.contain('e6')
            expect(ids).to.contain('e7')
        })

        it('should return null if there are no next elements', function(){
            expect(e7.getAllNext()).to.be(null)
        })

    })

    describe('getPrevious', function(){

        it('should select the previous element', function(){
            expect(idOf(e3.getPrevious())).to.be('e2')
        })

        it('should return null if there are no previous elements', function(){
            expect(e1.getPrevious()).to.be(null)
        })

    })

    describe('getAllPrevious', function(){

        it('should get all previous elements', function(){
            var nodes = e4.getAllPrevious()
            var ids   = idsOf(nodes)
            expect(nodes.length).to.be(3)
            expect(ids).to.contain('e1')
            expect(ids).to.contain('e2')
            expect(ids).to.contain('e3')
        })

        it('should return null if there are no previous elements', function(){
            expect(e1.getAllPrevious()).to.be(null)
        })

    })

    describe('getSiblings', function(){

        it('should get all sibling elements', function(){
            var nodes = e4.getSiblings()
            var ids   = idsOf(nodes)
            expect(nodes.length).to.be(6)
            expect(ids).to.contain('e1')
            expect(ids).to.contain('e2')
            expect(ids).to.contain('e3')
            expect(ids).to.contain('e5')
            expect(ids).to.contain('e6')
            expect(ids).to.contain('e7')
        })

    })

})
