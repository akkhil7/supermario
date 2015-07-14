

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

var ProjectTemplate = React.createClass({
  mixins: [ Router.State, Router.Navigation ],
  getInitialState: function() {
    return {
      project: [],
      issues: []
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
    var issue = {
      title: this.refs.issue.getDOMNode().value,
      project_id: p_id,
      assigned_to_id: 5,
      priority: "low"
    }
    
    var issues = this.state.issues

    Request
    .post(url)
    .send({issue: issue})
    .end(function(err,res) {
      console.log(res)
      var response = JSON.parse(res.text)
      console.log(response)
      issues.push(response)
      _this.setState({
        issues: issues
      })
    })
  },
  render: function() {
    var project = this.state.project

    if(!_.isEmpty(project))
      var name = project.name.toUpperCase()

    var issues = this.state.issues
    if(issues.length > 0)
      {
      var display = issues.map(function(issue){
                      return <IssueBox issue={issue} />
                      })
      }
    return(
      <div className="project-template">
        <h2> {name} </h2>
        <div className="project-issues">
        <h3> Issues </h3>
        A single project will be shown here. Project details, no of issues, whatever.
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
