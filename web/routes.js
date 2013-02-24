var mysql = require('mysql');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

function connectDB(app) {
   var connection = mysql.createConnection({
      host: 'localhost',
      database: 'phprestsql',
      user: app.get('dbusername'),
      password: app.get('dbpassword'),
   });

   connection.connect();
   return connection;
}

function executeQuery(db, sql, callback) {
   db.query(sql, callback);
}


function findOrCreateUser(app, profile) {
   var db = connectDB(app);
   console.log("FIND ID", profile.id);
   db.query("select * From user where id = ? ", [profile.id], function(err, results) {
      var isFound = !err && results.length > 0;
      if (!isFound) {
         db.query("insert into user SET ?", {
            "id": profile.id,
            "name": profile.displayName,
            "userpicture": "http://graph.facebook.com/" + profile.id + "/picture",
         }, function(err, result) {
            console.log("ERR", err, result);
         });
      } else {
         console.log("Found user");
      }
      db.end();
   });

}

function attachAuth(app) {

   app.use(passport.initialize());
   app.use(passport.session());
   passport.use(new FacebookStrategy({
      clientID: '214934941983073',
      clientSecret: '8a1777522998b540e49f5e25cce75c86',
      callbackURL: 'http://karmaproject.hack-day.net:3000/auth/facebook/callback'
   }, function(accessToken, refreshToken, profile, done) {
      console.log("auth", done, profile.id);
      findOrCreateUser(app, profile);
      done(null, profile);
   }));

   passport.serializeUser(function(user, done) {
      done(null, {
         id: user.id,
         name: user.displayName
      });
   });

   passport.deserializeUser(function(id, done) {
      done(null, id);
   });
}
//moneyAmount

