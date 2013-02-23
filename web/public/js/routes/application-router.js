nyuad.Routers.ApplicationRouter = Backbone.Router.extend({

    routes: {
        "": "index",
        "index": "index",
        "users/:id": "users",
        "projects/": "projects",
        "projects/:id": "projects"
    },

    index: function() {
        console.log("ApplicationRouter.index()");
        new nyuad.Views.ApplicationView();
    },

    users: function(id) {
        if(id) {
            console.log("Asked for users.");
            var user = new nyuad.Models.User({"id": id});
            new nyuad.Views.UserView({model: user});
        } else {
            alert("User must specify an id");
        }
    },

    projects: function(id) {
        if(id){
            var project = new nyuad.Models.Project({"id": id});
            new nyuad.Views.ProjectView({model: project});
        } else {
            new nyuad.Views.ProjectListing();
        }
    }
});
