'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')
var Route         = Router.Route;

var ProjectList = require('./ProjectList.jsx');

var ProjectNew = React.createClass({
  mixins: [Router.Navigation],
  addProject: function () { 
    var project = {
      name: this.refs.name.getDOMNode().value
    };
    var _this = this;
    var url   = "http://localhost:3000/projects";
    
    Request
    .post(url)
    .send({ project: project })
    .end(function (err, res){
      console.log(res);
      _this.transitionTo('projectlist');
      })

  },

  render: function () {
    return (
      <div className="add-a-project">
        <input type="text" placeholder="Name your project" ref="name" />

        <button onClick={this.addProject}>Add this project</button>
        <button className="white" onClick={this.props.cancel}>Cancel</button> 
      </div>
      /*on click, it accesses 
        cancel property of NewProject (which is in ProjectBlank - this initiates ToggleAddingProject)*/
    );
  }
});
module.exports = ProjectNew;