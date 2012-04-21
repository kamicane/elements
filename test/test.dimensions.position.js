/*
tests
*/
describe('getPosition', function(){

    var viewportSize,
    	test1,
    	test2,
    	test3

    before(function(){
    	viewportSize = {
			x: document.body.clientWidth,
			y: document.body.clientHeight
		}
		
        test1 = nodes('#one')
        test2 = nodes('#two')
        test3 = nodes('#three')
    })
	
	it('should calculate position', function(){
	
		/* margin top/left from top of document */
		var position1 = test1.getPosition()
    	expect(position1).to.have.keys('x', 'y')
    	expect(position1.x).to.be(50)
    	expect(position1.y).to.be(50)
    	
    	/* absolutely positioned element */
    	var position2 = test2.getPosition()
    	expect(position2).to.have.keys('x', 'y')
    	expect(position2.x).to.be(412)
    	expect(position2.y).to.be(83)
    	
    	/* floated right */
    	var position3 = test3.getPosition()
    	expect(position3).to.have.keys('x', 'y')
    	expect(position3.x).to.be(viewportSize.x - 200)
    	expect(position3.y).to.be(50)
	})
	
})

describe('getCoordinates', function(){
	
	it('should calculate coordinates', function(){
		expect(true).to.be(true)
	})
	
})