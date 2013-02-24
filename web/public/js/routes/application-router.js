nyuad.Routers.ApplicationRouter = Backbone.Router.extend({

    routes: {
        "": "index",
        "index": "index",
        "users/:id": "users",
        "projects": "projects",
        "projects/create": "createProject",
        "projects/:id": "projects",
        "about":"about"

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

    createProject: function(){
        console.log("im hereeeee");
        new nyuad.Views.ProjectCreate();
    },

    projects: function(id) {
        if(id){
            console.log("Asked for project id:" + id);
            var project = new nyuad.Models.Project({"id": id});
            new nyuad.Views.ProjectView({model: project});
        } else {
            console.log("Asked for project listing");
            new nyuad.Views.ProjectListing();
        }
    },

    about: function() {
        new nyuad.Views.AboutView();
    },

});
