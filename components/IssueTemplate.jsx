

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

var IssueTemplate = React.createClass({
  mixins: [ Router.State, Router.Navigation ],
  getInitialState: function(){
    return {
      
    }
  },

  render: function() {
    return(
      <h1> This is the page of a SINGLE Issue </h1>
    )
  }       
})

module.exports = IssueTemplate; 
