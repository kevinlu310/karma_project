nyuad.Views.ProjectCreate = Backbone.View.extend({
   // Should render ProjectCards onto a grid template
   el: "#main-content",
   template: _.template($("#project-create-template").html()),
   events: {
      "click .save": "doSave"
   },
   initialize: function() {
      this.render();
      this.projects = new nyuad.Collections.Projects();
   },
   render: function() {
      // Do stuff
      this.$el.html(this.template());
   },

   doSave: function (event) {
      var title = $("#projectTitle");
      var description = $("#description");
      var fundNeeded = $("#fundNeeded");
      var img = $("#imgThumbnail");


   }


   /*
   #projectTitle
   #description
   #fundNeeded
   #imgThumbnail
   #
   */

});
