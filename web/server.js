var express = require('express'),
    routes = require('./routes'),
    app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

routes.attach(app);

app.listen(3000);