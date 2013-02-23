nyuad.Views.ProjectView = Backbone.View.extend({

   tagName: "li",
   template: _.template($("#project-view-template").html()),
   events: {
      // Stuff
   },

   initialize: function () {
      this.render();
   },

   render: function () {
      this.el.html(this.model.toJSON());
      return this;
   },

   open: function(){
      this.navigate("projects/" + model.id);
   }
});
