var Reflux = require('reflux');
var Request = require('superagent');
var issuesActions = require('../actions/issuesActions.js');
var _  = require('lodash');

var issueStore = Reflux.createStore({
  listenables: [issuesActions],
  data:{issues: [],
        activeIssue: undefined,
        shouldAnimate: true,
        activeOption: "info"
      },

  onUpdateIssue: function(issue){
    var _this = this
    var issues = this.data.issues
    Request.put("http://localhost:3000/issues/"+issue.id)
    .send({issue:issue})
    .end(function(res, err){
      issues = _.without(issues,issue);
      issues.push(issue)
      _this.trigger(_this.data)
    })
    },
    
  onAddIssue: function(issue){
    console.log(this.data)
    var _this = this
    Request.post("http://localhost:3000/issues")
    .send({issue:issue})
    .end(function(err,res){
      var response = JSON.parse(res.text).issue
      _this.data.issues.push(response)
      _this.trigger(_this.data)
    })
  },

  onFindIssue: function(id){
    
  var issues = this.data.issues;
  var issue = _.filter(issues, function(issue) {
    return issue.id == id
  });
  var newIssue = _.first(issue);
  return newIssue;
  
  },
  
  init: function(){
  
    var _this = this
   // console.log("init was called")
    Request.get("http://localhost:3000/issues/", function(res) {
      var response = JSON.parse(res.text);
      var issues = response.issues;
      _this.data.issues = issues;
      _this.trigger(_this.data)  
    })
  },
  
  getInitialState: function(){
    return this.data
  }
})

module.exports = issueStore;
