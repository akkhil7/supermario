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
  mixins: [Reflux.connect(issueStore)],

  getInitialState: function() {
    return {
      //shouldAnimate: true,
      //activeOption: "info"
      }
  },   
  /*
  componentWillMount: function(){
     this.props.hideIssue()
     },*/

  
  hideIssue: function(e){
    this.props.hideIssue(e)
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
   
   
   componentWillUnmount: function(){
     console.log("unmounting BITCH")
   },

   componentWillMount: function() {
     console.log("gonna mount");
   },
  /*componentWillReceiveProps: function(nextProps){
    if(!this.state.shouldAnimate && nextProps.issue != this.props.issue)
      this.setState({
        shouldAnimate: true
      })
      console.log(this.state.shouldAnimate);
  },

  componentWillUpdate: function(nextProps, nextState){
    if(!this.state.shouldAnimate && nextProps.issue != this.props.issue)
      this.setState({
        shouldAnimate: true
      })
      console.log("Will Update" + this.state.shouldAnimate);

  },
  */


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
        /*_this.setState({
          shouldAnimate: false
          })*/
        //UPDATES COMPONENT. didUpdate() is invoked.
      })
  },

  handleMenuClick: function(e){

    console.log("I'll be handling you guys")
    var option = e.target.getAttribute("value");
    console.log(option);
    /*this.setState({
      activeOption: option,
      shouldAnimate: false
      })*/
  },

  layout: function () {
    var issue = this.props.issue
    var title = _.capitalize(issue.title)
    var comments = this.props.issue.comments
    var assigned_to = issue.assigned_to.username
    var option = this.state.activeOption
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
            <div className="issue-sidebar-menu">
              <i value="info" className="item fa fa-info fa" onClick={this.handleMenuClick}> </i>
              <i value="files" className="item fa fa-file-o fa" onClick={this.handleMenuClick}> </i>
              <i value="comments" className="item fa fa-comment-o fa" onClick={this.handleMenuClick}> </i>
            </div>
          <MenuWrapper option={option} issue={issue}/>
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
    // return (this.state.shouldAnimate ? this.animatedLayout() : this.layout())
     return (this.animatedLayout())
  }
});

module.exports = IssueSidebar;

