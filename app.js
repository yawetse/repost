
/**
 * Module dependencies.
 */
'use strict';

var express = require('express'),
	http = require('http'),
	path = require('path'),
	flash = require('connect-flash'),
	engine = require('periodic.layout.generate.ejs-locals'),
	configsettings = require('./config/config'),
	appconfig = new configsettings(),
	logger = require('./config/logger');

	if(process.env.NODE_ENV !== 'production'){
		require('longjohn');
	}


var app = express();

// all environments
app.engine('ejs', engine);
app.set('port', appconfig.settings.get('application:port'));
app.set('env', appconfig.settings.get('application:environment'));
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

var init = {
	staticCaching : function(){
		if(app.get('env') === 'development'){
			app.use(express.static(path.join(__dirname, 'public')));
		}
		else{
			app.use(express.static(path.join(__dirname, 'public'),{maxAge: 86400000}));
		}
	},
	useSessions: function(){
		if(appconfig.settings.get('sessions:enabled')){
			if(appconfig.settings.get('sessions:type')==="mongo"){
				var mongo = require('./config/mongo'),
					MongoStore = require('connect-mongo')(express),
					express_session_config = {
					secret:'hjoiuu87go9hui',
					maxAge: new Date(Date.now() + 3600000),
					store: new MongoStore(
						{url:mongo[app.get('env')].url},
						function(err){
							if(!err){
								// logger.error(err || 'connect-mongodb setup ok possibly');
								// logger.silly('connect-mongodb setup ok possibly');
								console.log("ok mongo");
							}
						})
					};
				app.use(express.session(express_session_config));
			}
			else{
				app.use(express.session());
			}
		}
	},
	userAuth: function(){
		if(appconfig.settings.get('userauth:enabled')){
			if(appconfig.settings.get('userauth:rememberme')){
				// Remember Me middleware
				app.use(function(req, res, next) {
				    if (req.method === 'POST' && req.url === '/login') {
						if (req.body.rememberme) {
							req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
						} else {
							req.session.cookie.expires = false;
						}
				    }
				    next();
				});
			}
			if(appconfig.settings.get('userauth:passport')){
				var passport = require('passport'),
					LocalStrategy = require('passport-local').Strategy;
				app.use(passport.initialize());
				app.use(passport.session());
			}
		}
	},
	useLocals: function(){
		app.use(function(req, res, next) {
			if(appconfig.settings.get('sessions:enabled')){
				res.locals.token = req.session._csrf;
			}
			res.locals.title = '';
			res.locals.headerjs = '';
			res.locals.footerjs = '';
			res.locals.flash_messages = null;
			var userdata = req.user;
			res.locals.user = userdata;
			res.locals.viewHelper = require('./app/views/_helpers/viewHelpers');
			next();
		});
	},
	useCSRF: function(){
		if(appconfig.settings.get('sessions:enabled')){
			app.use(express.csrf());
		}
	},
	logErrors: function(){
		//log errors
		app.use(function(err, req, res, next){
			logger.error(err.stack);
			next(err);
		});

		//send client errors
		//catch all errors
		app.use(function (err, req, res, next) {
			// console.log("err.name",err.name);
			if (req.xhr) {
				res.send(500, { error: 'Something blew up!' });
			}
			else {
				res.status(500);
				res.render('errors/500', { error: err });
			}
		});
	},
	serverStatus: function(){
		console.log('Express server listening on port ' + app.get('port'));
		console.log('Running in environment: '+app.get('env'));
		logger.info('looks good');
	}
};

app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
app.use(express.logger('dev'));

//use compression
app.use(express.compress());

//public dictory cache settings
init.staticCaching();

//file upload directory
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/uploads/files' }));
app.use(express.methodOverride());

//use cookies
app.use(express.cookieParser(appconfig.settings.get('cookies:cookieParser')));

//use sessions
init.useSessions();

//use cross script request forgery protection
init.useCSRF();

//use flash messages
app.use(flash());

//use userauth
init.userAuth();

//use app locals
init.useLocals();

//use express routing verbs
app.use(app.router);

// development only
init.logErrors();

//complie less to css
app.use(require('less-middleware')({ src: __dirname + '/public' }));

//routes
require('./app/routes/index')(app,logger);

http.createServer(app).listen(app.get('port'), init.serverStatus());