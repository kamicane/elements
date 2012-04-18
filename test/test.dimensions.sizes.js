describe('getSize()', function (){

    var test
    
    before(function(){
        test = nodes('#sizetest')
    })

    it('should calculate size', function(){
    	var size = test.getSize()
    	expect(size).to.have.keys('x', 'y')
    	expect(size.x).to.be(100)
    	expect(size.y).to.be(100)
    })

})
