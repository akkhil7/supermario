"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var CommentBox    = require('./CommentBox.jsx');
var _             = require('lodash');

var MenuWrapper = React.createClass({
  
  render: function() {
    var option = this.props.option
    var issue = this.props.issue
    var comments = this.props.issue.comments
    console.log(comments)
    if(option == "comments" && !_.isEmpty(comments)) {
      var heading = <h4> Comments </h4>
      var display = comments.map(function(comment){
        return <CommentBox comment={comment} />
      })
    }
    else if(option == "files")
      var display = <h4> Attachments </h4>
    else
      var display = <h4> Info </h4>
    return (
      <div>
      {heading}
      {display}
      </div>
    );
  }
});

module.exports = MenuWrapper;
