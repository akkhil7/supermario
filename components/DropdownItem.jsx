"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var DropdownItem = React.createClass({

  handleClick: function(){
    this.props.onAddUser(this)
  },

  render: function(){
    var user = this.props.user
    return (
      <a className="item" onClick={this.handleClick}>
      <li>@{user.username}</li>
      <p>{user.email} </p>
      </a>      
    );
  }
});

module.exports = DropdownItem ;
