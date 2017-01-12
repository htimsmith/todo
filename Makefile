
init:
	npm install

hero:
	@echo heroku login
	@echo heroku create
	@echo heroku rename tms-web-server
	@echo git push heroku master

push:
	push heroku master
