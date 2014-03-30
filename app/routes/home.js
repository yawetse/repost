'use strict';

exports = module.exports = function(app,options){
	var home = require('../controller/home')({
		cache: options.cache,
		logger: options.logger,
		controllerHelper: options.controllerHelper
	});

	app.get('/',home.index);
	app.get('/page',home.page);
};