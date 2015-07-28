"use strict";

var React         = require('react');
var CTG           = React.addons.CSSTransitionGroup
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Request       = require('superagent');
var Reflux        = require('reflux')
var issueStore    = require('../store/issueStore.js')
var CommentBox    = require('./CommentBox.jsx');
var _             = require('lodash')

var IssueSidebar = React.createClass({
  mixins: [Reflux.connect(issueStore)],

  getInitialState: function() {
    return {
      shouldAnimate: true
      }
  },
  
  hideIssue: function(e){
    this.props.hideIssue(e)
  },

  componentWillUpdate: function(){
    if(!this.state.shouldAnimate)
      this.setState({
        shouldAnimate: true
       })
  },

  handleSubmit: function(e){
    e.preventDefault();
    var issue = this.props.issue
    var comment = {
      body: this.refs.comment.getDOMNode().value,
      issue_id: issue.id
    }
    var issues = this.state.issues
    var _this = this
    var url = "http://localhost:3000/issues/"+issue.id+"/comments/"
    Request
      .post(url)
      .send({comment:comment})
      .end(function (err,res) {
        var response = JSON.parse(res.text)
        issue.comments.push(response.comment)
        _this.setState({
          shouldAnimate: false
        })

      })
  },

  layout: function () {
    var issue = this.props.issue
    var title = _.capitalize(issue.title)
    var comments = this.props.issue.comments
    var assigned_to = issue.assigned_to.username
    if (!_.isEmpty(comments)) {
      var displayComments = comments.map(function(comment){
        return <CommentBox comment={comment} />
      })
    }

    return (
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
    )
  },
  
  animatedLayout: function () {
    return (
      <CTG transitionName="issue-sidebar">
        {this.layout()}
      </CTG>
    );
  },

  render: function() {
    return (this.state.shouldAnimate ? this.animatedLayout() : this.layout())
  }
});

module.exports = IssueSidebar;

