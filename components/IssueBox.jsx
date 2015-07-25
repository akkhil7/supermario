"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var _             = require('lodash')

var IssueBox = React.createClass({
getInitialState: function() {
  return {
    togglePriority: false,
  }
},

handleClick: function(e){
  
  this.props.showIssue(this, e)

},
handlePriority: function(e){

  var togglePriority = this.state.togglePriority

  e.preventDefault()
  this.setState({
    togglePriority: !togglePriority
  })
},

updatePriority: function(e){

  var priority = _.trim(e.target.innerHTML).toLowerCase();
  var issue = this.props.issue;
  var url = "http://localhost:3000/issues/"+issue.id;
  var togglePriority = this.state.togglePriority

  issue.priority = priority;
  
  this.props.updateIssue(this)

  this.setState({
    togglePriority: !togglePriority
  })

},
render: function() {
  var issue = this.props.issue
  var togglePriority = this.state.togglePriority
  var issueClassName = "issue-box "+(issue.priority.toLowerCase())
  var priority = _.capitalize(issue.priority)
  
  if(togglePriority)
  {  
    var showPriority = (<div className="priority-box">
                        <a onClick={this.updatePriority}> Low </a>
                        <a onClick={this.updatePriority}> Medium </a>
                        <a onClick={this.updatePriority}> High </a>
                      </div>
                       );
  }
  else
    var showPriority = <a className="priority" href="#" onClick={this.handlePriority}>{priority}</a>
  return (
    <div className={issueClassName}>
      <a href="#" onClick={this.handleClick}>{issue.title}</a>
                    {showPriority}
            </div>
    );
  }
});

module.exports = IssueBox;
