nyuad.Views.UserView = Backbone.View.extend({

   el: "#main-content",
   template: _.template($("#user-view-template").html()),
   fundedTemplate: _.template($("#funds-item-template").html()),
   tasksTemplate: _.template($("#user-tasks-list-template").html()),

   events: {
      "click .btn": "onClick"
   },

   initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.model.fetch();
   },

   render: function () {
      this.model.calculate();
      this.$el.html(this.template(this.model.toJSON()));

      var fundedProjects = this.model.get("funded_projects") || [];
      var tasksProjects = this.model.get("tasks_projects") || [];
      var that = this;
      _.each(fundedProjects, function(project) {
         this.$("#funds-list").append(that.fundedTemplate(project));
      });
      _.each(tasksProjects, function(task) {
         this.$("#user-tasks-list").append(that.tasksTemplate(task));
      });
      return this;
   },

   onClick: function (event) {
      console.log("Clicked on " + event);
   }
});
