var Reflux = require('reflux');
var Request = require('superagent');

var issueStore = Reflux.createStore({
  data:{issues: [],
        activeIssue: undefined
      },

  init: function(){
    var _this = this
  Request.get("http://localhost:3000/issues/", function(res) {
    var response = JSON.parse(res.text);
    var issues = response.issues;
    _this.trigger({issues:issues})
      
  })
  },
  
  getInitialState: function(){
    return this.data;
  }
})

module.exports = issueStore;
