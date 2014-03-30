'use strict';

var fs = require('fs'),
	util = require('util');

exports.renderLayout= function(options){
	var req = options.req,
		res = options.res,
		next = options.next,
		file = options.file,
		headers = options.headers || {},
		pagedata = options.pagedata || {};

		//util.inherits(listViewOnScroll,events.EventEmitter);
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		else{
			pagedata.periodicLayout = JSON.parse(data);
			res.set(headers);
			res.render('periodic/layout', pagedata);
		}
	});
};