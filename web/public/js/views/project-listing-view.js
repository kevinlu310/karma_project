nyuad.Views.ProjectListing = Backbone.View.extend({
   // Should render ProjectCards onto a grid template
   template: _.template($("#project-listing-template").html()),
   events: {
      // Do stuff
   },
   initialize: function() {
      this.projects = new nyuad.Collections.Projects();
      this.listenTo(this.projects, "add", this.addOne);
      this.listenTo(this.projects, "all", this.render);
      this.projects.fetch();
   },
   render: function() {
      // Do stuff
   },
   addOne: function(project) {
      var project_card = new nyuad.Views.ProjectCard({
         model: project
      });

      this.el.append(project_card.render().el);

   }
});
