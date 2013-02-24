_.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/gim,
    evaluate: /\<\@(.+?)\@\>/gim,
    escape: /\<\@\-(.+?)\@\>/gim
};

window.nyuad = {
   Models: {},
   Collections: {},
   Views: {},
   Routers: {},
   init: function() {
      new nyuad.Routers.ApplicationRouter();
      Backbone.history.start();
      console.log("Hello from Karma Project");
   
      $("[data-href]").on("click", function(e) {
        e.preventDefault();
        Backbone.history.navigate($(this).closest("[data-href]").attr("href"), {trigger: true});
      })
   }
};

$(document).ready(function() {
   nyuad.init();
});
