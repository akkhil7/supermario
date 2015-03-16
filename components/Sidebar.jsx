'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

var Sidebar  = React.createClass({


  render: function(){
  return(
    <div className="sidebar">
     <p className="logo"> AllClear </p>
     </div>

    );
}
})

module.exports = Sidebar;