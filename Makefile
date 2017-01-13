
init:
	npm install

hero:
	@echo heroku login
	@echo heroku create
	@echo heroku rename tms-web-server
	@echo git push heroku master

push:
	git push heroku master

info:
	echo underscorejs.org
