nyuad.Views.User = Backbone.View.extend({

   template: _.template($("#user-view-template").html()),
   events: {
      // Stuff
   },

   initialize: function () {
      this.render();
   },

   render: function () {
      this.el.html(this.model.toJSON());
      return this;
   }
});
