nyuad.Models.User = Backbone.Model.extend({
   urlRoot: "/api/users",
   defaults: {
      "name": "Null User",
      "karma": 0,
      "user_picture": "https://upload.wikimedia.org/wikipedia/en/0/0d/Null.png"
   },

   initialize: function() {
      // Do something
      console.log("Hello User");
   },

   validate: function() {
      if(!attr["name"]) {
         return "Your user must have a name.";
      }
   }
});
