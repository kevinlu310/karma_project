nyuad.Views.ProjectView = Backbone.View.extend({
   el: "#main-content",

   template: _.template($("#project-view-template").html()),

   events: {
      // Stuff
   },

   initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.model.fetch();
   },

   render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
   }
});
