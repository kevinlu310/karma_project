window.nyuad = {
   Models: {},
   Collections: {},
   Views: {},
   Routers: {},
   init: function() {
      new nyuad.Routers.ApplicationRouter();
      Backbone.history.start();
      console.log("Hello from Karma Project");
   }
};

$(document).ready(function() {
   nyuad.init();
});
