"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var DropdownList  = require('./DropdownList.jsx');
var Request       = require('superagent');
var _             = require('lodash');

var Dropdown = React.createClass({

getInitialState: function() {
  return {
    data: [],
    status: false, 
    results: [],
  }
},

componentDidMount: function(){

  var url = "http://localhost:3000/users"
  var _this = this
  Request
  .get(url)
  .end(function(err,res){
    var response = JSON.parse(res.text).users
    _this.setState({
      data: response
    })
  })

},

findMatch: function(event) {
  console.log(event.target.value)

  this.setState({
    results: []
  })

  var value = event.target.value
  var _this = this
  var status = this.state.status
  if(value.length != 0)
    {
      this.setState({
        status: true
      })
    }
  else
    {
      this.setState({
        status: false
      })
      }
    /* variables initilization */
    var results = this.state.results
    var temp = []
    var data = this.state.data;
    for(var i=0;i<data.length;i++)
      { var user=data[i];
      if(_.includes(user.username, value) || _.includes(user.email, value))
        temp.push(user);
      }
      this.setState({
        results: temp
      })
  },

  handleClick: function(item){
    this.props.onAddUser(item)
  },
  
  render: function() {
    var results = this.state.results
    var status = this.state.status
    var value = this.state.value
    return (
      <div className="genesis">
        <input type="text" id="input" placeholder="enter something" autoComplete="off" onKeyUp={this.findMatch} />
        <DropdownList onAddUser={this.handleClick} status={status} results={results}/>
      </div>
      );
  }
});

module.exports = Dropdown;
