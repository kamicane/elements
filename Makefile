
all: build build-compress

build:
	@wrup -r nodes ./ > nodes.build.js
	@echo "File written to 'nodes.build.js'"

build-compress:
	@wrup -r nodes ./ > nodes.build.min.js --compress
	@echo "File written to 'nodes.build.min.js'"

test-server:
	@node ./test/server.js

test-phantom:
	@phantomjs ./test/phantom.js 'http://localhost:8080/attributes.html'
	@phantomjs ./test/phantom.js 'http://localhost:8080/traversal.html'

