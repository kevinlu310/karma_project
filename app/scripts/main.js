
window.nyuad = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    new nyuad.Routers.ApplicationRouter();
    nyuad.Models.project = new nyuad.Models.Project();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  nyuad.init();
});
