describe('getSize()', function(){

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

describe('getScrollSize', function(){

	var test
	
	before(function(){
		test = nodes('#scrolltest')
		test[0].scrollTop = 20
		test[0].scrollLeft = 20
	})

	it('should calculate scroll size', function(){
		var scrollSize = test.getScrollSize()
		expect(scrollSize).to.have.keys('x', 'y')
		expect(scrollSize.x).to.be(120)
		expect(scrollSize.y).to.be(120)
	})

})

describe('getScrollSize', function(){

	var test
	
	before(function(){
		test = nodes('#scrolltest')
		test[0].scrollTop = 20
		test[0].scrollLeft = 20
	})

	it('should calculate scroll', function(){
		var scroll = test.getScroll()
		expect(scroll).to.have.keys('x', 'y')
		expect(scroll.x).to.be(20)
		expect(scroll.y).to.be(20)
	})

})