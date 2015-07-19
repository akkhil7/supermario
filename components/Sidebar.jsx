'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

var Gravatar      = require('./Gravatar.jsx');


var Sidebar  = React.createClass({
  getInitialState: function(){
    return {
      email : null,
      username : null
    }
  },
  componentDidMount: function(){
    var _this = this;
    var url   = "http://localhost:3000/users/me";
    Request(url, function(res) {
      var response = JSON.parse(res.text);
      response = response.user
      _this.setState({
      email : response.email,
      username : response.username
      });
    })
  },
  render: function(){
    var email = this.state.email;
    var username = this.state.username;
  return(
    <div className="sidebar">
     <h2 className="logo"> AllClear </h2>
    
     <Gravatar email={email} size={150} />
     <div className="nav">
     <p> Welcome <span className="username">{username}</span></p>
     <ul className="menu fa-ul">
       <li><Link to="projects"><i className="fa-li fa fa-book fa-fw"></i> Projects </Link> </li>
     <li> <Link to="team"><i className="fa-li fa fa-users fa-fw"></i>  Team </Link> </li>
     <li> <Link to="settings"><i className="fa-li fa fa-gear fa-fw"></i>  Settings </Link> </li>
     <li> <Link to="register"><i className="fa-li fa fa-user-plus fa-fw"></i>  Register </Link> </li>
     </ul>
     </div>
     </div>

    );
}
})

module.exports = Sidebar;
