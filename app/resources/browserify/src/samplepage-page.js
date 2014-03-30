'use strict';
var navigationHeader = require('periodic.component.navigation-header'),
	fullWidthSlideshow = require('periodic.component.full-width-slideshow'),
	listViewScroll = require('periodic.component.list-view-scroll'),
	fullWidthSlideshow1 = false,
	navigationHeader1 = false,
	listviewcroll1 = new listViewScroll();

window.onload = function(){
	fullWidthSlideshow1 = new fullWidthSlideshow({element:"p_c_lvs-id"});

	navigationHeader1 = new navigationHeader();
	navigationHeader1.init();
	listviewcroll1.init({"idSelector":"p_c_lvs-id-scrolllist","sectionClass":"p_c_lvs-id-scrolllist"});
	window.navigationHeader1 = navigationHeader1;
};