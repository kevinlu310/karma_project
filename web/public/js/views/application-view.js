nyuad.Views.ApplicationView = Backbone.View.extend({

   el: "#main-content",
   template: _.template($("#index-template").html()),
   events:{
      // Capture events from the DOM
   },

   initialize: function () {
      this.render();
      this.projects = new nyuad.Collections.RecentProjects();
      this.listenTo(this.projects, "add", this.addOne);
      this.listenTo(this.projects, "reset", this.addAll);
      this.projects.fetch();
   },

   addOne: function (project) {
      var view = new nyuad.Views.ProjectCard({
         model: project
      });

      this.$("#recent-projects").append(view.render().el);

   },

   addAll: function () {
      this.projects.each(this.addOne, this);
   },

   render: function () {
      this.$el.html(this.template());
   }


});

