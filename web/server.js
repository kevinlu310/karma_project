var express = require('express'),
    routes = require('./routes'),
    app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.set('dbusername', process.env.DBUSER || "root");
app.set('dbpassword', process.env.DBPASSWORD || "mypass");

routes.attach(app);

app.listen(3000, function() {
	console.log("Server started", app.get('dbusername'));
});