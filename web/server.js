var express = require('express'),
    routes = require('./routes'),
    app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.set('dbusername', process.env.DBUSER || "root");
app.set('dbpassword', process.env.DBPASSWORD || "mypass");

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret: 'foo'}));
app.use(express.logger());
app.use('/static', express.static(__dirname+'/public'));

routes.attach(app);

app.listen(3000, function() {
	console.log("Server started", app.get('dbusername'));
});