var mysql      = require('mysql');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

function connectDB (app) {
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  database : 'phprestsql',
	  user     : app.get('dbusername'),
	  password : app.get('dbpassword'),
	});
	
	connection.connect();
	return connection;
}

function executeQuery(db, sql, callback) {
	db.query(sql, callback);
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
    	
		var db = connectDB (app);
    	executeQuery(db, "Select user.*, CL.projects_count FROM user JOIN (Select `User ID`, COUNT(`Project ID`) AS projects_count FROM project_user_fund GROUP BY `User ID`) AS CL ON user.`ID`=CL.`User ID`", function(err, rows, fields) {
			var users = [];
			if (!err && rows.length !== 0) {
				users = rows;
			}
			db.end();
	    	res.send(users);
		});
    });

    app.get('/api/users/:id', function (req, res) {
		var db = connectDB (app);
		var users = {};
    	executeQuery(db, "SELECT * FROM user WHERE ID="+req.params.id, function(err, rows, fields) {
			if (!err && rows.length !== 0) {
				users = rows[0];
			}
			
			//getting funded projects
			executeQuery(db, "SELECT project.`Title`, `project_user_fund`.`FundingAmount` FROM user JOIN project_user_fund ON user.`ID`=project_user_fund.`User ID` JOIN project ON user.`ID`=project_user_fund.`User ID` AND project_user_fund.`Project ID`=project.`ID` WHERE user.ID="+req.params.id, function(err, rows2, fields2) {
				if (!err && rows2.length !== 0) {
					users.funded_projects = rows2;
				}
				
				//getting performed tasks
				executeQuery(db, "SELECT project.`Title`, project_task_user.`Task ID` FROM `project_task_user` JOIN project ON project.`ID`=project_task_user.`Project ID` WHERE project_task_user.`User ID`="+req.params.id, function(err, rows3, fields2) {
					if (!err && rows3.length !== 0) {
						users.tasks_projects = rows3;
					}

					db.end();
					res.send(users);
				});
			});

		});

    });


    app.get('/api/projects', function (req, res) {
        res.send('users');
    });

    app.get('/api/recent_projects', function (req, res) {
		var db = connectDB (app);
    	executeQuery(db, "SELECT T.`ID` FROM (SELECT `project`.`ID` FROM project ORDER BY tstamp DESC) AS T LIMIT 3", function(err, rows, fields) {
			var users = [];
			if (!err && rows.length !== 0) {
				users = rows;
			}
			db.end();
	    	res.send(users);
		});
    });

    app.get('/api/projects/:id', function (req, res) {
		var db = connectDB (app);
		var users = {};
    	executeQuery(db, "SELECT * FROM project WHERE ID="+req.params.id, function(err, rows, fields) {
			if (!err && rows.length !== 0) {
				users = rows[0];
			}
			
			//getting contributers
			executeQuery(db, "SELECT T.Name FROM ((SELECT user.`ID`, user.`Name` FROM user JOIN `project_user_fund` ON user.`ID`=project_user_fund.`User ID` AND project_user_fund.`Project ID` = "+req.params.id+") UNION DISTINCT (SELECT user.`ID`, user.`Name` FROM user JOIN `project_task_user` ON user.`ID`=project_task_user.`User ID` AND project_task_user.`Project ID` = "+req.params.id+") ) AS T", function(err, rows2, fields2) {
				if (!err && rows2.length !== 0) {
					users.funded_projects = rows2;
				}
				
				//getting Tasks
				executeQuery(db, "SELECT task.`Title`, T.countUID,  FROM task JOIN (SELECT COUNT(`User ID`) AS countUID, `project_task_user`.`Task ID` from `project_task_user` WHERE `User ID` IS NOT NULL GROUP BY `Task ID`) AS T ON task.`ID` = T.`Task ID`"+req.params.id, function(err, rows3, fields2) {
					if (!err && rows3.length !== 0) {
						users.tasks_projects = rows3;
					}

					db.end();
					res.send(users);
				});
			});

		});

    });
};
















