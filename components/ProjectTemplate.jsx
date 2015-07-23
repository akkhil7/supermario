

'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;
var Route         = Router.Route;

var Request       = require('superagent');
var _             = require('lodash');
var Reflux        = require('reflux');
    
var Gravatar      = require('./Gravatar.jsx');
var IssueBox      = require('./IssueBox.jsx');
var IssueSidebar  = require('./IssueSidebar.jsx');
var issueStore    = require('../store/issueStore.js');

var ProjectTemplate = React.createClass({
  
mixins: [ Router.State, Router.Navigation, Reflux.connect(issueStore) ],

getInitialState: function() {
  return {
    project: undefined
  }
},

componentWillMount: function() {
  // issueStore.init();
},

componentDidMount: function() {
  var id = this.getParams().id;
  var url = "http://localhost:3000/projects/"+id
  var _this = this
  Request.get(url, function(res) {
    var response = JSON.parse(res.text)
    var project  = response.project
    _this.setState({
      project : project
    })
  })  

},


currentUser: function() {
  
  return new Promise(function(resolve,reject){
  var url = "http://localhost:3000/users/me";
  
  Request.get(url, function(res)
     {
      if(res.xhr.status == 200)
        resolve(res.text)
      else
        reject(Error(err))
    })
  })
  
},

addIssue: function(e) {

  var url = "http://localhost:3000/issues/"
  e.preventDefault()
  var _this = this
  var p_id = this.getParams().id;
  var issues = this.state.issues
  var issue_title = _.trim(this.refs.issue.getDOMNode().value)


 this.currentUser().then(function(response){

    response = JSON.parse(response).user

    var issue = {
      title: issue_title,
      project_id: p_id,
      assigned_to_id: response.id,
      priority: "Low"
    }

    
    issueStore.onAddIssue(issue, issues);
    _this.refs.issue.getDOMNode().value = null

  });

  },
  
  updateIssue: function(issueBox){

    var issue = issueBox.props.issue
    
    var url = "http://localhost:3000/issues/"+issue.id;

    var issues = this.state.issues
    var _this = this

    Request
      .put(url)
      .send({issue: issue})
      .end(function(err,res){
        var response = JSON.parse(res.text)
        console.log(res)
        Request
          .get("http://localhost:3000/issues/")
          .end(function(res){
            var response = JSON.parse(res.text)
            console.log(res)
            _this.setState({
              issues: response.issues
            })
          })
      })
  },
 
  showIssue: function(childComponent) {
    var issue = childComponent.props.issue
    this.setState({
      activeIssue: issue
    })
  
  },

  hideIssue: function(childComponent) {
    
    this.setState({
      activeIssue: undefined
    })

  },
  render: function() {
    var project = this.state.project
    var issues = this.state.issues
    var activeIssue = this.state.activeIssue
    var showIssueSidebar;
    var _this = this;
    
    if(activeIssue !== undefined)
      var showIssue = true
    else
      var showIssue = false

    if(!_.isEmpty(project))
      var name = project.name.toUpperCase()

    if(issues.length > 0)
      {
      var display = issues.map(function(issue){
                      return <IssueBox showIssue={_this.showIssue} issue={issue} updateIssue={_this.updateIssue} />
                      })
      }

    if(showIssue)
      showIssueSidebar = <IssueSidebar hideIssue={this.hideIssue} issue={activeIssue} isActive={true} />
    
    return(
      <div className="project-template">
        <h2>{name}</h2>
        {showIssueSidebar}
        <div className="project-issues">
          <h3> Issues </h3>
          <hr />
          {display}
          <form onSubmit={this.addIssue}>
            <input type="text" ref="issue" placeholder="enter issue here" />
            <input type="submit" />
          </form>
        </div>

     </div>
    )
  }       
})

module.exports = ProjectTemplate; 
