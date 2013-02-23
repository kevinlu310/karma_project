exports.attach = function attachRoutes(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/api/users', function (req, res) {
        res.send([{
            "id": "foo"
        }]);
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