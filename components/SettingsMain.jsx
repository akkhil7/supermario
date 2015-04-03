'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

var SettingsMain = React.createClass({
  render: function() {
  return(
    <h1> This is the settings page </h1>
    );
}
})

module.exports = SettingsMain;