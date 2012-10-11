
all: build build-compress

build:
	@wrup -r elements ./ > elements.build.js
	@echo "File written to 'elements.build.js'"

build-compress:
	@wrup -r elements ./ > elements.build.min.js --compress
	@echo "File written to 'elements.build.min.js'"

test-server:
	@node ./test/server.js

test-casper:
	@casperjs ./test/casper.js 'http://localhost:8080/attributes.html'
	@casperjs ./test/casper.js 'http://localhost:8080/delegation.html'
	@casperjs ./test/delegationCasper.js
	@casperjs ./test/casper.js 'http://localhost:8080/domready.html'
	@casperjs ./test/casper.js 'http://localhost:8080/elements.html'
	@casperjs ./test/casper.js 'http://localhost:8080/events.html'
	@casperjs ./test/eventsCasper.js
	@casperjs ./test/casper.js 'http://localhost:8080/insertion.html'
	@casperjs ./test/casper.js 'http://localhost:8080/list.html'

docs:
	@./node_modules/.bin/procs -f ./doc/elements.md -t ./doc/layout.html
