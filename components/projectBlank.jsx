'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

//import components
var NewProject    = require('./newProject.js.jsx');

var ProjectBlank = React.createClass({
  getInitialState: function () {
    return { isAdding: false } //initial state is false
  },

  toggleAddingProject: function () {
    var isAdding = this.state.isAdding; 
    this.setState({ isAdding: !isAdding }); //changes state each time when called
  },

  render: function () {
    var isAdding = this.state.isAdding;
    if (isAdding) {
      var display = <NewProject cancel={this.toggleAddingProject} />  /*if true then display next step -> 
      Add button and Cancel button. Sets the cancel property of NewProject */ 
    }
    else {
      var display = <button onClick={this.toggleAddingProject}>Add a new project</button> // o/w display add button
    }
    return (
      <div className="projects-blank">
        <h3>There are no projects yet!</h3>
        <p>Add a new project and get started!</p>
        {display}
      </div>
    );
  }
});

module.exports = ProjectBlank;