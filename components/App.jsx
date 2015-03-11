"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

var App = React.createClass({

  getInitialState: function () {
    return {
      projects: []
    }
  },

  componentDidMount: function () {
    var _this = this,
        url = "http://localhost:3000/projects"

    Request.get(url, function (res) {
      var response = JSON.parse(res.text);

      _this.setState({
        projects: response.projects
      })
    })
  },

  render: function () {
    var projects = this.state.projects;

    var projectsView =
      _.map(projects, function (project) {
        return <div key={project.id}> {project.name} </div>
      })

    return (
      <div className="projects-list">
        <h4>Projects ({projects.length})</h4>
        {projectsView}
      </div>
    )
  }
});

module.exports = App;
