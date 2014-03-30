'use strict';

var async = require('async'),
	webapp = require('./webapp');

var module1 = webapp;

window.onload = function(){
	async.parallel({
		template: function(callback){
			module1.grabTemplate(window.document.getElementById('component-template').innerHTML,callback);
	    },
	    componentData: function(callback){module1.grabData('https://s3.amazonaws.com/gpsampledata/component.list-view-scroll/staticcontentspec.json',callback);
	    }
	},
	function(err, results) {
		if(err){
			console.log(err);
		}
		webapp.render( results.template, results.componentData, "scrollerhtml");
		webapp.render( results.template, results.componentData, "anotherscrollerhtml");
		webapp.render( results.template, results.componentData, "anotherscrollerhtml2");
		// var data2 = results.componentData;
		// data2.contentspec.config.html.dom_id="anotherScroller";
		// listviewcroll2.render( results.template, data2, "anotherscrollerhtml");
	});
};

// module1.on("grabbedData",function(){
// 	console.log("loaded data")
// });

// module1.on("grabbedTemplate",function(){
// 	console.log("loaded template")
// });

// listviewcroll1.on("renderedComponent",function(){
// 	listviewcroll1.init();
// 	console.log("rendered template");
// });

// listviewcroll2.on("renderedComponent",function(){
// 	listviewcroll2.init({idSelector: 'anotherScroller'});
// 	console.log("@(*#)@(# rendered template");
// });