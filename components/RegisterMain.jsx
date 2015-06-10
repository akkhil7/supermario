'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

var RegisterMain = React.createClass({
  addUser: function() {
    var url = "http://localhost:3000/users";
    var user = {
      username: this.refs.username.getDOMNode().value,
      password: this.refs.password.getDOMNode().value,
      email: this.refs.email.getDOMNode().value
    };

    Request.post(url)
    .send({user: user})
    .end(function (err, res){
      alert(res);
      alert(err);
    });
  },

  render: function(){
    return(
      <div className="register">
      <h2> Register </h2>
      <hr />
      <label> Username </label>
      <form>
      <input type="text" placeholder="Enter your username" ref="username" />
      <label> Password </label>
      <input type="password" placeholder="Enter your username" ref="password" />
      <label> Email </label>
      <input type="text" placeholder="Enter your username" ref="email" />
      <button onClick={this.addUser}> Submit </button>
      </form>
      </div>
      );
  }

})

module.exports = RegisterMain;