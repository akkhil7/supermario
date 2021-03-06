'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')
var TeamIniviteBox = require('./TeamInviteBox.jsx')

//import components

var IssueWrapper = React.createClass({
  render: function() {
    return(
      <div className="issue-wrapper">
        <RouteHandler />
      </div>
      );
  }
})

module.exports = IssueWrapper;

