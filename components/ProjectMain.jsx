"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

//import components
var ProjectBlank  = require('./ProjectBlank.jsx');
var ProjectList = require('./ProjectList.jsx');

var ProjectMain = React.createClass({
  mixins : [Router.Navigation],
  render: function () {
    /*ProjectMain handles ProjectNew or ProjectList
    Default Route is ProjectList. ProjectList checks if length == 0, if so, transitionTo NewProject, else display the list of Projects - ProjectList
    */
    return (
          <div className="projects">
          <RouteHandler />
          </div>
    );
  }
});

module.exports = ProjectMain;
