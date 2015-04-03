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

var TeamMain = React.createClass({
    getInitialState: function(){
    return{
      users: []
    }
  },
  componentDidMount: function(){
  var url = "http://localhost:3000/users/";
  var _this = this;
   Request.get(url, function(res){
    var response = JSON.parse(res.text);
    _this.setState(response.users);
    })
  },
  render: function() {
    return(
      <div className="team">
      <RouteHandler />
      </div>
      );
  }
})

module.exports = TeamMain;