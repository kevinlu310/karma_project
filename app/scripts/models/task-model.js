nyuad.Models.Task = Backbone.Model.extend({
   urlRoots: "/api/projects",
   defaults: {
      "title": "Empty title",
      "description": "Empty description"
      "picture": "null.png",
      "funding": 0,
      "owner": 0
   },

   initialize: function () {
      // body...
   }
});
