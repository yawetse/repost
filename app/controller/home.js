'use strict';

var controller_resource=false,
	logger,
	controllerHelper,
	path = require('path'),
	sampledata = require('../resources/sample/sampledata');

var index = function(req, res, next){
	var pageData = {
		title: 'Home page',
		page: {name:'home'},
		user: req.user,
		headerjs: ["/scripts/home-index.js"]
	};
	res.set('Cache-Control','max-age=900, public');
	res.render('home/index', pageData);
};

var page = function(req, res, next){
	var file = path.resolve(__dirname,"../views/periodic/samplelayout.json"),
		pageData = {
			title: 'Random page',
			page: {name:'home'},
			user: req.user,
			headerdata: sampledata.sample_navdata,
			slideshowdata: sampledata.sample_content,
			staticonedata: sampledata.sample_staticcontent,
			statictwodata: sampledata.sample_staticcontent,
			listviewscrolldata: sampledata.sample_content_scrolllist,
			staticbottomlist: sampledata.sample_staticcontentlist,
			headerjs: ["/scripts/samplepage-page.js"]
		},
		headers = {
			'Cache-Control':'max-age=900, public'
		};
	controllerHelper.renderLayout({
		req:req,
		res:res,
		next:next,
		file:file,
		headers:headers,
		pagedata:pageData
	});
};

var controller = function(resource){
	controller_resource= resource;
	logger = resource.logger;
	controllerHelper = resource.controllerHelper;

	return{
		index: index,
		page: page
	};
};


module.exports = controller;