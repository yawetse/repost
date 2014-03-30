'use strict';
	var navigationHeader = require('periodic.component.navigation-header'),
		navigationHeader1 ;

	window.onload = function(){
		navigationHeader1 = new navigationHeader();
		navigationHeader1.init();
	// window.navigationHeader1 = navigationHeader1;
	};