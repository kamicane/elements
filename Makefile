
test-server:
	@node ./test/server.js

test-casper:
	@node ./test/server.js & echo $$! > server.pid
	@./node_modules/.bin/mocha-phantomjs 'http://localhost:9090/attributes.html'
	@./node_modules/.bin/mocha-phantomjs 'http://localhost:9090/delegation.html'
	@casperjs ./test/delegationCasper.js
	@./node_modules/.bin/mocha-phantomjs 'http://localhost:9090/domready.html'
	@./node_modules/.bin/mocha-phantomjs 'http://localhost:9090/elements.html'
	@./node_modules/.bin/mocha-phantomjs 'http://localhost:9090/events.html'
	@casperjs ./test/eventsCasper.js
	@./node_modules/.bin/mocha-phantomjs 'http://localhost:9090/insertion.html'
	@./node_modules/.bin/mocha-phantomjs 'http://localhost:9090/traversal.html'
	@kill `cat server.pid`
	@rm server.pid

docs:
	@./node_modules/.bin/procs -f ./doc/elements.md -t ./doc/layout.html

docs-watch:
	@./node_modules/.bin/procs -f ./doc/elements.md -t ./doc/layout.html --watch
