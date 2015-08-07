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
var MenuWrapper   = require('./MenuWrapper.jsx')

var IssueSidebar = React.createClass({
  mixins: [ Router.State, Router.Navigation, Reflux.connect(issueStore)],

  hideIssue: function(e){
    e.preventDefault();
    this.transitionTo('issues', {id: this.getParams().id});
  },

  /* componentDidUpdate: function(nextProps, nextState){
    if(!this.state.shouldAnimate) //makes it normal
      this.setState({
        shouldAnimate: true
      }) 
      /*
    console.log("invoked")
    if(nextProps.issue != this.props.issue && !this.state.shouldAnimate)
      { this.setState({
          activeOption: "info",
          shouldAnimate: true
         })
         }*/
   
   
  componentWillReceiveProps: function(nextProps){
    if(nextProps.issue != this.props.issue)
      {
        this.setState({
        shouldAnimate: true
        })
      }
  },
  /*
  componentWillUpdate: function(nextProps, nextState){
    if(!this.state.shouldAnimate && nextProps.issue != this.props.issue)
      this.setState({
        shouldAnimate: true
      })
      console.log("Will Update" + this.state.shouldAnimate);

  },
  */

  componentDidMount: function(){
    console.log("mounted ");
  },
  componentWillUnmount: function(){
    console.log("unMounting ");
  },

  handleSubmit: function(input, e){
    e.preventDefault();
    var issue = issueStore.onFindIssue(this.getParams().issue_id);
    var comment = {
      body: input,
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
        //UPDATES COMPONENT. didUpdate() is invoked.
      })
  },

  handleMenuClick: function(e){

    console.log("I'll be handling you guys")
    var option = e.target.getAttribute("value");
    console.log(option);
    this.setState({
      activeOption: option,
      shouldAnimate: false
      })
  },


  layout: function () {
    var issue = issueStore.onFindIssue(this.getParams().issue_id);
    console.log(issue);
    var title = _.capitalize(issue.title)
    var comments = issue.comments
    var assigned_to = issue.assigned_to.username
    var option = this.state.activeOption
    
    if (!_.isEmpty(comments)) {
      var displayComments = comments.map(function(comment){
        return <CommentBox comment={comment} />
      })
    }
    
    return (
        <div className="issue-sidebar">
          <a href="#" onClick={this.hideIssue} className="close">
          <i className="fa fa-times fa-2x"> </i> </a>
          <h2>{title}</h2>
          <div className="issue-sidebar-desc">
            <div className="issue-sidebar-menu">
              <i value="info" className="item fa fa-info fa" onClick={this.handleMenuClick}> </i>
              <i value="files" className="item fa fa-file-o fa" onClick={this.handleMenuClick}> </i>
              <i value="comments" className="item fa fa-comment-o fa" onClick={this.handleMenuClick}> </i>
            </div>
          <MenuWrapper handleComment={this.handleSubmit}option={option} issue={issue}/>
        </div>
      </div>
    )
  },
  
  animatedLayout: function () {
    return (
        this.layout()
    );
  },

  render: function() {
    console.log(this.state.shouldAnimate);
    return (this.state.shouldAnimate ? this.animatedLayout() : this.layout())
  }
});

module.exports = IssueSidebar;

