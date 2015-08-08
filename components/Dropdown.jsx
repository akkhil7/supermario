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
    added: []
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

  handleClick: function(item,e){
    var added = this.state.added;
    e.preventDefault();
    added.push(item.props.user);
    this.setState({
      added: added,
      status: false
    })

    document.getElementById('input').value = ""
    
  },

  changeFocus: function(e) {
    document.getElementById('input').focus();
  },

  removeTag: function(e) {

    var added = this.state.added;
    var id= e.target.getAttribute('data');
    var newAdded = _.remove(added, function(user) {
      return user.id == id
    })
    this.setState({
      added: added
    })
  },

  addToTeam: function(){

    var added = this.state.added
    var ids = added.map(function(user){
      return user.id
    })
    var team = {
      user_ids: ids
    }
    console.log(team)
    Request.post("http://localhost:3000/teams/")
    .send({team:team})
    .end((function(res,err){
      console.log(err)
    }))
  },
  render: function() {
    var results = this.state.results
    var status = this.state.status
    var value = this.state.value
    var added = this.state.added
    var _this = this
    var userLabel = added.map(function(user){
      return (<div className="user-tag"><i data={user.id} onClick={_this.removeTag} className="fa fa-times fa-lg close"> </i> @{user.username}</div>)
    })
    if(status)
      var display =  <DropdownList onAddUser={this.handleClick} status={status} results={results}/>

    if(!_.isEmpty(added))
      var submitbtn = <button onClick={this.addToTeam} className="submit-btn">Add Member</button>
    
    return (
      <div>
      <div className="genesis" onClick={this.changeFocus}>
        <div className="tags">{userLabel}</div>
        <div className="gen-input">
          <input type="text" id="input" placeholder="enter something" autoComplete="off" onKeyUp={this.findMatch} />
        </div>
      </div>
      {display}
      {submitbtn}
    </div>
      );
  }
});

module.exports = Dropdown;
