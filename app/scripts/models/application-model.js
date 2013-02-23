nyuad.Models.ApplicationModel = Backbone.Model.extend({

});

nyuad.Models.Project = Backbone.Model.extend({
    urlRoot: "/api/projects",
    defaults:{
        "title": "Null Project",
        "description": "Lorem Ipsumify this",
        "image_url": "https://upload.wikimedia.org/wikipedia/en/0/0d/Null.png"
    },

    initialize: function(){
        // Do something
        console.log("Hello Project");
    },

    validate: function(){
        if(!attr["title"]){
            return "Your project must have a title.";
        }
        if(!attr["description"]){
            return "Your project must have a description.";
        }
        if(!attr["image_url"]){
            return "Your project must have an image.";
        }
    }
});
