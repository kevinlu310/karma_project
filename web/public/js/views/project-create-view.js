nyuad.Views.ProjectCreate = Backbone.View.extend({
   // Should render ProjectCards onto a grid template
   el: "#main-content",
   template: _.template($("#project-create-template").html()),
   task_template: _.template($("#project-create-task-template").html()),
   events: {
      "click .save": "saveProject",
      "click .reset": "resetProject",
      "click .addTask": "addTask",
      "click .resetTask": "resetTask"
   },
   initialize: function() {
      this.render();
      this.projects = new nyuad.Collections.Projects();

      this.listenTo(this.model, "change", this.render);
   },
   render: function() {
      // Do stuff
      this.$el.html(this.template());

      var tasks = this.model.get("tasks_projects");
      var that = this;
      _.each(tasks, function(task){
         that.$("#project-task").append(that.task_template(task));
      });
   },

   saveProject: function (e) {
      var title = $("#projectTitle").val();
      var description = $("#description").val();
      var fundNeeded = $("#fundNeeded").val();
      var img = $("#imgThumbnail").val();

      this.model.set({
         "title": title,
         "description": description,
         "funding": fundNeeded,
         "picture": img
      });

      this.model.save();

   },


   resetProject: function (e) {
      $("#projectTitle").reset();
      $("#description").reset();
      $("#fundNeeded").reset();
      $("#imgThumbnail").reset();
      this.model.reset();
   },


   addTask: function (e) {
      e.preventDefault();
      var title = $("#taskTitle").val();
      var res = $("#resources").val();
      var karma = $("#karma").val();

      var tasks = this.model.get("tasks_projects");
      tasks.push({
         title: title,
         res: res,
         karma: karma
      });
      this.model.set("tasks_projects", tasks);
   },


   resetTask: function (e) {
      e.preventDefault();
      $("#taskTitle").reset();
      $("#resources").reset();
      $("#karma").reset();
   }
});
