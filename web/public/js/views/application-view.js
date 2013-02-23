nyuad.Views.ApplicationView = Backbone.View.extend({

   el: $("#kp-app"),
   template: _.template($("#recent-template").html()),
   events:{
      // Capture events from the DOM
   },

   initialize: function () {
      this.projects = new nyuad.Collections.RecentProjects();
      this.listenTo(this.projects, "add", this.addOne);
      this.listenTo(this.projects, "all", this.render);
      this.projects.fetch();
   },

   addOne: function (project) {
      var project_card = new nyuad.Views.ProjectCard({
         model: project
      });

      this.el.append(project_card.render().el);

   },

   render: function () {
      // something
   }

});

