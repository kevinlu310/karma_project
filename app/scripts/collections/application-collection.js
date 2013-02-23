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
