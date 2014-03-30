'use strict';

exports = module.exports = function(app,logger){
	var controllerHelper = require('../helpers/periodic.controller'),
		TinyCache = require('tinycache'),
		cache = new TinyCache();

	require('./home')(app,{
		cache:cache,
		logger:logger,
		controllerHelper:controllerHelper
	});
};