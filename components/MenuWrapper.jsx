"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var CommentBox    = require('./CommentBox.jsx');
var _             = require('lodash');

var MenuWrapper = React.createClass({
  handleComment: function(e){
    e.preventDefault();
    var input = this.refs.comment.getDOMNode().value
    this.props.handleComment(input,e);
  },
  render: function() {
    var option = this.props.option
    var issue = this.props.issue
    var comments = this.props.issue.comments
    //console.log(comments)
    if(option == "comments") {
      var heading = <h4> Comments </h4>
      if(!_.isEmpty(comments)) {
        var display = comments.map(function(comment){
          return <CommentBox comment={comment} />
        })

        var input = ( 
                     <form onSubmit={this.handleComment}>
                       <input type="text" ref="comment" placeholder={issue.body} />
                       <input type="submit" />
                     </form>
                    ) }
      else
        var display =  <h3> No comments added </h3>
    }
    else if(option == "files")
      var display = <h4> Attachments </h4>
    else
      var display = <h4> Info </h4>
    return (
      <div className="menu-wrapper">
      {heading}
      {display}
      {input}
      </div>
    );
  }
});

module.exports = MenuWrapper;
