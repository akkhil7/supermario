"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var IssueBox = React.createClass({
getInitialState: function() {
  return {
    toggleTeam: false,
    togglePriority: false
  }
},

handlePriority: function(e){

  var togglePriority = this.state.togglePriority

  e.preventDefault()
  this.setState({
    togglePriority: !togglePriority
  })
},
render: function() {
  var issue = this.props.issue
  var togglePriority = this.state.togglePriority
  
  if(togglePriority)
  {  
    var showPriority = (<div className="priority">
                        <a onClick={this.priorityClick}> Low </a>
                        <a onClick={this.priorityClick}> Medium </a>
                        <a onClick={this.priorityClick}> High </a>
                      </div>
                       );
  }
  else
    var showPriority = ""
  return (
      <div className="issue-box"> 
        <span> {issue.title} </span>
        <i className="fa fa-exclamation-circle" onClick={this.handlePriority}></i>
        {showPriority}
      </div>
    );
  }
});

module.exports = IssueBox;
