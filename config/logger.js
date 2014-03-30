'use strict';

var winston = require('winston'),
	logger,
	loggerConfig={};

if(process.env.NODE_ENV === "production"){
	loggerConfig = {
		transports:[
			new (winston.transports.Console)({level:'error',colorize: 'true'}),
			new (winston.transports.File)({ filename: 'logs/app.log',level:'error'})
		],
		exceptionHandlers:[
			new (winston.transports.Console)({colorize: 'true'}),
			new (winston.transports.File)({ filename: 'logs/exception-errors.log'})
		],
		handleExceptions: true
	};
}
else{
	loggerConfig = {
		transports:[
			new (winston.transports.Console)({colorize: 'true'}),
			new (winston.transports.File)({ filename: 'logs/app.log'})
		],
		exceptionHandlers:[
			new (winston.transports.Console)({colorize: 'true'}),
			new (winston.transports.File)({ filename: 'logs/exception-errors.log'})
		],
		handleExceptions: true
	};
}

var logger = new (winston.Logger)(loggerConfig);
logger.exitOnError = false;

module.exports = logger;