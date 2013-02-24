nyuad.Views.AboutView = Backbone.View.extend({

   el: "#main-content",
   template: _.template($("#about-template").html()),

   initialize: function () {
      this.render();
   },

   render: function () {
      this.$el.html(this.template());
   }


});

