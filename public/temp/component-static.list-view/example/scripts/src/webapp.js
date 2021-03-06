'use strict';

var request = require('superagent'),
	ejs = require('ejs'),
	events = require('events'),
	util = require('util');


var webapp = function(options){
	var componentData=false,
		componentTemplate=false,
		componentHTML = false,
		componentJSON = '',
		self = this;

	events.EventEmitter.call(this);

	this.grabData = function(url,callback){
		request.get(url)
			.end(function(err, res){
			if(err) {
				callback(err,null);
			}
			else{
				componentData = res.body;
				callback(null,componentData);
				self.emit("grabbedData");
			}
		});
	};

	this.grabTemplate = function(templateString,callback){
		componentTemplate = templateString;
		callback(null,componentTemplate);
		this.emit("grabbedTemplate");
	};

	this.getComponentSpec= function(){
		return componentData;
	};
};

util.inherits(webapp,events.EventEmitter);

webapp.prototype.render = function(template,data,element){
	var componentHTML = ejs.render(template,data);
	document.getElementById(element).innerHTML = componentHTML;
	this.emit("renderedComponent");
};
module.exports = new webapp();
