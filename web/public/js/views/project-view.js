nyuad.Views.ProjectView = Backbone.View.extend({
   el: "#main-content",

   template: _.template($("#project-view-template").html()),

   events: {
      // Stuff
   },

   initialize: function() {
      this.listenTo(this.model, "change", this.render);

      this.model.fetch();

      var user_model = new nyuad.Models.User({
         id: this.model.get("owner")
      });

      user_model.fetch();

      this.model.set("owner_model", user_model.toJSON());
   },

   render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
   }
});
