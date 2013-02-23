window.nyuad = {
   Models: {},
   Collections: {},
   Views: {},
   Routers: {},
   init: function() {
      new nyuad.Routers.ApplicationRouter();
      Backbone.history.start();
   }
};

$(document).ready(function() {
   nyuad.init();
});
