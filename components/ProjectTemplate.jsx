

'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;
var Route         = Router.Route;

var Request       = require('superagent')
var _             = require('lodash')
    
var Gravatar      = require('./Gravatar.jsx')
var IssueBox      = require('./IssueBox.jsx')
var IssueSidebar  = require('./IssueSidebar.jsx')


var ProjectTemplate = React.createClass({
  mixins: [ Router.State, Router.Navigation ],
  getInitialState: function() {
    return {
      project: [],
      issues: [],
      showIssue: false,
      issue: undefined
    }
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

    Request.get("http://localhost:3000/issues/", function(res){
      var response = JSON.parse(res.text)
      var issues = response.issues
      _this.setState({
        issues: issues
      })
    })
  },


  addIssue: function(e) {
    var url = "http://localhost:3000/issues/"
    e.preventDefault()
    var _this = this
    var p_id = this.getParams().id;
    console.log(this.refs.issue.getDOMNode().value)
    var issue_title = _.trim(this.refs.issue.getDOMNode().value)
    console.log(issue_title)
    var issue = {
      title: issue_title,
      project_id: p_id,
      assigned_to_id: 5,
      priority: "Low"
    }
    
    var issues = this.state.issues

    Request
    .post(url)
    .send({issue: issue})
    .end(function(err,res) {
      console.log(res)
      var response = JSON.parse(res.text)
      console.log(response)
      issues.push(response.issue)
      _this.setState({
        issues: issues
      }, function() {
          _this.refs.issue.getDOMNode().value = null
      })
    })

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

  toggleSidebar: function(issueBox) {

    var issue = issueBox.props.issue
    var showIssue = this.state.showIssue

    this.setState({
      showIssue: !showIssue,
      issue: issue
    })
    
  },

  
  render: function() {
    var project = this.state.project
    var showIssue = this.state.showIssue
    var issues = this.state.issues
    var issue = this.state.issue
    var _this = this
    var showIssueSidebar;

    if(!_.isEmpty(project))
      var name = project.name.toUpperCase()

    if(issues.length > 0)
      {
      var display = issues.map(function(issue){
                      return <IssueBox show={_this.toggleSidebar} issue={issue} updateIssue={_this.updateIssue} />
                      })
      }

    if(showIssue)
      showIssueSidebar = <IssueSidebar issue={issue} hide={this.toggleSidebar} />
    
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
