'use strict';

var settings = require('nconf'),
	events = require('events'),
	util = require('util');

var config = function(){
	this.settings = settings;
	this.init = function(options){
		return this._init(options);
	};
	this._init();
};

util.inherits(config,events.EventEmitter);

config.prototype._init = function(options){
	var envFile;
	settings.argv().file({file:'./config/environment.json'});

	switch(settings.get("env")){
		case "production":
			envFile = './config/environment/production.json';
			break;
		default:
			envFile = './config/environment/development.json';
			break;
	}
	settings.use('file', { file: envFile });

	if(settings.get('port')){
		settings.set('application:port',settings.get('port'));
	}
	process.env.NODE_ENV = settings.get('application:environment');
	process.env.PORT = settings.get('application:port');
};
module.exports = config;