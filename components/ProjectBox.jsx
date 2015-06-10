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
  deleteProject: function(){
    var _this     = this;
    var project   = this.state.project;
    var url       = "http://localhost:3000/projects/" + project.id;
    
    Request
      .del(url)
      .type('json')
      .end(function(err, res){
        console.log(res);
        var response = JSON.parse(res.text);
        _this.props.deleted(response);
         })
  },
  addUser: function(){
    var _this = this;
    var project = this.state.project;
    var url = "/projects/" + project.id;
    var username = project.created_by_id;
    username+=","+this.refs.user.getDOMNode().value
    project.user_ids = username.indexOf(",") > -1 ? username.split(",") : [username]

    $.ajax({
      type: 'PUT',
      url: url,
      data: { project : project },
      success: function(res){
        console.log(res);
      }

    });

  },

  render: function() {
    var _this = this;
    var project = this.props.project;

    return (
      <div className="project-box">
        <h2>{project.name}</h2>

        <button className="delete" onClick={this.deleteProject}>Delete</button>
        <p> Members: wow </p>

      </div>
    );
  }
});
module.exports = ProjectBox;
