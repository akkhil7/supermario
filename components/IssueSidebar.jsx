"use strict";
var React         = require('react');
var CTG   = React.addons.CSSTransitionGroup
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Request        = require('superagent');
var Reflux        = require('reflux')
var issueStore    = require('../store/issueStore.js')
var CommentBox    = require('./CommentBox.jsx');
var _             = require('lodash')

var IssueSidebar = React.createClass({
  mixins: [Reflux.connect(issueStore)],

  
  hideIssue: function(){
    this.props.hideIssue(this)
  },


  componentWillMount: function(){

    // issueStore.init();
  },

  handleSubmit: function(e){
    e.preventDefault();
    var issue = this.props.issue
    var comment = {
      body: this.refs.comment.getDOMNode().value,
      issue_id: issue.id
    }
    var issues = this.state.issues
    console.log(issues)
    var _this = this
    var url = "http://localhost:3000/issues/"+issue.id+"/comments/"
    Request
      .post(url)
      .send({comment:comment})
      .end(function (err,res) {
        var response = JSON.parse(res.text)
        console.log(response.comment)
        issue.comments.push(response.comment)
        issueStore.onUpdateIssue(issue)
      })
  },

  
  render: function() {
    var issue = this.props.issue
    var title = _.capitalize(issue.title)
    var comments = this.props.issue.comments
    var assigned_to = issue.assigned_to.username
    if(!_.isEmpty(comments))
      {
        var displayComments = comments.map(function(comment){
          return <CommentBox comment={comment} />
        })
      }
      return (
      <CTG transitionName="issue-sidebar">
        <div key={Math.random()} className="issue-sidebar">
        <a href="#" onClick={this.hideIssue} className="close">
        <i className="fa fa-times fa-2x"> </i> </a>
        <h2>{title}</h2>
        <div className="issue-sidebar-desc">
          <div>
            <h4> Comments </h4>
            {displayComments}
          </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="comment" placeholder={issue.body} />
          <input type="submit" />
        </form>
      </div>
      <span>Assigned to: @{assigned_to}</span>

    </div>
  </CTG>
    );
  }
});

module.exports = IssueSidebar;
