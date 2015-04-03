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
var Sidebar = require('./Sidebar.jsx');

var App = React.createClass({

  render: function () {

    return (
      <div className="content">
        <Sidebar/>
        <div className="main">
        <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = App;
