nyuad.Models.Project = Backbone.Model.extend({
   urlRoot: "/api/projects",

   defaults: {
      "title": "Empty title",
      "description": "Lorem Ipsumify this",
      "picture": "https://upload.wikimedia.org/wikipedia/en/0/0d/Null.png",
      "funding": 0,
      "owner_id": 0,
      "funding_percent": 0,
      "task_percent": 0,
      "current_fund": 0,
      "task_count": 0,
      "task_not_assigned": 0,
      "user_count": 0,
      "tasks_projects": [],
      "contributing_users": [],
      "comments": []
   },

   initialize: function() {
      this.updateTaskPercent();
      this.updateFundingPercent();
   },

   updateTaskPercent: function () {
      console.log("updateTaskPercent");
      var total = this.get("task_count");
      var result;
      if( total ){
         var assigned = total - this.get("task_not_assigned");
         result = (assigned/total) * 100;
      } else {
         result = 100;
      }
      this.set("task_percent",  result);
      console.log("task percent = " + result);
   },

   updateFundingPercent: function () {
      var total = this.get("funding");
      var result;
      if( total ){
         var current = this.get("current_fund");
         result = (current/total) * 100;
      } else {
         result = 100;
      }

      console.log("fund percent = " + result);
      this.set("funding_percent", result);
   }
});
