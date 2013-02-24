nyuad.Views.ProjectCreate = Backbone.View.extend({
   // Should render ProjectCards onto a grid template
   el: "#main-content",
   template: _.template($("#project-create-template").html()),
   events: {
      "click .save": "saveProject",
      "click .reset": "resetProject",
      "click .addTask": "addTask",
      "click .resetTask": "resetTask"
   },
   initialize: function() {
      this.render();
      this.projects = new nyuad.Collections.Projects();
   },
   render: function() {
      // Do stuff
      this.$el.html(this.template());
   },

   saveProject: function (event) {
      var title = $("#projectTitle").val();
      var description = $("#description").val();
      var fundNeeded = $("#fundNeeded").val();
      var img = $("#imgThumbnail").val();

      var project = new nyuad.Models.Project({
         "title": title,
         "description": description,
         "funding": fundNeeded,
         "picture": img,
         "tasks_projects": []
      });

      project.save();

   },


   resetProject: function (event) {
      $("#projectTitle").reset();
      $("#description").reset();
      $("#fundNeeded").reset();
      $("#imgThumbnail").reset();
   },


   addTask: function (event) {
      var title = $("#taskTitle").val();
      var res = $("#resources").val();
      var karma = $("#karma").val();
   },


   resetTask: function (event) {
      $("#taskTitle").reset();
      $("#resources").reset();
      $("#karma").reset();
   }
});
