var Reflux = require('reflux');
var Request = require('superagent');
var issuesActions = require('../actions/issuesActions.js');

var issueStore = Reflux.createStore({
  listenables: [issuesActions],
  data:{issues: [],
        activeIssue: undefined
      },

  onAddIssue: function(issue){
    console.log(this.data)
    var issues = this.data.issues;
    var _this = this
    Request.post("http://localhost:3000/issues")
    .send({issue:issue})
    .end(function(err,res){
      console.log(res)
      var repsonse = JSON.parse(res.text)
      console.log(issues)
      issues.push(issue);
      _this.trigger({issues:issues})
    })
  },
  
  init: function(){
    var _this = this
    console.log("init was called")
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
