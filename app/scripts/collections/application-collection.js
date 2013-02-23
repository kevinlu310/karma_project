nyuad.Collections.ApplicationCollection = Backbone.Collection.extend({

   model: nyuad.Models.ApplicationModel

});

nyuad.Collections.Projects = Backbone.Collection.extend({

   model: nyuad.Models.Project,

   initialize: function (models, options) {
      this._id = options && options.id ? options.id : null;
   },

   url: function() {
      return "/api/projects/" + this._id;
   }

});

nyuad.Collections.RecentProjects = Backbone.Collection.extend({
   model: nyuad.Models.Project,
   url: function () {
      return "/api/recent_projects";
   }
});

nyuad.Collections.Users = Backbone.Collection.extend({
   model: nyuad.Models.User,

   initialize: function (models, opetions) {
      this._id = options && options.id ? options.id : null;
   },

   url: function(){
      return "/api/users/" + this._id;
   }
});
