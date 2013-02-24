nyuad.Collections.ApplicationCollection = Backbone.Collection.extend({

   model: nyuad.Models.ApplicationModel

});

nyuad.Collections.Projects = Backbone.Collection.extend({
   model: nyuad.Models.Project,
   url: "/api/projects"
});

nyuad.Collections.RecentProjects = Backbone.Collection.extend({
   model: nyuad.Models.Project,
   url: "/api/recent_projects"
});

nyuad.Collections.Users = Backbone.Collection.extend({
   model: nyuad.Models.User,

   initialize: function (models, options) {
      this._id = options && options.id ? options.id : null;
   },

   url: function(){
      return "/api/users/" + this._id;
   }
});

nyuad.Collections.Tasks = Backbone.Collection.extend({

   model: nyuad.Models.Task,

   initialize: function (models, options) {
      this._id = options && options.id ? options.id: null;
   },

   url: function () {
      // TODO this is clearly wrong, tasks are embedded in Projects
      return "/api/tasks/" + this._id;
   }
});
