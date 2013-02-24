nyuad.Views.ProjectListing = Backbone.View.extend({
   // Should render ProjectCards onto a grid template
   el: "#main-content",
   template: _.template($("#project-listing-template").html()),
   events: {
      // Do stuff
   },
   initialize: function() {
      this.render();
      this.projects = new nyuad.Collections.Projects();
      this.listenTo(this.projects, "add", this.addOne);
      this.listenTo(this.projects, "reset", this.addAll);
      this.projects.fetch();
   },
   render: function() {
      // Do stuff
      this.$el.html(this.template());
   },
   addOne: function(project) {
      var project_card = new nyuad.Views.ProjectCard({
         model: project
      });

      this.$("#projects-list").append(project_card.render().el);

   },

  addAll: function () {
      this.projects.each(this.addOne, this);
   },

});
