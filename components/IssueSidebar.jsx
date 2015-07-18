"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var IssueSidebar = React.createClass({

  hideIssue: function(){

    this.props.hideIssue(this)
  },
  
  render: function() {
    var issue = this.props.issue
    return (
      <div className="issue-sidebar">
        <a href="#" onClick={this.hideIssue} className="close">
        <i className="fa fa-times"> </i> </a>
        <h2>{issue.title}</h2>

      </div>
    );
  }
});

module.exports = IssueSidebar;