exports.attach = function attachRoutes(app) {
   attachAuth(app);



   app.post('/api/projects/:pid/do/:tid',function(req, res) {
	   var moneyAmount = req.body.moneyAmount,
	   	   owner_id = req.user;

      console.log("USER POST", owner_id);
      console.log("BODY", req.body);
	   	   
      if (!owner_id) {
         res.send("{error: 'user is undefined'}");
         return;
      }

      var db = connectDB(app);

      var update = 'UPDATE project_task_user SET user_id = ? WHERE project_id = ? AND task_id = ?';
      var post_set = {
         user_id: owner_id
      };
      var post_where = {
         project_id: req.params.pid,
         task_id: req.params.tid
      };
      console.log("UPDATE post_set ", post_set);
      console.log("UPDATE post_where ", post_where);

      var query = db.query(update, [owner_id, req.params.pid, req.params.tid], function(err, rows, fields) {
         console.log("updated", err);
         db.end();
         res.send(rows);
      });
   });

   app.post('/api/projects/:id/fund',function(req, res) {
	   var moneyAmount = req.body.moneyAmount,
	   	   owner_id = req.user;

      console.log("USER POST", owner_id);
      console.log("BODY", req.body);
	   	   
      if (!owner_id) {
         res.send("{error: 'user is undefined'}");
         return;
      }

      var db = connectDB(app);

      var insert = 'INSERT INTO project_user_fund SET ?';
      var post = {
         project_id: req.params.id,
         user_id: owner_id,
         funding_amount: moneyAmount
      };
      console.log("INSERT", post);

      var query = db.query(insert, post, function(err, rows, fields) {
         console.log("inserted", err);
         db.end();
         res.send(rows);
      });
   });

   
   app.post('/api/projects/:id/comment',function(req, res) {
	   var comment_body = req.body.Comment,
	   	   owner_id = req.user;

      console.log("USER POST", owner_id);
      console.log("BODY", req.body);
	   	   
      if (!owner_id) {
         res.send("{error: 'user is undefined'}");
         return;
      }

      var db = connectDB(app);

      var insert = 'INSERT INTO project_comments SET ?';
      var post = {
         project_id: req.params.id,
         user_id: owner_id,
         comment: comment_body
      };
      console.log("INSERT", post);

      var query = db.query(insert, post, function(err, rows, fields) {
         console.log("inserted", err);
         db.end();
         res.send(rows);
      });
   });

   app.post('/api/projects', function(req, res) {

      var title = req.body.title,
         description = req.body.description,
         fund_needed = req.body.funding,
         thumbnail = req.body.picture,
         owner_id = req.user;

      console.log("USER POST", req.user);
      console.log("BODY", req.body);

      if (!owner_id) {
         res.send("{error: 'user is undefined'}");
         return;
      }

      var db = connectDB(app);

      var insert = 'INSERT INTO project SET ?';
      var post = {
         title: title,
         description: description,
         picture: thumbnail,
         owner_id: req.user.id,
         funding: fund_needed
      };

      console.log("INSERT", post);

      var query = db.query(insert, post, function(err, rows, fields) {
         console.log("inserted", err);
         db.end();
         res.send(rows);
      });

   });

   app.get('/', function(req, res) {
      console.log("USER", req.user);
      res.render('index', {
         user: (req.user)
      });

   });

   app.get('/auth/facebook', passport.authenticate('facebook'));
   app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
   }));
   app.get('/logout', function(req, res) {
      req.logout();
      res.redirect("/");
   });

   app.get('/api/users', function(req, res) {

      var db = connectDB(app);
      executeQuery(db, "Select user.*, CL.projects_count FROM user JOIN (Select `user_id`, COUNT(`project_id`) AS projects_count FROM project_user_fund GROUP BY `user_id`) AS CL ON user.`id`=CL.`user_id`", function(err, rows, fields) {
         var users = [];
         if (!err && rows.length !== 0) {
            users = rows;
         } else if (err) {
            console.log("ERROR", err);
         }

         db.end();
         res.send(users);
      });
   });

   app.get('/api/users/:id', function(req, res) {
      var db = connectDB(app);
      var users = {};
      executeQuery(db, "SELECT * FROM user WHERE id=" + req.params.id, function(err, rows, fields) {
         if (!err && rows.length !== 0) {
            users = rows[0];
         }

         //getting funded projects
         executeQuery(db, "SELECT project.`title`, project.`id`, `project_user_fund`.`funding_amount` FROM user JOIN project_user_fund ON user.`id`=project_user_fund.`user_id` JOIN project ON user.`id`=project_user_fund.`user_id` AND project_user_fund.`project_id`=project.`id` WHERE user.id=" + req.params.id, function(err, rows2, fields2) {
            if (!err && rows2.length !== 0) {
               users.funded_projects = rows2;
            }

            //getting performed tasks
            executeQuery(db, "SELECT project.`title`, project.`id`, project_task_user.`task_id`, UT.task_title FROM `project_task_user` JOIN project ON project.`id`=project_task_user.`project_id` JOIN (SELECT task.id, task.`title` As task_title FROM task) AS UT ON project_task_user.`task_id` = UT.`id` WHERE project_task_user.`user_id`=" + req.params.id, function(err, rows3, fields2) {
               if (!err && rows3.length !== 0) {
                  users.tasks_projects = rows3;
               }

               db.end();
               res.send(users);
            });
         });

      });

   });


   app.get('/api/projects', function(req, res) {
      var db = connectDB(app);
      executeQuery(db, "SELECT project.*, UT.`owner_name`, UC.user_count, TC.task_count, UC.current_fund, NTC.task_not_assigned FROM project LEFT JOIN ( SELECT `project_id` , COUNT( `user_id` ) AS user_count, SUM( `funding_amount` ) AS current_fund FROM project_user_fund GROUP BY `project_id`) AS UC ON project.id = UC.`project_id` LEFT JOIN ( SELECT `project_id` , COUNT( `task_id` ) AS task_count FROM project_task_user GROUP BY `project_id`) AS TC ON project.id = TC.`project_id` LEFT JOIN (SELECT `project_id` , COUNT( `task_id` ) AS task_not_assigned FROM project_task_user WHERE `user_id` IS NULL GROUP BY `project_id` ) AS NTC ON project.id = NTC.`project_id` JOIN (SELECT user.id, user.`name` As owner_name FROM user) AS UT ON project.`owner_id` = UT.`id`", function(err, rows, fields) {
         var users = [];
         if (!err && rows.length !== 0) {
            users = rows;
         }
         db.end();
         res.send(users);
      });
   });

   app.get('/api/recent_projects', function(req, res) {
      var db = connectDB(app);
      executeQuery(db, "SELECT * FROM (SELECT project.*, UC.user_count, TC.task_count, UC.current_fund, NTC.task_not_assigned FROM project LEFT JOIN ( SELECT `project_id` , COUNT( `user_id` ) AS user_count, SUM( `funding_amount` ) AS current_fund FROM project_user_fund GROUP BY `project_id`) AS UC ON project.id = UC.`project_id` LEFT JOIN ( SELECT `project_id` , COUNT( `task_id` ) AS task_count FROM project_task_user GROUP BY `project_id`) AS TC ON project.id = TC.`project_id` LEFT JOIN (SELECT `project_id` , COUNT( `task_id` ) AS task_not_assigned FROM project_task_user WHERE `user_id` IS NULL GROUP BY `project_id` ) AS NTC ON project.id = NTC.`project_id`  ORDER BY tstamp DESC) AS T LIMIT 3", function(err, rows, fields) {
         var users = [];
         if (!err && rows.length !== 0) {
            console.log("no error!");
            users = rows;
         } else {
            console.log("error!", err);
         }
         db.end();
         res.send(users);
      });
   });

   app.get('/api/projects/:id', function(req, res) {
      var db = connectDB(app);
      var users = {};
      executeQuery(db, "SELECT project.* , UT.`owner_name`, UC.user_count, TC.task_count, UC.current_fund, NTC.task_not_assigned FROM project LEFT JOIN ( SELECT `project_id` , COUNT( `user_id` ) AS user_count, SUM( `funding_amount` ) AS current_fund FROM project_user_fund GROUP BY `project_id`) AS UC ON project.id = UC.`project_id` LEFT JOIN ( SELECT `project_id` , COUNT( `task_id` ) AS task_count FROM project_task_user GROUP BY `project_id`) AS TC ON project.id = TC.`project_id` LEFT JOIN (SELECT `project_id` , COUNT( `task_id` ) AS task_not_assigned FROM project_task_user WHERE `user_id` IS NULL GROUP BY `project_id` ) AS NTC ON project.id = NTC.`project_id` JOIN (SELECT user.id, user.`name` As owner_name FROM user) AS UT ON project.`owner_id` = UT.`id` WHERE project.id=" + req.params.id, function(err, rows, fields) {
         if (!err && rows.length !== 0) {
            users = rows[0];
         }

         //getting contributers
         executeQuery(db, "SELECT T.id AS user_id, T.name FROM ((SELECT user.`id`, user.`name` FROM user JOIN `project_user_fund` ON user.`id`=project_user_fund.`user_id` AND project_user_fund.`project_id` = " + req.params.id + ") UNION DISTINCT (SELECT user.`id`, user.`name` FROM user JOIN `project_task_user` ON user.`id`=project_task_user.`user_id` AND project_task_user.`project_id` = " + req.params.id + ") ) AS T", function(err, rows2, fields2) {
            if (!err && rows2.length !== 0) {
               users.contributing_users = rows2;
            }

            //getting Tasks
            executeQuery(db, "SELECT task.`title`, T.countUID, task.`resource_num` FROM task JOIN (SELECT COUNT(`user_id`) AS countUID, `project_task_user`.`task_id` from `project_task_user` WHERE `user_id` IS NOT NULL AND project_task_user.`project_id` = " + req.params.id + " GROUP BY `task_id`) AS T ON task.`id` = T.`task_id`", function(err, rows3, fields2) {
               if (!err && rows3.length !== 0) {
                  users.tasks_projects = rows3;
               }

               //getting comments
               executeQuery(db, "SELECT user.id AS user_id, user.`name`, T.`comment` FROM user JOIN (SELECT comment, `user_id` FROM `project_comments` WHERE `project_id` =" + req.params.id + " ) AS T ON T.`user_id` = user.`id`", function(err, rows4, fields2) {
                  if (!err && rows4.length !== 0) {
                     users.comments = rows4;
                  }

                  db.end();
                  res.send(users);
               });

            });
         });

      });

   });
};
