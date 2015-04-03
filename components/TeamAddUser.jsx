'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;
var Route         = Router.Route;

var Request       = require('superagent')
var _             = require('lodash')

var TeamAddUser = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function(){
    return {
      flag : false
    }
  },
  componentDidMount: function(){
    var params = this.getParams();
    var id   = params.id;
    var users = this.props.users;
    var flag = this.state.flag;
    for(var i=0;i<users.length;i++)
    {
      if(users[i].id==id)
        {
          alert("Found");
          this.setState({
            flag : true
          })
        }
    }
  },

  addUser: function(){
    alert("Added user");
  },
  render: function(){
    var flag = this.state.flag;
    if(flag == true)
      var display = <div className="usertable">
                    <p> User was found </p>
                    <a href="#" onClick={this.addUser}> Add to team </a>
                    </div>
    else
      var display = <p> User was not found </p>
    return(
      <div className="add-user">
      {display}
      </div>
      );
  }
})
module.exports = TeamAddUser;