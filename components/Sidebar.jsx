'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

var Gravatar      = require('./Gravatar.jsx');
var url           = "http://localhost:3000/users/me";
var email="";
var username="";
var Sidebar  = React.createClass({
    componentDidMount: function(){
      Request(url, function(res) {
        var response = JSON.parse(res.text);
        email=response.email;
        username=response.username;
      })
  },
  render: function(){
  return(
    <div className="sidebar">
     <h2 className="logo"> AllClear </h2>
    
     <Gravatar email={email} />
     <div className="nav">
     <p> Welcome <span className="username">{username}</span></p>
     <ul>
     <li> <Link to="projects"> Projects </Link> </li>
     <li> <Link to="team"> Team </Link> </li>
     <li> <Link to="settings"> Settings </Link> </li>
     </ul>
     </div>
     </div>

    );
}
})

module.exports = Sidebar;