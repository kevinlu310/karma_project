nyuad.Views.ProjectView = Backbone.View.extend({
   el: "#main-content",

   template: _.template($("#project-view-template").html()),
   task_template: _.template($("#task-list-template").html()),
   contributors_template: _.template($("#contributor-list-template").html()),
   comments_template: _.template($("#comment-list-template").html()),

   events: {
      // Nothing
   },

   initialize: function() {
      this.listenTo(this.model, "change", this.render);

      this.model.fetch();
   },

   render: function() {
      this.model.initialize();
      this.$el.html(this.template(this.model.toJSON()));

      var tasks = this.model.get("tasks_projects");
      var that = this;
      _.each(tasks, function (task) {
         that.$("#task-list").append(that.task_template(task));
      });

      var contributors = this.model.get("contributing_users");
      _.each(contributors, function (contributor) {
         that.$("#contributor-list").append(that.contributors_template(contributor));
      });
      var comments = this.model.get("comments");
      _.each(comments, function (comment) {
         that.$("#comment-list").append(that.comments_template(comment));
      });
      return this;
   }
});
