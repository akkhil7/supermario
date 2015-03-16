"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

//import components
var ProjectBlank  = require('./projectBlank.jsx');
var ProjectList = require('./projectList.js.jsx');
var Sidebar = require('./Sidebar.jsx');

var App = React.createClass({

  getInitialState: function () {
    return {
      projects: []
    }
  },

  componentDidMount: function () {
    var _this = this,
    url       = "http://localhost:3000/projects"
    //to get projects thru ajax
    Request.get(url, function (res) {
      var response = JSON.parse(res.text);
      console.log(response.projects);

      _this.setState({
        projects: response.projects
      })
    })
  },
  addProject: function (project) {
    var projects = this.state.projects;
    projects.push(project);
    this.setState({
      projects: projects
    })
  },
  render: function () {
    var projects = this.state.projects;
    if (projects.length === 0) {
      var projectView = <ProjectBlank /> //if no projects then render ProjectBlank component
    } else {
      var projectView = <ProjectList projects={projects} added={this.addProject} /> //pass down {projects} to ProjectList(list of all projects)
    }

    return (
      <div className="content">
        <Sidebar/>
        <div className="main">
          <div className="projects">
          {projectView}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
