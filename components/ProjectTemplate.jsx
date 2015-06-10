

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

var ProjectTemplate = React.createClass({
  mixins: [ Router.State, Router.Navigation ],
  getInitialState: function(){
    return {
      
    }
  },

  render: function() {
    return(
    <div className="project-template">
      A single project will be shown here. Project details, no of issues, whatever.
    </div>
    )
  }       
})

module.exports = ProjectTemplate; 
