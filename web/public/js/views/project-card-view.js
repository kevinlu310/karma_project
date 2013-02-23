nyuad.Views.ProjectCard = Backbone.View.extend({

   tagName: "li",
   template: _.template($("#project-card-template").html()),
   events: {
      "click .explore": "openProject"
   },

   initialize: function () {
      this._template = _.template("project_card");
      this.render();
   },

   render: function () {
      this.el.html(this.model.toJSON());
      return this;
   },

   openProject: function(){
      this.navigate("projects/" + model.id);
   }
});
