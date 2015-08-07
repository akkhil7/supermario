'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;
var Route         = Router.Route;

var Request       = require('superagent')
var _             = require('lodash')
var Dropdown      = require('./Dropdown.jsx')

var UserBox = require('./UserBox.jsx');

var TeamInviteBox= React.createClass({
  mixins: [Router.Navigation],

   getInitialState: function(){
    return{
      users: [],
      id: null,
      found: false,
      isClicked : false
    }
  },
  /*componentDidMount: function(){
  var url = "http://localhost:3000/users/";
  var _this = this;
  //load all users
   Request.get(url, function(res){
    var response = JSON.parse(res.text);
    _this.setState({
      users:response.users
    });
    })
  },
  */
  addUser: function(childComponent){
    var users = this.state.users;
    var user = childComponent.props.user
    console.log(user);
    users.push(user)
    this.setState({
      users: users
    })
  },
  /*
  handleSubmit: function(){
    var email = this.refs.email.getDOMNode().value;
    var users = this.state.users;
    var isClicked = this.state.isClicked;
    var found = this.state.found;

    var user = _.filter(users, function (user) {
      return user.email === email;
    })

    if (user.length === 1) {

      this.setState({
        found : true
      });

      var id = _.first(user).id
      this.transitionTo('addmember', { id: id })
      
    } 
    this.setState({
      isClicked : !isClicked
    })
    },
  
  render: function() {
  var isClicked = this.state.isClicked; //state of button which finds users by email
    var users = this.state.users;
    var id    = this.state.id;
    var found = this.state.found;
    if(!isClicked)
      var display = <div className="invite">
                    <h3> Add User </h3> 
                    <p> Go ahead an add a user by entering email address or username </p>
                    <input type="text" placeholder="Enter user email address" ref="email" />
                    <button onClick={this.handleSubmit} className="find"> Find by email </button>
                    </div>
    else {
      if(found) //transfer users as props to TeamAddUser
      var display = <RouteHandler users={users}/>
      else {
      var display = <div className="flash error">
      <span> We're sorry we couldn't find the user. <Link to="teamlist">Please try again.</Link> </span>
      </div>
    }
  }
    return(
      <div className="teaminvite">
     {display}
     </div>
      );
      }
    */
  render: function() {
    var users = this.state.users
    var display;
    /* if(users.length > 0)
        var display = users.map(function(user){
          return <UserBox user={user} />
        })*/
    return(
      <div>
        <h2> Add Team Member </h2>
        <hr />
        <Dropdown />
        {display}
      </div>
    );
  }
})

module.exports = TeamInviteBox;
