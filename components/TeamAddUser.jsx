'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;
var Route         = Router.Route;

var Request       = require('superagent')
var _             = require('lodash')
var Gravatar      = require('./Gravatar.jsx')

var TeamAddUser = React.createClass({
  mixins: [ Router.State, Router.Navigation ],
  getInitialState: function(){
    return {
      flag : false,
      user : null
    }
  },
  componentWillMount: function(){
    var params = this.getParams();
    var id   = params.id;
    var users = this.props.users;
    var flag = this.state.flag;
    var user = _.filter(users, function(user){
      return user.id == id;
    })
    user = _.first(user);
    this.setState(
      {
        user : user
      }
    )

  },

  addUser: function(){
    var url = 'http://localhost:3000/teams'
    var id = parseInt(this.getParams().id);
    var team = {
      user_ids : [1,3,4]
    }

    Request.post(url)
    .withCredentials()
    .send({team: team})
    .end(function (err, res){
      console.log(res);
      console.log(err);
    });
  },
  handleBack: function(){
    this.transitionTo('team');
  },
  render: function(){
    var user = this.state.user;
    var username = user.username.toLowerCase();
    var email = user.email;
    var id = user.id;
    return(
      <div className="add-user">
      <button onClick={this.handleBack}> Back </button>
      <hr />
      <div className="user-box">
      <Gravatar email={email} />
      <h1> Akhil R </h1>
      <p> @{username} </p>
      <button onClick={this.addUser}> Add User </button>
      </div>
      </div>
      );
  }
})
module.exports = TeamAddUser;