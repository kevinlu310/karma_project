nyuad.Views.ProjectCard = Backbone.View.extend({
   className: "span4",
   tagName: "li",
   template: _.template($("#project-card-template").html()),
   events: {
      "click .explore": "openProject"
   },

   initialize: function () {
      this.render();
   },

   render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
   },

   openProject: function(){
      this.navigate("projects/" + model.id);
   }
});
