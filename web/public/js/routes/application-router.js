nyuad.Routers.ApplicationRouter = Backbone.Router.extend({

    routes: {
        "": "index",
        "index": "index",
        "users/": "users",
        "users/:id": "users",
        "projects/": "projects",
        "projects/:id": "projects",
    },

    index: function() {
        new nyuad.Views.ApplicationView();
    },

    users: function(id) {
        if(id) {
            console.log("users called for id:" + id);
        } else {
            console.log("users called for listing");
        }
    },

    projects: function(id) {
        console.log("projects called for listing");
    }

});
