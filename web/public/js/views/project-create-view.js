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
      var title = $("#projectTitle").val();
      var description = $("#description").val();
      var fundNeeded = $("#fundNeeded").val();
      var img = $("#imgThumbnail").val();

      console.log({
         title: title,
         desc: description,
         fund: fundNeeded,
         img: img
      });

   }


   /*
   #projectTitle
   #description
   #fundNeeded
   #imgThumbnail
   #
   */

});
