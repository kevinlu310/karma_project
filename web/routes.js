var mysql      = require('mysql');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

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

function attachAuth(app) {

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new FacebookStrategy({
        clientID: '214934941983073',
        clientSecret: '8a1777522998b540e49f5e25cce75c86',
        callbackURL: 'http://thekarmaproject.com:3000/auth/facebook/callback'
    }, function (accessToken, refreshToken, profile, done){
        console.log("auth", done, profile.id);
        done(null, profile);
    }));

    passport.serializeUser(function (user, done){
        console.log("USER SERIALIZE", user);
        done(null, {
            id: user.id,
            name: user.displayName
        });
    });

    passport.deserializeUser(function(id, done){
        console.log("USER DESERIALIZE", id);
        done(null, id);
    });   

}

exports.attach = function attachRoutes(app) {
    attachAuth(app);


    app.get('/', function (req, res) {
        console.log("USER", req.user);
        res.render('index', {
            user: (req.user)
        });

    });

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect:'/', failureRedirect: '/login'}));
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect("/");
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