nyuad.Routers.ApplicationRouter = Backbone.Router.extend({

    routes: {
        "": "index",
        "index": "index",
        "users/": "users",
        "users/:id": "users",
        "projects/": "projects",
        "projects/:id": "projects"
    },

    index: function(){
        console.log("index called");
    },

    users: function(id){
        if(id) {
            console.log("users called for id:" + id);
        } else {
            console.log("users called for listing");
        }
    },

    projects: function(id){
        if(id){
           var project = new nyuad.Models.Project({"id": id});
           var view = new nyuad.Views.ProjectCard({"model": project});
        } else {
            console.log("projects called for listing");
        }
    }
});
