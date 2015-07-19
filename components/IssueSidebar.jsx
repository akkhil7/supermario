"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Request        = require('superagent');

var IssueSidebar = React.createClass({

  getInitialState: function() {
    return {
      comments: []
    }
  },
  hideIssue: function(){
    this.props.hideIssue(this)
  },

  handleSubmit: function(){

    var issue = this.props.issue
    var comment = this.refs.comment.getDOMNode().value
    var _this = this
    var url = "http://localhost:3000/comments/"
    Request
      .post(url)
      .send({comment:comment})
      .end(function (err,res) {
        var response = JSON.parse(res.text)
        console.log(res)
        _this.setState({
          comment: response.comment
        })
      })
  },

  
  render: function() {
    var issue = this.props.issue
    var title = _.capitalize(issue.title)
    var comments = this.state.comments
    console.log(issue)
    var assigned_to = issue.assigned_to.username
    if(!_.isEmpty(comments))
      {
        var displayComments = comments.map(function(map){
          return <CommentBox comment={comment} />
        })
      }
    return (
      <div className="issue-sidebar">
        <a href="#" onClick={this.hideIssue} className="close">
        <i className="fa fa-times fa-2x"> </i> </a>
      <h2>{title}</h2>
      <div className="issue-sidebar-desc">
        {displayComments}
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="comment" placeholder={issue.body} />
          <input type="submit" />
        </form>
      </div>
      <span>Assigned to: @{assigned_to}</span>

      </div>
    );
  }
});

module.exports = IssueSidebar;
