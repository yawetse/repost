'use strict';
exports.includeJavaScripts = function(scripts){
	if(scripts){
		switch (typeof scripts){
			case 'array':
			case 'object':
				var scriptHtml="";
				for( var x in scripts){
					scriptHtml+=scriptTag(scripts[x]);
				}
				return scriptHtml;
				break;
			case 'string':
			default:
				return scriptTag(scripts);
				break;
		}
	}
	function scriptTag(scriptsrc){
		return '<script type="text/javascript" src="'+scriptsrc+'"></script>';
	}
}

exports.passObjToClient = function(obj,nameOfClientObj){
	return "var "+nameOfClientObj+" = "+(JSON.stringify(obj))
}