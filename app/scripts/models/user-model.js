nyuad.Models.User = Backbone.Model.extend({
   urlRoot: "/api/users",
   defaults: {
      "name": "Null User",
      "bio": "Lorem Ipsumify this"
   },

   initialize: function() {
      // Do something
      console.log("Hello Project");
   },

   validate: function() {
      if(!attr["name"]) {
         return "Your user must have a name.";
      }
      if(!attr["bio"]) {
         return "Your user must have a bio.";
      }
   }
});
