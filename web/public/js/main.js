_.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/gim,
    evaluate: /\<\@(.+?)\@\>/gim,
    escape: /\<\@\-(.+?)\@\>/gim
};

window.nyuad = {
    id: null,
    name: null,
   Models: {},
   Collections: {},
   Views: {},
   Routers: {},
   init: function() {
      nyuad.id = $("body").attr("data-id");
      nyuad.name = $("body").attr("data-name");
      new nyuad.Routers.ApplicationRouter();
      Backbone.history.start();
      console.log("Hello from Karma Project");

      $(document).on("click", "[data-href]", function(e) {
        e.preventDefault();
        Backbone.history.navigate($(this).closest("[data-href]").attr("href"), {trigger: true});
      })
   }
};

$(document).ready(function() {
   nyuad.init();
});
