/*
support checks
*/
var support = {
	boxSizing: false	
}

var checks = ['boxSizing', 'MozBoxSizing', 'WebkitBoxSizing', 'msBoxSizing'],
	div = document.createElement('div')

for (var i = 0, l = checks.length; i < l; i++){
	if (div.style[checks[i]] != undefined) support.boxSizing = true;
}


/*
tests
*/
describe('getSize()', function(){

    var test1,
    	test2,
    	test3,
    	test4,
    	test5
    
    before(function(){
        test1 = nodes('#one')
        test2 = nodes('#two')
        test3 = nodes('#three')
        test4 = nodes('#four')
        test5 = nodes('#five')
    })

    it('should calculate size', function(){
    	
    	/* width / height */
    	var size1 = test1.getSize()
    	expect(size1).to.have.keys('x', 'y')
    	expect(size1.x).to.be(120)
    	expect(size1.y).to.be(120)
    	
    	/* width / height / padding */
    	var size2 = test2.getSize()
    	expect(size2).to.have.keys('x', 'y')
    	expect(size2.x).to.be(180)
    	expect(size2.y).to.be(180)
    
    	/* width / height / padding / border */
    	var size3 = test3.getSize()
    	expect(size3).to.have.keys('x', 'y')
    	expect(size3.x).to.be(160)
    	expect(size3.y).to.be(160)
    	
    	/* width / height / padding / odd borders */
    	var size4 = test4.getSize()
    	expect(size4).to.have.keys('x', 'y')
    	expect(size4.x).to.be(270)
    	expect(size4.y).to.be(162)
    	
    	/* width / height / padding / odd borders / border-box */
    	var size5 = test5.getSize()
    	expect(size5).to.have.keys('x', 'y')
    	if (support.boxSizing){
	    	expect(size5.x).to.be(200)
	    	expect(size5.y).to.be(200)
    	} else {
	    	expect(size5.x).to.be(250)
	    	expect(size5.y).to.be(242)
    	}
    })

})