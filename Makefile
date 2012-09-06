
all: build build-compress

build:
	@wrup -r elements ./ > elements.build.js
	@echo "File written to 'elements.build.js'"

build-compress:
	@wrup -r elements ./ > elements.build.min.js --compress
	@echo "File written to 'elements.build.min.js'"

test-server:
	@node ./test/server.js

test-phantom:
	@phantomjs ./test/phantom.js 'http://localhost:8080/attributes.html'
	@phantomjs ./test/phantom.js 'http://localhost:8080/events.html'
	@phantomjs ./test/phantom.js 'http://localhost:8080/insertion.html'
	@phantomjs ./test/phantom.js 'http://localhost:8080/list.html'
	@phantomjs ./test/phantom.js 'http://localhost:8080/elements.html'

docs:
	@node ./doc/builddocs.js
