describe('getScrollSize', function(){

	var test1,
		test2,
		test3,
		test4
	
	before(function(){
		test1 = nodes('#one')
		test2 = nodes('#two')
		test3 = nodes('#three')
		test4 = nodes('#four')
	})

	it('should calculate scroll size for overflow:visible', function(){
		var scrollSize1 = test1.getScrollSize()
		expect(scrollSize1).to.only.have.keys('x', 'y')
		expect(scrollSize1.x).to.be(200)
		expect(scrollSize1.y).to.be(200)
	})

	it('should calculate scroll size for overflow:hidden', function(){
		var scrollSize2 = test2.getScrollSize()
		expect(scrollSize2).to.only.have.keys('x', 'y')
		expect(scrollSize2.x).to.be(200)
		expect(scrollSize2.y).to.be(200)
	})

	it('should calculate scroll size for overflow:auto', function(){
		var scrollSize3 = test3.getScrollSize()
		expect(scrollSize3).to.only.have.keys('x', 'y')
		expect(scrollSize3.x).to.be(200)
		expect(scrollSize3.y).to.be(200)
	})

	it('should calculate scroll size for single element', function(){
		var scrollSize4 = test4.getScrollSize()
		expect(scrollSize4).to.only.have.keys('x', 'y')
		expect(scrollSize4.x).to.be(150)
		expect(scrollSize4.y).to.be(150)
	})

})

describe('getScroll', function(){

	var test1,
		test2
	
	before(function(){
		test1 = nodes('#one')
		test1[0].scrollTop = 50
		test1[0].scrollLeft = 50
		
		test2 = nodes('#three')
		test2[0].scrollTop = 50
		test2[0].scrollLeft = 50		
	})

	it('should calculate scroll', function(){
	
		/* overflow: visible, should not have scrolled */
		var scroll1 = test1.getScroll()
		expect(scroll1).to.only.have.keys('x', 'y')
		expect(scroll1.x).to.be(0)
		expect(scroll1.y).to.be(0)
	
		/* overflow: auto, should have scrolled */
		var scroll2 = test2.getScroll()
		expect(scroll2).to.only.have.keys('x', 'y')
		expect(scroll2.x).to.be(50)
		expect(scroll2.y).to.be(50)		
	})

})

describe('scrollTo', function(){

	var test1
	
	before(function(){
		test1 = nodes('#three')
	})
	
	it('should scroll to', function(){
		
		test1.scrollTo(0, 0)
		
		var scroll1 = test1.getScroll()
		expect(scroll1).to.only.have.keys('x', 'y')
		expect(scroll1.x).to.be(0)
		expect(scroll1.y).to.be(0)
		
		test1.scrollTo(20, 42)
		
		var scroll2 = test1.getScroll()
		expect(scroll2).to.only.have.keys('x', 'y')
		expect(scroll2.x).to.be(20)
		expect(scroll2.y).to.be(42)
		
		test1.scrollTo(2000, 2000)
		
		var scroll3 = test1.getScroll()
		expect(scroll3).to.only.have.keys('x', 'y')
		expect(scroll3.x).to.be.lessThan(100)
		expect(scroll3.y).to.be.lessThan(100)
		
		test1.scrollTo(0, 0)
		var scroll4 = test1.getScroll()
		expect(scroll4).to.only.have.keys('x', 'y')
		expect(scroll4.x).to.be(0)
		expect(scroll4.y).to.be(0)	
	})

})