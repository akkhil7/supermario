"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Gravatar = require('./Gravatar.jsx');
var UserBox = React.createClass({

  render: function() {
      var user = this.props.user;
      return (
      <div className="user-box-wrapper">
      <div className="user-box">
      <Gravatar email={user.email} size={150} />
      <h3> @{user.username} </h3>
      <p> {user.email} </p>
      <button onClick={this.addUser}> Remove User </button>
    </div>
    </div>
    );
  }
});

module.exports = UserBox;
