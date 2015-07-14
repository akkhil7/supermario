"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var IssueBox = React.createClass({

  render: function() {
    var issue = this.props.issue
    return (
      <div className="issue-box"> 
        <p> {issue.title} </p>
      </div>
    );
  }
});

module.exports = IssueBox;
