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
    	test5,
		win,
		doc,
		body
    
    before(function(){
        test1 = nodes('#one')
        test2 = nodes('#two')
        test3 = nodes('#three')
        test4 = nodes('#four')
        test5 = nodes('#five')
		win = nodes(window)
		doc = nodes(document)
		body = nodes(document.body)
    })

    it('should calculate size (width / height)', function(){
    	var size1 = test1.getSize()
    	expect(size1).to.have.keys('x', 'y')
    	expect(size1.x).to.be(120)
    	expect(size1.y).to.be(120)
	})
	
	it('should calculate size (width / height / padding)', function(){
    	var size2 = test2.getSize()
    	expect(size2).to.have.keys('x', 'y')
    	expect(size2.x).to.be(180)
    	expect(size2.y).to.be(180)
	})
	
	it('should calculate size (width / height / padding / border)', function(){
    	var size3 = test3.getSize()
    	expect(size3).to.have.keys('x', 'y')
    	expect(size3.x).to.be(160)
    	expect(size3.y).to.be(160)
	})
	
	it('should calculate size (width / height / padding / odd borders)', function(){
    	var size4 = test4.getSize()
    	expect(size4).to.have.keys('x', 'y')
    	expect(size4.x).to.be(270)
    	expect(size4.y).to.be(162)
	})
	
	it('should calculate size (width / height / padding / odd borders / border-box)', function(){
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

	it('should calculate size (window)', function(){
		var size6 = win.getSize()
		expect(size6).to.have.keys('x', 'y')
		expect(size6.x).to.be.a('number')
		expect(size6.y).to.be.a('number')
	})

	it('should calculate size (document, body)', function(){
		var size7 = doc.getSize()
		expect(size7).to.have.keys('x', 'y')
		expect(size7.x).to.be.a('number')
		expect(size7.y).to.be.a('number')
		var size8 = body.getSize()
		expect(size8).to.have.keys('x', 'y')
		expect(size8.x).to.be.a('number')
		expect(size8.y).to.be.a('number')
	})

})