/*
tests
*/
describe('getPosition', function(){

    var viewportSize,	
    	test1,
    	test2,
    	test3,
    	test4

    before(function(){
    	viewportSize = {
			x: document.body.clientWidth,
			y: document.body.clientHeight
		}
		
        test1 = nodes('#one')
        test2 = nodes('#two')
        test3 = nodes('#three')
        test4 = nodes('#four')
    })
	
	it('should calculate position (margin top/left from top of document)', function(){
		var position1 = test1.getPosition()
    	expect(position1).to.have.keys('x', 'y')
    	expect(position1.x).to.be(50)
    	expect(position1.y).to.be(50)
	})
	
	it('should calculate position (absolutely positioned element)', function(){
    	var position2 = test2.getPosition()
    	expect(position2).to.have.keys('x', 'y')
    	expect(position2.x).to.be(412)
    	expect(position2.y).to.be(83)
	})
	
	it('should calculate position (element floated right)', function(){
    	var position3 = test3.getPosition()
    	expect(position3).to.have.keys('x', 'y')
    	expect(position3.x).to.be(viewportSize.x - 200)
    	expect(position3.y).to.be(50)
	})
	
	it('should calculate position (fixed position element)', function(){
    	var position4 = test4.getPosition()
    	expect(position4).to.have.keys('x', 'y')
    	expect(position4.x).to.be(220)
    	expect(position4.y).to.be(20)
    	window.scrollTo(0, 50)
    	position4 = test4.getPosition()
    	expect(position4).to.have.keys('x', 'y')
    	expect(position4.x).to.be(220)
    	expect(position4.y).to.be(20)
    	window.scrollTo(0, 0)   	
	})
	
})

describe('getCoordinates', function(){
	
	it('should calculate coordinates', function(){
		expect(true).to.be(true)
	})
	
})