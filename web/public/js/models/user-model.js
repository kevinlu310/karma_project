nyuad.Models.User = Backbone.Model.extend({
   urlRoot: "/api/users",
   defaults: {
      "name": "Null User",
      "karma": 0,
      "user_picture": "https://upload.wikimedia.org/wikipedia/en/0/0d/Null.png",
      "total_funds": 0,
      "total_tasks": 0
   },

   initialize: function() {
      // Do something
      console.log("Hello User");
   },

   calculate: function () {
      var funds = this.get("funded_projects") || [];
      var tasks = this.get("tasks_projects") || [];

      var total_tasks = tasks.length;
      var total_funds = 0;
      _.each(funds, function(fund) {
         total_funds += fund.funding_amount;
      });

      this.set("total_tasks",  total_tasks);
      this.set("total_funds",  total_funds);
   },

   calculateTotalFunding: function(){
      var fund_count = this.get("funded_projects").length;
      console.log("fund_count=" + fund_count);
   },

   validate: function() {
      if(!attr["name"]) {
         return "Your user must have a name.";
      }
   }
});
