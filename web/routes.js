var mysql      = require('mysql');

function executeQuery(app, sql, callback) {
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  database : 'phprestsql',
	  user     : app.get('dbusername'),
	  password : app.get('dbpassword'),
	});
	
	connection.connect();
	connection.query(sql, callback);
	connection.end();
}


exports.attach = function attachRoutes(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/api/users', function (req, res) {
    	executeQuery(app, "SELECT * FROM user", function(err, rows, fields) {
			var users = [];
			if (!err && rows.length !== 0) {
				users = rows;
			}
			
	    	res.send(users);
		});
    });

    app.get('/api/users/:id', function (req, res) {
        res.send('user ' + req.params.id);
    });

    app.get('/api/projects', function (req, res) {
        res.send('users');
    });

    app.get('/api/recent_projects', function (req, res) {
        res.send('projects');
    });

    app.get('/api/projects/:id', function (req, res) {
        res.send('project ' + req.params.id);
    });
};