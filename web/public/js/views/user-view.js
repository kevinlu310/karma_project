nyuad.Views.UserView = Backbone.View.extend({

   el: "#main-content",
   template: _.template($("#user-view-template").html()),
   events: {
      "click .btn": "onClick"
   },

   initialize: function () {
      this.render();
   },

   render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
   },

   onClick: function (event) {
      console.log("Clicked on " + event);
   }
});
