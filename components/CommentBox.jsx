"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Gravatar      = require('./Gravatar.jsx');
var Request       = require('superagent');
var _             = require('lodash');

var CommentBox = React.createClass({

  render: function() {
    var comment=this.props.comment
    return (
      <div className="comment-box-wrapper">
        <p> {comment.body} </p>
        <div className="comment-gravatar"> 
        </div>
      </div>

      
    );
  }
});

module.exports = CommentBox;
