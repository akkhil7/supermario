"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var CommentBox = React.createClass({

  render: function() {
    var comment=this.props.comment
    return (
      <div className="comment-box-wrapper">
        {comment.body}
      </div>

      
    );
  }
});

module.exports = CommentBox;