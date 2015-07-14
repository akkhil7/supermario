'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

var ProjectBox = React.createClass({
  getInitialState: function(){
  return {
    project: this.props.project
  }
  },
  
  handleClick: function(){
    if(confirm("Are you sure you want to delete this project"))
      this.props.deleted(this);
  },
  render: function() {
    var _this = this;
    var project = this.props.project;

    return (
        <div className="project-box">
      <Link to="projectwrapper" params={{id:project.id}} >
        <h3>{project.name}</h3>
      </Link>

        <a onClick={this.handleClick} className="delete"><i className="fa fa-times" onClick={this.handleClick}></i></a>
        <p> Members: wow </p>

      </div>
    );
  }
});
module.exports = ProjectBox;
