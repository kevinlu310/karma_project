nyuad.Models.Task = Backbone.Model.extend({
   urlRoots: "/api/projects",
   defaults: {
      "title": "Task title",
      "resources_num": 0,
      "karma": 0
   },

   initialize: function () {
      console.log("Hello Task");
   },

   validate: function() {
      if(!attr["title"]){
         return "Your task must have a title!";
      }
   }
});
