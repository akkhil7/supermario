'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')
//import components

var TeamList = React.createClass({
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
      <div className="teamlist">
      <h2> Your Team </h2> 
      <Link to="invite"><button> Add Team Member </button> </Link>
      <hr />
      </div>
      );
  }
})

module.exports = TeamList;